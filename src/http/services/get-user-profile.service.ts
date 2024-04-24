import { User } from '@prisma/client'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetUserProfileServiceRequest {
  userId: string
}
interface GetUserProfileServiceReply {
  user: User
}

export class GetUserProfileService {
  constructor(private repository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceReply> {
    const user = await this.repository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
