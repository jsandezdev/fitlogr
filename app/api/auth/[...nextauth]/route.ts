// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import { PrismaClient } from '@prisma/client'
// import bcrypt from 'bcrypt'
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import GoogleProvider from 'next-auth/providers/google'

// const prisma = new PrismaClient()

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize (credentials, req) {
//         if (!credentials?.email || !credentials?.password) throw new Error('Invalid credentials (1)')

//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email
//           }
//         })

//         if (!user || !user?.hashedPassword) throw new Error('Invalid credentials(user)')

//         const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

//         if (!isCorrectPassword) throw new Error('Invalid credentials (pwd)')

//         return user
//       }
//     })
//   ]
// })

import NextAuth from 'next-auth'

import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
