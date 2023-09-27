import { exceptionHandler } from "@/lib/exceptionHandler"
import { createUser } from "@/services/User"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        await createUser(body)
        return NextResponse.json({ message: "Account created successfully!" }, { status: 201 })
    } catch (exception: any) {
        return exceptionHandler(exception)
    }
}