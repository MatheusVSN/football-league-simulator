"use client";

import { Columns, GithubIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Skeleton } from "../ui/skeleton";

const navigationItems = [
  {
    text: "Home",
    href: "/home",
  },
  {
    text: "Create",
    href: "/create",
  },
];

function UserDropdownMenu({
  username = "U",
  email = "U@U.com",
}: {
  username: string | undefined;
  email: string | undefined | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{username}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button className="w-full" variant="ghost" onClick={() => signOut()}>
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function NavigationBar() {
  const { data: session, status } = useSession();

  return (
    <header className="supports-backdrop-blur:bg-slate-50/60 fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <Link className="max-sm:hidden" href="/">
          <span className="mr-6 hidden font-bold sm:inline-block">
            FOOTBALL LEAGUE SIMULATOR
          </span>
        </Link>
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Columns />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/">FOOTBALL SIMULATOR</Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-4 py-4">
                {navigationItems.map((item, index) => (
                  <Link key={item.text} href={item.href}>
                    {item.text}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {status === "authenticated" && (
          <nav className="flex items-center space-x-6 text-sm font-medium max-sm:hidden">
            {navigationItems.map((item) => (
              <Link key={item.text} href={item.href}>
                {item.text}
              </Link>
            ))}
          </nav>
        )}
        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          {status === "loading" && (
            <Skeleton className="h-10 w-10 rounded-full" />
          )}
          {status === "authenticated" && (
            <UserDropdownMenu
              username={session.user?.username}
              email={session.user?.email}
            />
          )}
          {status === "unauthenticated" && (
            <Button asChild>
              <Link href="/signIn">Log in</Link>
            </Button>
          )}
          <Button size="icon" variant="outline" asChild>
            <Link
              target="_blank"
              href="https://github.com/MatheusVSN/football-simulator"
            >
              <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
