import { z } from "zod";

/**
 * Formats Zod errors into a string.
 * @param issues - The ZodError object containing the errors to format.
 * @returns A string containing the formatted errors.
 */
export function formatZodErrors(issues: z.ZodError) {
    let exceptionString = ""
    issues.errors.map((issue) => {
        exceptionString += `${issue.message}. `
    })
    exceptionString = exceptionString.trim()
    return exceptionString
}