"use client";

import { universeCreationSchema } from "@/lib/validation/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HTMLInputTypeAttribute, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";

interface LeagueCreationField {
  name: keyof z.infer<typeof universeCreationSchema>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

const formFields: LeagueCreationField[] = [
  {
    name: "name",
    placeholder: "Fantasy league name",
    type: "text",
  },
];

export default function LeagueCreationComponent() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof universeCreationSchema>>({
    resolver: zodResolver(universeCreationSchema),
    defaultValues: {
      name: "",
      rating: "fixed",
    },
  });

  async function onSubmit(data: z.infer<typeof universeCreationSchema>) {
    setLoading(true);

    const universeCreationResponse = await fetch("/api/universe", {
      method: "POST",
      body: JSON.stringify({ ...data }),
    });

    const returned = await universeCreationResponse.json();

    setLoading(false);

    if (!universeCreationResponse.ok) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          returned.message ??
          "An unknown error happened please try again later",
      });
      return;
    }

    router.refresh();
    toast({
      title: "Success",
      description:
        "Universe created successfully. You can now access your new universe",
      action: (
        <ToastAction altText="Lead me there" asChild>
          <Link href={`/universe/${returned.id}`}>Lead me there</Link>
        </ToastAction>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-2"
      >
        {formFields.map((formField) => (
          <FormField
            key={formField.name}
            control={form.control}
            name={formField.name}
            render={({ field }) => (
              <FormItem className="first-letter:uppercase">
                <FormLabel>{formField.name}</FormLabel>
                <FormControl>
                  <Input
                    type={formField.type}
                    placeholder={formField.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="first-letter:uppercase">
              <FormLabel>Rating mode</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rating mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Mode</SelectLabel>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="semi">Semi-fixed</SelectItem>
                      <SelectItem value="random">Random</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="place-self-start" type="submit" disabled={loading}>
          {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
