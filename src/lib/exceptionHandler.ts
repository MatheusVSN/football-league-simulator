import { ExceptionClass } from "@/exceptions";
import { NextResponse } from "next/server";
import { z } from "zod";
import { formatZodErrors } from "./zod";

/**
 * Handles exceptions and returns a NextResponse object with a JSON message and status code.
 * @param exception - The exception to be handled.
 * @returns A NextResponse object with a JSON message and status code.
 */
export function exceptionHandler(exception: Error) {
    console.error(exception)
    if (exception instanceof z.ZodError) {
        const formattedIssues = formatZodErrors(exception)
        return NextResponse.json({ message: formattedIssues }, { status: 400 })
    } else if (exception instanceof ExceptionClass) {
        console.log(exception.exception)
        return NextResponse.json({ message: exception.message }, { status: exception.status })
    }


    return NextResponse.json({ message: "An unknown error happened. Please try again later" }, { status: 500 })
}