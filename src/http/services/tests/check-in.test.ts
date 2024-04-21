import { InMemoryCheckInsRepository } from '@/http/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { CheckInsService } from '../checkin.service'

let repository: InMemoryCheckInsRepository
let sut: CheckInsService

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    sut = new CheckInsService(repository) // sut -> system under test
  })

  test('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })
})
