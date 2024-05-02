import { PrismaGymsRepository } from '@/http/repositories/prisma/prisma-gyms.repository'
import { CreateGymService } from '../create-gym.service'

export function makeCreateGym() {
  const repository = new PrismaGymsRepository()
  const service = new CreateGymService(repository)

  return service
}
