import CurrentUniverseInformation from "@/components/universe/UniverseInformation";
import { findUniverseById } from "@/services/Universe";
import { notFound } from "next/navigation";

async function loadUniverse(id: string) {
  try {
    const universe = await findUniverseById(id);
    return universe;
  } catch (exception) {}
}

export default async function UniversePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const universe = await loadUniverse(id);

  if (!universe) {
    notFound();
  }

  return (
    <>
      <div className="rounded-md border bg-card p-4">
        <h1>
          {universe.name} - Season {universe.season} - Week{" "}
          {universe.currentWeek - 1}
        </h1>
      </div>
      <CurrentUniverseInformation universe={universe} />
    </>
  );
}
