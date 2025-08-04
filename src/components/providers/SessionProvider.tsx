'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) {
  return (
    <NextAuthSessionProvider session={session as Session & { expires: string } | null | undefined}>
      {children}
    </NextAuthSessionProvider>
  );
}
