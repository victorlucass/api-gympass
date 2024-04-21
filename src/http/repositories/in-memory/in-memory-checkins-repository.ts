import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../checkins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validate_at: data.validate_at ? new Date(data.validate_at) : null,
      createdAt: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
