import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInsService } from '../checkin.service'
import { afterEach } from 'node:test'

let repository: InMemoryCheckInsRepository
let sut: CheckInsService

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    sut = new CheckInsService(repository) // sut -> system under test

    vi.useFakeTimers() // fake time
  })

  afterEach(() => {
    vi.useRealTimers() // real time
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  // TDD => Test Driven Development
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    console.log(new Date())

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    console.log(new Date())

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
