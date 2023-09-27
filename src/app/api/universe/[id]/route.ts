import { exceptionHandler } from "@/lib/exceptionHandler";
import { deleteUniverseById, startNewSeasonByUniverseId } from "@/services/Universe";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
    params: {
        id: string
    }
}

export async function DELETE(_: NextRequest, { params }: ParamsProps) {
    try {
        const { id } = params
        await deleteUniverseById(id)
        return new Response(null, {
            status: 204
        })
    } catch (exception: any) {
        return exceptionHandler(exception)
    }
}

export async function POST(_: NextRequest, { params }: ParamsProps) {
    try {
        const { id } = params
        await startNewSeasonByUniverseId(id)
        return NextResponse.json({ message: "New season started successfully" }, { status: 200 })
    } catch (exception: any) {
        return exceptionHandler(exception)
    }
}