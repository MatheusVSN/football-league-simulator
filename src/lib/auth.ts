import { Unauthorized } from "@/exceptions"
import { findUserByUsername } from "@/services/User"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcrypt"
import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProviders from "next-auth/providers/credentials"
import { prisma } from "./db"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProviders({
            name: "credentials",
            // @ts-ignore
            async authorize(credentials: { username: string, password: string }) {
                if (!credentials?.username || !credentials.password) {
                    throw new Error("Missing fields")
                }

                const user = await findUserByUsername(credentials.username)
                if (!user || !user.password) {
                    throw new Error("User not found")
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password)
                if (!passwordMatch) {
                    throw new Error("Password does not match")
                }

                return user
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/signIn"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.username = user.username
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.username = token.username
                session.user.id = token.id as string
            }
            return session
        }
    }
}

/**
 * Retrieves the user from the server session.
 * @returns {Promise<User>} A promise that resolves with the user object.
 * @throws {Unauthorized} If no active session is found.
 */
export async function getUserFromServerSession() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) throw new Unauthorized("No active session found")

    const { user } = session
    return user
}