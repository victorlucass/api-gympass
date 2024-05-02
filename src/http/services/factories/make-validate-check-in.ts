import { PrismaCheckInsRepository } from '@/http/repositories/prisma/prisma-check-ins.repository'
import { ValidateCheckInsService } from '../validate-check-in.service'

export function makeValidateCheckIn() {
  const repository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInsService(repository)

  return service
}
