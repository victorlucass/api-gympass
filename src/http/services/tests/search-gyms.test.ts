import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsService } from '../search-gyms.service'

let repository: InMemoryGymsRepository
let sut: SearchGymsService

describe('Fetch User Check-in History Service', () => {
  beforeEach(() => {
    repository = new InMemoryGymsRepository()
    sut = new SearchGymsService(repository)
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
      latitude: -27.2092052,
      longitude: -49.6401091,
      title: 'TypeScript Gym',
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
  })
})
