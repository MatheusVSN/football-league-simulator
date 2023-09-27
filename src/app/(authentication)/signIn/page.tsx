import LoginComponent from "@/components/forms/authentication/LoginComponent";
import SignUpComponent from "@/components/forms/authentication/SignUpComponent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="relative grid h-full flex-1 place-content-center gap-6">
      <Button asChild>
        <Link href="/">
          <ArrowLeft size={24} className="mr-2" />
          Back to the landing page
        </Link>
      </Button>

      <Tabs defaultValue="login" className="w-96 max-[384px]:w-screen">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signUp">Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginComponent />
        </TabsContent>
        <TabsContent value="signUp">
          <SignUpComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
