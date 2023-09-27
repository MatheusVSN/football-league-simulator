import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function LoadingUniverse() {
  return (
    <>
      <div className="flex items-center rounded-md border bg-card p-4">
        <Loader2 size={36} className="mr-2 animate-spin" />
        <h1>Loading universe information...</h1>
      </div>

      <div className="space-y-2 rounded-md border bg-card p-4">
        <h3>Competition</h3>
        <div className="grid gap-2 sm:flex sm:items-center">
          <Skeleton className="h-10 min-w-[210px]" />
          <Skeleton className="h-10 min-w-[210px]" />
          <Skeleton className="h-10 min-w-[165px]" />
        </div>
      </div>

      <div className="space-y-2 rounded-md border bg-card p-4">
        <h3>Navigation</h3>
        <div className="grid gap-4 md:flex md:items-center">
          <Skeleton className="h-10 min-w-[100px]" />
          <Skeleton className="h-10 min-w-[100px]" />
          <Skeleton className="h-10 min-w-[100px]" />
          <Skeleton className="h-10 min-w-[100px]" />
        </div>
      </div>

      <div className="space-y-2 rounded-md border bg-card p-4 text-center">
        <div className="flex flex-col-reverse justify-between gap-16 lg:flex-row">
          <div className="w-full space-y-4">
            <h3>Standings</h3>
            <Skeleton className="h-[800px] w-full overflow-auto" />
          </div>

          <div className="flex w-full flex-col items-center space-y-4">
            <div className="w-full space-y-4">
              <h3>Fixtures</h3>
              <Skeleton className="h-[400px] w-full overflow-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
