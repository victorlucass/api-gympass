import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../checkins-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

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

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOftheDay = dayjs(date).startOf('date') // example -> 2022-01-01T00:00:00.000Z
    const endOfTheDay = dayjs(date).endOf('date') // example -> 2022-01-01T23:59:59.999Z

    const checkOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDate =
        checkInDate.isAfter(startOftheDay) && checkInDate.isBefore(endOfTheDay) // verifica se o check-in esta dentro do dia

      return isOnSameDate && checkIn.user_id === userId
    })
    if (!checkOnSameDate) return null
    return checkOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
    return checkIns
  }

  async countByUserId(userId: string) {
    const checkInsCount = this.items.filter(
      (checkIn) => checkIn.user_id === userId,
    ).length
    return checkInsCount
  }
}
