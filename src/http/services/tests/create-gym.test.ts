import { InMemoryGymsRepository } from '@/http/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from '../create-gym.service'
import { describe, expect, it } from 'vitest'

const gymsRepository = new InMemoryGymsRepository()
const sut = new CreateGymService(gymsRepository)

describe('Create Gym Service', () => {
  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym-01',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
