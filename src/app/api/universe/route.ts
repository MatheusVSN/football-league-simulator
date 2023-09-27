import { exceptionHandler } from "@/lib/exceptionHandler";
import { createNewUniverse } from "@/services/Universe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const newUniverseId = await createNewUniverse(body)
        return NextResponse.json({ message: "Universe created successfully!", id: newUniverseId }, { status: 201 })
    } catch (exception: any) {
        return exceptionHandler(exception)
    }
}