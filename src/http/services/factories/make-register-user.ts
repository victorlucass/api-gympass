import { PrismaUsersRepositories } from '@/http/repositories/prisma/prisma-users.repository'
import { RegisterUserService } from '../register-user.service'

export function makeRegisterUser() {
  const repository = new PrismaUsersRepositories()
  const service = new RegisterUserService(repository)

  return service
}
