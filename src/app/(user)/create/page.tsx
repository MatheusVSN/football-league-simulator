import LeagueCreationComponent from "@/components/forms/LeagueCreationComponent";

export default function CreatePage() {
  return (
    <>
      <div className="space-y-2 rounded-md border bg-card p-4">
        <h1>Create a new universe</h1>
        <p>Create your new fantasy football simulation</p>
        <p>
          Please note that the team names used in this simulation are fictional
          and abbreviated. They are not intended to represent or resemble any
          real-world football teams. Any similarities to actual football teams,
          past or present, are purely coincidental.
        </p>
      </div>

      <div className="space-y-2 rounded-md border bg-card p-4">
        <LeagueCreationComponent />
      </div>
    </>
  );
}
