import { CheckInRepository } from '../repositories/checkins-repository'

interface GetUserMetricsServiceRequest {
  userId: string
}

interface GetUserMetricsServiceReply {
  checkInsCount: number
}

export class GetUserMetricsService {
  constructor(private repository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceReply> {
    const checkIns = await this.repository.countByUserId(userId)

    return {
      checkInsCount: checkIns,
    }
  }
}
