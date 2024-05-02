import { CheckInsService } from '../checkin.service'
import { PrismaGymsRepository } from '@/http/repositories/prisma/prisma-gyms.repository'
import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins.repository'

export function makeCheckIns() {
  const repository = new PrismaCheckInsRepository()
  const serviceGyms = new PrismaGymsRepository()
  const service = new CheckInsService(repository, serviceGyms)

  return service
}
