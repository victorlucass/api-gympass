import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '../repositories/checkins-repository'
import { GymsRepository } from '../repositories/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface CheckInsRequest {
  userId: string
  gymId: string
  useLatitude: number
  useLongitude: number
}
interface CheckInsReply {
  checkIn: CheckIn
}

export class CheckInsService {
  constructor(
    private repository: CheckInRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    useLatitude,
    useLongitude,
  }: CheckInsRequest): Promise<CheckInsReply> {
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) {
      console.log('entrou no if do service')
      throw new ResourceNotFoundError()
    }

    // calcula a distância entre o usuário e o treino

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
      { latitude: useLatitude, longitude: useLongitude },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

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
