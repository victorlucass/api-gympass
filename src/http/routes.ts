import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/register-user.controller'
import { authenticateController } from './controllers/authenticate-user'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateController)
}
