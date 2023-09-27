import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

/**
 * Retrieves the current user from the server session.
 * @returns {Promise<User | undefined>} A promise that resolves with the current user object or undefined if no user is found.
 */
export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    return session?.user
}