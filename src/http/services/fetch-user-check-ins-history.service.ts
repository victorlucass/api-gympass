import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '../repositories/checkins-repository'

interface FetchUserCheckInsHistoryServiceRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryServiceReply {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryService {
  constructor(private repository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceReply> {
    const checkIns = await this.repository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
