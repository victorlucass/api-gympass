import { describe } from 'node:test'
import { test, expect } from 'vitest'
// import { PrismaUsersRepositories } from '../repositories/prisma-users.repository'
import { RegisterUserService } from './register-user.service'
import { InMemoryRepository } from '../repositories/in-memory/in-memory-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  test('should create user', async () => {
    const userRepository = new InMemoryRepository()
    const usersService = new RegisterUserService(userRepository)

    const { user } = await usersService.execute({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('should hash user password upon registration', async () => {
    const userRepository = new InMemoryRepository()
    const usersService = new RegisterUserService(userRepository)

    const { user } = await usersService.execute({
      name: 'John Doe',
      email: '4lUesh@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  test('should not be able to register with same email', async () => {
    const userRepository = new InMemoryRepository()
    const usersService = new RegisterUserService(userRepository)

    const email = '4lUesh@example.com'

    await usersService.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      usersService.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
