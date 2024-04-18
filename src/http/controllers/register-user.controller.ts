import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUserService } from '../services/register-user.service'
import { PrismaUsersRepositories } from '../repositories/prisma-users.repository'

export async function registerUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const repository = new PrismaUsersRepositories()
    const service = new RegisterUserService(repository)

    await service.execute({ name, email, password })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send('Usuário criado com sucesso ✅')
}
