import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUserServiceProps {
  name: string
  email: string
  password: string
}

export async function registerUserService({
  name,
  email,
  password,
}: RegisterUserServiceProps) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email já existente')
  }

  const password_hash = await hash(password, 6) // valor e número de rounds

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
