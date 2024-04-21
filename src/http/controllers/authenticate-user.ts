import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepositories } from '../repositories/prisma/prisma-users.repository'
import { InvalidCredentialsError } from '../services/errors/invalid-credentials-error'
import { AuthenticateService } from '../services/authenticate-user.service'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const repository = new PrismaUsersRepositories()
    const service = new AuthenticateService(repository)

    await service.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(200).send('Autenticado ✅')
}
