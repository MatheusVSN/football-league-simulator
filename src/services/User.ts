import { Conflict } from "@/exceptions";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validation/zodSchemas";
import bcrypt from "bcrypt";

type User = {
    username: string,
    email: string,
    password: string
}

/**
 * Finds a user by their email address.
 * @param email - The email address of the user to find.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email.toLowerCase()
        }
    })
}

/**
 * Finds a user by their username.
 * @param username - The username of the user to find.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
export async function findUserByUsername(username: string) {
    return await prisma.user.findUnique({
        where: {
            username: username.toLowerCase()
        }
    })
}

/**
 * Finds a user by their ID.
 * @param id The ID of the user to find.
 * @returns A Promise that resolves to the user object if found, or null if not found.
 */
export async function findUserById(id: string) {
    return await prisma.user.findFirst({
        where: {
            id
        }
    })
}

/**
 * Creates a new user with the given data.
 * @param data - The user data to create.
 * @returns The created user.
 * @throws Conflict error if the email or username already exists.
 */
export async function createUser(data: User) {
    let { username, email, password } = await registerSchema.parseAsync(data)

    const existingEmail = await findUserByEmail(email)
    if (existingEmail) throw new Conflict("Email already in use")


    const existingUsername = await findUserByUsername(username)
    if (existingUsername) throw new Conflict("Username already in use")

    password = await bcrypt.hash(password, 10)

    return await prisma.user.create({
        data: {
            username,
            password,
            email
        }
    })
}

/**
 * Retrieves all universes associated with a given user ID.
 * @param userId The ID of the user to retrieve universes for.
 * @returns A Promise that resolves to an array of universes associated with the given user ID.
 */
export async function getAllUniverseByUserId(userId: string) {
    return await prisma.universe.findMany({
        where: {
            userId
        }
    })
}