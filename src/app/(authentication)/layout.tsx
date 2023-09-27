export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mt-12 flex min-h-full">
      <div className="hidden w-5/12 border-r bg-secondary dark:border-r lg:block" />
      <div className="flex-1 max-lg:py-8 lg:p-8">{children}</div>
    </main>
  );
}
