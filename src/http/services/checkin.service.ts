import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '../repositories/checkins-repository'

interface CheckInsRequest {
  userId: string
  gymId: string
}
interface CheckInsReply {
  checkIn: CheckIn
}

export class CheckInsService {
  constructor(private repository: CheckInRepository) {}

  async execute({ gymId, userId }: CheckInsRequest): Promise<CheckInsReply> {
    // verifica se o usuário já fez check-in no dia
    const checkInOnDate = await this.repository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnDate) {
      throw new Error()
    }

    const checkIn = await this.repository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
