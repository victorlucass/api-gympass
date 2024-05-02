import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history.service'
import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins.repository'

export function makeFetchUserCheckInsHistory() {
  const repository = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInsHistoryService(repository)

  return service
}
