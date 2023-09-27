import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authenticationPages = ["/signIn"]
const protectedPage = ["/home", "/create", "/universe"]

const isAuthRoute = (url: string) => authenticationPages.some((page) => url.startsWith(page))
const isUserPage = (url: string) => protectedPage.some((page) => url.startsWith(page))
const homePage = "/home"
const authPage = "/signIn"

export default async function middleware(request: NextRequest) {
    const { nextUrl } = request

    const userToken = await getToken({ req: request })
    const onAuthPage = isAuthRoute(nextUrl.pathname)
    const onUserPage = isUserPage(nextUrl.pathname)

    if (onAuthPage && userToken) {
        const redirectTo = new URL(homePage, request.url)
        return NextResponse.redirect(redirectTo)
    } else if (onUserPage && !userToken) {
        const redirectTo = new URL(authPage, request.url)
        return NextResponse.redirect(redirectTo)
    }

    return NextResponse.next()
}

export const config = { matcher: ["/signIn", "/home", "/universe", "/create"] }