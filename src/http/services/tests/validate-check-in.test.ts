import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { ValidateCheckInsService } from '../validate-check-in.service'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let repository: InMemoryCheckInsRepository
let sut: ValidateCheckInsService

describe('Validate Check-in Service', () => {
  beforeEach(async () => {
    repository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInsService(repository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to valite the check in', async () => {
    const createdCheckIn = await repository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await sut.execute({
      checkInId: createdCheckIn.id,
    })

    await expect(createdCheckIn.validate_at).toEqual(expect.any(Date))
    await expect(repository.items[0].validate_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await repository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs) // advance time by 21 minutes

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
