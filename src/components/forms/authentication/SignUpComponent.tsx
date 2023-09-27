"use client";

import { clientRegisterSchema } from "@/lib/validation/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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

interface SignUpFieldProperty {
  name: keyof z.infer<typeof clientRegisterSchema>;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  title?: string;
}

const signUpFields: SignUpFieldProperty[] = [
  {
    name: "username",
    placeholder: "user",
    type: "text",
  },
  {
    name: "email",
    placeholder: "email@example.com",
    type: "email",
  },
  {
    name: "password",
    placeholder: "********",
    type: "password",
  },
  {
    name: "confirmPassword",
    placeholder: "********",
    title: "Confirm password",
    type: "password",
  },
];

export default function SignUpComponent() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof clientRegisterSchema>>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(data: z.infer<typeof clientRegisterSchema>) {
    setLoading(true);

    const signUpResponse = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
      }),
    });

    const returned = await signUpResponse.json();
    setLoading(false);

    if (!signUpResponse.ok) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: returned.message,
      });
      return;
    }

    toast({
      title: "Success!",
      description:
        "Your account has been created successfully. You now can go to the login section and access your account",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Create your account and access our platform
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {signUpFields.map((formField) => (
              <FormField
                key={formField.name}
                control={form.control}
                name={formField.name}
                render={({ field }) => (
                  <FormItem className="first-letter:uppercase">
                    <FormLabel>{formField.title ?? formField.name}</FormLabel>
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
