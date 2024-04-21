import { InMemoryRepository } from '@/http/repositories/in-memory/in-memory-repository'
import { AuthenticateService } from '../authenticate-user.service'
import { hash } from 'bcryptjs'
import { describe, expect, test } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

describe('AuthenticateUserService', () => {
  test('should be able to authenticate', async () => {
    const repository = new InMemoryRepository()
    const sut = new AuthenticateService(repository) // sut -> system under test

    await repository.create({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: '4lUesh@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should not be able to authenticate with wrong email', async () => {
    const repository = new InMemoryRepository()
    const sut = new AuthenticateService(repository) // sut -> system under test

    expect(
      async () =>
        await sut.execute({
          email: '4lUeshnot@example.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('should not be able to authenticate with wrong password', async () => {
    const repository = new InMemoryRepository()
    const sut = new AuthenticateService(repository) // sut -> system under test

    await repository.create({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password_hash: await hash('123456', 6),
    })

    expect(
      async () =>
        await sut.execute({
          email: '4lUesh@example.com',
          password: '123456not',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
