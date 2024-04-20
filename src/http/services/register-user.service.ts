import { hash } from 'bcryptjs'
import { UserRepository } from '../repositories/user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUserServiceRequest {
  name: string
  email: string
  password: string
}
interface RegisterUserServiceReply {
  user: User
}

export class RegisterUserService {
  constructor(private repository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserServiceRequest): Promise<RegisterUserServiceReply> {
    const userWithSameEmail = await this.repository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6) // valor e número de rounds

    const user = await this.repository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
