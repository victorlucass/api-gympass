import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceReply {
  user: User
}

export class AuthenticateService {
  constructor(private repository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceReply> {
    const user = await this.repository.findByEmail(email) // verifica se o e-mail existe

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, user.password_hash) // verifica se a senha passada dá pra fazer o mesmo hash que a senha do usuário

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
