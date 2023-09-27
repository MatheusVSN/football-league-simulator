"use client"

import { SessionProvider } from "next-auth/react"

type ContextProps = {
  children: React.ReactNode
}

export default function AuthProvider({ children }: ContextProps) {
  return <SessionProvider>{children}</SessionProvider>
}
