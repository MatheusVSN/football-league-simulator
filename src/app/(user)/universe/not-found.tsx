import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex h-full max-w-screen-xl items-center justify-start rounded-md border bg-card p-8">
      <div className="mx-auto max-w-lg space-y-3 text-center">
        <h3 className="font-semibold text-primary">404 Error</h3>
        <p className="text-4xl font-semibold text-primary sm:text-5xl">
          Universe not found
        </p>
        <p>
          The universe you are looking for does not exists or you do not have
          permission to access it.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/home">Go to home page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
