import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex h-full max-w-screen-xl items-center justify-start px-4 md:px-8">
      <div className="mx-auto max-w-lg space-y-3 text-center">
        <h3 className="font-semibold text-primary">404 Error</h3>
        <p className="text-4xl font-semibold text-primary sm:text-5xl">
          Page not found
        </p>
        <p>
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Go back</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
