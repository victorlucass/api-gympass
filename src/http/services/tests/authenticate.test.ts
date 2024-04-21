import { InMemoryRepository } from '@/http/repositories/in-memory/in-memory-repository'
import { AuthenticateService } from '../authenticate-user.service'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let repository: InMemoryRepository
let sut: AuthenticateService

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    repository = new InMemoryRepository()
    sut = new AuthenticateService(repository) // sut -> system under test
  })

  it('should be able to authenticate', async () => {
    await repository.create({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: '4lUesh@example.com',
      password: '123456',
    })

    await expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      async () =>
        await sut.execute({
          email: '4lUeshnot@example.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await repository.create({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(
      async () =>
        await sut.execute({
          email: '4lUesh@example.com',
          password: '123456not',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
