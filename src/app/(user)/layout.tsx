import NavigationBar from "@/components/user/NavigationBar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <main className="mt-12 grid gap-4 p-2 pt-8 md:p-8">{children}</main>
    </>
  )
}
