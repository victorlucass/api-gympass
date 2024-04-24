import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-checkins-repository'
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history.service'
import { beforeEach, describe, expect, it } from 'vitest'

let repository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryService

describe('Fetch User Check-in History Service', () => {
  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryService(repository)
  })

  it('should be able to fetch check-in history', async () => {
    await repository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(1)
    expect(checkIns[0].gym_id).toEqual('gym-01')
    expect(expect.objectContaining({ gym_id: 'gym-01' }))
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
