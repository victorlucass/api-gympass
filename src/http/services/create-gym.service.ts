import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface CreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface CreateGymServiceReply {
  gym: Gym
}

export class CreateGymService {
  constructor(private repository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymServiceRequest): Promise<CreateGymServiceReply> {
    const gym = await this.repository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return { gym }
  }
}
