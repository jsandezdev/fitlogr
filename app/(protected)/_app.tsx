import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { ProtectedLayout } from './layout'

// add requireAuth to AppProps
type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

export default function App ({ Component, pageProps }: AppPropsWithAuth) {
  return <SessionProvider session={pageProps.session}>
    {Component.requireAuth
      ? (
        <ProtectedLayout>
          <Component {...pageProps} />
        </ProtectedLayout>
      )
      : (
        <Component {...pageProps} />
      )}
  </SessionProvider>
}
