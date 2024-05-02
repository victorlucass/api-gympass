import { PrismaGymsRepository } from '@/http/repositories/prisma/prisma-gyms.repository'
import { FetchNearbyGymsService } from '../fetch-nearby-gyms.service'

export function makeFetchNearbyGyms() {
  const repository = new PrismaGymsRepository()
  const service = new FetchNearbyGymsService(repository)

  return service
}
