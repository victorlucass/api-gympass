import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins.repository'
import { GetUserMetricsService } from '../get-user-metrics.service'

export function makeGetUserMetrics() {
  const repository = new PrismaCheckInsRepository()
  const service = new GetUserMetricsService(repository)

  return service
}
