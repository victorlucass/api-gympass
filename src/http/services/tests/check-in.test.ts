import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInsService } from '../checkin.service'
import { afterEach } from 'node:test'
import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckinsError } from '../errors/max-number-of-checkins-error'
import { MaxDistanceError } from '../errors/max-distance-error'

let repository: InMemoryCheckInsRepository
let sut: CheckInsService
let gymsRepository: InMemoryGymsRepository

describe('AuthenticateUserService', () => {
  beforeEach(async () => {
    repository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInsService(repository, gymsRepository) // sut -> system under test
    vi.useFakeTimers() // fake time

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
  })

  afterEach(() => {
    vi.useRealTimers() // real time
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      useLatitude: -27.2092052,
      useLongitude: -49.6401091,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  // TDD => Test Driven Development
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      useLatitude: -27.2092052,
      useLongitude: -49.6401091,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        useLatitude: -27.2092052,
        useLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })
  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      useLatitude: -27.2092052,
      useLongitude: -49.6401091,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      useLatitude: -27.2092052,
      useLongitude: -49.6401091,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        useLatitude: -27.2092052,
        useLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
