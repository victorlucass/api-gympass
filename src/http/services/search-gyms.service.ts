import { Gym } from '@prisma/client'
import { GymsRepository } from '../repositories/gyms-repository'

interface SearchGymsServiceRequest {
  query: string
  page: number
}

interface SearchGymsServiceReply {
  gyms: Gym[]
}

export class SearchGymsService {
  constructor(private repository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsServiceRequest): Promise<SearchGymsServiceReply> {
    const gyms = await this.repository.searchMany(query, page)

    return { gyms }
  }
}
