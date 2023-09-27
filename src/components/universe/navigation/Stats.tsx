"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { editStatsSchema } from "@/lib/validation/zodSchemas";
import { Division, Team } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UniverseTeamStatsProps = {
  currentDivision: Division;
  universeId: string;
};

type TeamActionProps = {
  team: Team;
  universeId: string;
};

function RenderEditDialog({ team, universeId }: TeamActionProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof editStatsSchema>>({
    resolver: zodResolver(editStatsSchema),
    defaultValues: {
      rating: team.rating,
    },
  });

  async function onSubmit(data: z.infer<typeof editStatsSchema>) {
    setLoading(true);

    const editResponse = await fetch(`/api/universe/${universeId}/${team.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    setLoading(false);
    setOpen(false);

    if (!editResponse.ok) {
      const response = await editResponse.json();
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: response.error,
      });
    }

    toast({
      title: "Success",
      description: `Changed rating of ${team.name} to ${data.rating}`,
    });
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {team.name}</DialogTitle>
          <DialogDescription>Change {team.name} stats</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id={team.id} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name={"rating"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New rating</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={99} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button form={team.id} disabled={loading} type="submit">
            {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RenderTeamTableBody({ team, universeId }: TeamActionProps) {
  return (
    <TableRow>
      <TableCell>
        {team.name} - OVR {team.rating}
      </TableCell>
      <TableCell className="text-end">
        <RenderEditDialog team={team} universeId={universeId} />
      </TableCell>
    </TableRow>
  );
}

export default function UniverseTeamStats({
  currentDivision,
  universeId,
}: UniverseTeamStatsProps) {
  console.log(currentDivision);

  return (
    <div className="space-y-2 rounded-md border bg-card p-4">
      <h3>Team stats</h3>
      <Table>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDivision.teams.map((team) => (
            <RenderTeamTableBody
              team={team}
              key={team.id}
              universeId={universeId}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
