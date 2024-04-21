import { describe } from 'node:test'
import { it, expect, beforeEach } from 'vitest'
import { RegisterUserService } from '../register-user.service'
import { InMemoryRepository } from '../../repositories/in-memory/in-memory-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let repository: InMemoryRepository
let sut: RegisterUserService

describe('Register Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryRepository()
    sut = new RegisterUserService(repository)
  })

  it('should create user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password: '123456',
    })

    await expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    await expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = '4lUesh@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
