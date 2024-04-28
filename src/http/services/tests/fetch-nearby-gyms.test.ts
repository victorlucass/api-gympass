import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsService } from '../fetch-nearby-gyms.service'

let repository: InMemoryGymsRepository
let sut: FetchNearbyGymsService

describe('Fetch User Check-in History Service', () => {
  beforeEach(() => {
    repository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsService(repository)
  })

  it('should be able to search for gyms', async () => {
    await repository.create({
      id: 'gym-01',
      latitude: -27.2092052,
      longitude: -49.6401091,
      title: 'JavaScript Gym',
    })

    await repository.create({
      id: 'gym-02',
      latitude: -27.0610928,
      longitude: -49.5229501,
      title: 'TypeScript Gym',
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })
})
