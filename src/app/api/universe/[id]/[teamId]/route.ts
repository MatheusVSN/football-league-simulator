import { exceptionHandler } from "@/lib/exceptionHandler";
import { editStatsSchema } from "@/lib/validation/zodSchemas";
import { editTeamIdRatingByUniverseId } from "@/services/Universe";
import { NextRequest } from "next/server";

type ParamsProps = {
    params: {
        id: string
        teamId: string
    }
}


export async function PUT(request: NextRequest, { params }: ParamsProps) {
    try {
        const body = await request.json()
        const { rating } = await editStatsSchema.parseAsync(body)
        const { id, teamId } = params

        await editTeamIdRatingByUniverseId(id, teamId, rating)
        return new Response(null, {
            status: 200
        })
    } catch (exception: any) {
        return exceptionHandler(exception)
    }
}