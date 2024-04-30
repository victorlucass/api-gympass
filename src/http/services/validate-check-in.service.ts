import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '../repositories/checkins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import dayjs from 'dayjs'

interface ValidateCheckInsRequest {
  checkInId: string
}
interface ValidateCheckInsReply {
  checkIn: CheckIn
}

export class ValidateCheckInsService {
  constructor(private repository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInsRequest): Promise<ValidateCheckInsReply> {
    const checkIn = await this.repository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.createdAt,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new Error()
    }

    checkIn.validate_at = new Date()

    await this.repository.save(checkIn)

    return { checkIn }
  }
}
