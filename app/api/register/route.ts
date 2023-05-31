import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST (req: Request) {
  try {
    const { firstName, lastName, email, password } = (await req.json()) as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }
    const hashedPassword = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        hashedPassword
      }
    })

    return NextResponse.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    })
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message
      }),
      { status: 500 }
    )
  }
}
