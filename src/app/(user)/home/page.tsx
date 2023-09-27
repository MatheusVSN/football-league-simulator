import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UniverseInformationComponent from "@/components/user/UniverseInformation";
import { getCurrentUser } from "@/lib/session";
import { getAllUniverseByUserId } from "@/services/User";
import { Universe } from "@/types/types";
import Link from "next/link";
import { Suspense } from "react";

async function AllUniverses({ userId }: { userId: string }) {
  // Again, we have 100% sure that will be of our custom Universe type
  const allUserUniverses = (await getAllUniverseByUserId(
    userId,
  )) as unknown as Universe[];

  return (
    <Table>
      <TableCaption>A list of all your universes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="max-sm:hidden">Creation date</TableHead>
          <TableHead className="text-center sm:text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allUserUniverses.map((universe) => (
          <UniverseInformationComponent key={universe.id} universe={universe} />
        ))}
      </TableBody>
    </Table>
  );
}

async function LoadingUniverses() {
  return (
    <Table>
      <TableCaption>A list of all your universes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="max-sm:hidden">Creation date</TableHead>
          <TableHead className="text-center sm:text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      {new Array(4).fill(null).map((_, index) => (
        <TableBody key={index}>
          {new Array(3).fill(null).map((_, index2) => (
            <TableCell key={index2}>
              <Skeleton className="h-10" />
            </TableCell>
          ))}
        </TableBody>
      ))}
    </Table>
  );
}

export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) return;

  return (
    <>
      <div className="rounded-md border bg-card p-4">
        <h1>Welcome, {user?.username}!</h1>
      </div>
      <div className="space-y-4 rounded-md border bg-card p-4">
        <h2>List of universes</h2>
        <Button asChild>
          <Link href="/create">Create new universe</Link>
        </Button>
        <Suspense fallback={<LoadingUniverses />}>
          <AllUniverses userId={user.id} />
        </Suspense>
      </div>
    </>
  );
}
