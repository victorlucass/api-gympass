import { PrismaGymsRepository } from '@/http/repositories/prisma/prisma-gyms.repository'
import { SearchGymsService } from '../search-gyms.service'

export function makeSearchGyms() {
  const repository = new PrismaGymsRepository()
  const service = new SearchGymsService(repository)

  return service
}
