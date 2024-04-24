import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsService } from '../get-user-metrics.service'

let repository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Fetch User Check-in History Service', () => {
  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(repository)
  })

  it('should be able to fetch check-in history', async () => {
    await repository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await repository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
