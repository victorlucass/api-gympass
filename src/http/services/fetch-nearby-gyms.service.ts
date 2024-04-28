import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface FetchNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsServiceReply {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private repository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceReply> {
    const gyms = await this.repository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
