"use client";

import { Universe } from "@/types/types";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { useToast } from "../ui/use-toast";

type UniverseProps = {
  universe: Universe;
};

type DeleteActionProps = {
  onUniverseDeletion: () => void;
};

function DeleteAction({ onUniverseDeletion }: DeleteActionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            universe and its progress
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onUniverseDeletion}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function UniverseInformationComponent({
  universe,
}: UniverseProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  async function onUniverseDeletion() {
    setLoading(true);
    const deleteResponse = await fetch(`/api/universe/${universe.id}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (!deleteResponse.ok) {
      const result = await deleteResponse.json();

      return toast({
        title: "Something went wrong",
        description: result.message,
        variant: "destructive",
      });
    }

    toast({
      title: "Success",
      description: "Universe deleted successfully",
    });
    router.refresh();
  }

  return (
    <TableRow>
      <TableCell>{universe.name}</TableCell>
      <TableCell className="max-sm:hidden">
        {universe.createdAt.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </TableCell>
      <TableCell className="grid gap-2 sm:flex sm:items-center sm:justify-end">
        {loading ? (
          <Button variant="destructive" disabled>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Deleting...
          </Button>
        ) : (
          <>
            <Button asChild>
              <Link href={`/universe/${universe.id}`}>Access</Link>
            </Button>
            <DeleteAction onUniverseDeletion={onUniverseDeletion} />
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
