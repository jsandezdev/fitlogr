import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    id?: string
  }

  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    id?: string
  }
}
