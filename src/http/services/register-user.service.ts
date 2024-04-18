import { hash } from 'bcryptjs'
import { UserRepository } from '../repositories/user-repository'

interface RegisterUserServiceProps {
  name: string
  email: string
  password: string
}

export class RegisterUserService {
  constructor(private repository: UserRepository) {}

  async execute({ name, email, password }: RegisterUserServiceProps) {
    const userWithSameEmail = await this.repository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email já existente')
    }

    const password_hash = await hash(password, 6) // valor e número de rounds

    await this.repository.create({
      name,
      email,
      password_hash,
    })
  }
}
