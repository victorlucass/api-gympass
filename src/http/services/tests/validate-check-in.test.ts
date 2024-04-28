import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { afterEach } from 'node:test'
import { ValidateCheckInsService } from '../validate-check-in.service'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let repository: InMemoryCheckInsRepository
let sut: ValidateCheckInsService

describe('Validate Check-in Service', () => {
  beforeEach(async () => {
    repository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInsService(repository)
  })

  afterEach(() => {})

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
})
