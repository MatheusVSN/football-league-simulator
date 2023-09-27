"use client";

import { loginSchema } from "@/lib/validation/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HTMLInputTypeAttribute, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useToast } from "../../ui/use-toast";

interface LoginFieldProperty {
  name: keyof z.infer<typeof loginSchema>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
}

const formFields: LoginFieldProperty[] = [
  {
    name: "username",
    placeholder: "user",
    type: "text",
  },
  {
    name: "password",
    placeholder: "********",
    type: "password",
  },
];

export default function LoginComponent() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      setLoading(false);

      if (response?.error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: response.error,
        });
      } else {
        router.push("/home");
      }
    } catch (exception: any) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: exception.message,
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>Access your account to get access</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
