import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'

export class InMemoryRepository implements UserRepository {
  users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)
    if (!user) return null
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
