import { exceptionHandler } from "@/lib/exceptionHandler";
import { simulateWeekByUniverseId } from "@/services/Universe";
import { NextRequest } from "next/server";

type ParamsProps = {
    params: {
        id: string
    }
}


export async function POST(_: NextRequest, { params }: ParamsProps) {
    try {
        const { id } = params
        await simulateWeekByUniverseId(id)
        return new Response(null, { status: 200 })
    } catch (exception: any) {
        return exceptionHandler(exception)
    }
}