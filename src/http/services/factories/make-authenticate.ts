import { PrismaUsersRepositories } from '@/http/repositories/prisma/prisma-users.repository'
import { AuthenticateService } from '../authenticate-user.service'

export function makeAuthenticate() {
  const repository = new PrismaUsersRepositories()
  const service = new AuthenticateService(repository)

  return service
}
