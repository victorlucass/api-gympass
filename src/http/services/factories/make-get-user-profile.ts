import { GetUserProfileService } from '../get-user-profile.service'
import { PrismaUsersRepositories } from '@/http/repositories/prisma/prisma-users.repository'

export function makeGetUserProfile() {
  const repository = new PrismaUsersRepositories()
  const service = new GetUserProfileService(repository)

  return service
}
