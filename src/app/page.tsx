import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="fixed -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      <main className="mx-auto grid h-full place-content-center items-center px-4 pb-12 pt-24 md:px-8 lg:flex">
        <div className="grid justify-items-center space-y-4 text-center">
          <h1 className="text-4xl font-bold xl:text-5xl">
            FOOTBALL LEAGUE SIMULATOR
          </h1>
          <div className="w-full">
            <p className="max-w-prose sm:mx-auto lg:ml-0 ">
              Experience over 20 leagues across 10 countries, each match
              meticulously simulated. This isn’t just a game, it’s an alternate
              universe of football with its own unique history. Join us and take
              control of your own football universe!
            </p>
          </div>
          <div className="grid gap-x-6 gap-y-3 sm:flex sm:items-center">
            <Button asChild>
              <Link href="/create">Create a new universe</Link>
            </Button>
            <Button
              className="bg-slate-900 hover:bg-slate-900 dark:bg-slate-50"
              asChild
            >
              <Link
                target="_blank"
                href="https://github.com/MatheusVSN/football-simulator"
              >
                Github repository
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
