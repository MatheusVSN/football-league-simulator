"use client";

import { Universe } from "@/types/types";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import CompetitionSelector from "./CompetitionSelector";
import UniverseFixture from "./navigation/Fixture";
import UniverseHome from "./navigation/Home";
import UniverseTeamStats from "./navigation/Stats";
import UniverseHistory from "./navigation/History";

type UniverseProps = {
  universe: Universe;
};

const componentMap = {
  home: UniverseHome,
  fixtures: UniverseFixture,
  stats: UniverseTeamStats,
  history: UniverseHistory
}

type NavigationList = {
  text: string
  location: keyof typeof componentMap
}

const navigationList: NavigationList[] = [
  { text: "Home", location: "home" },
  { text: "All fixtures", location: "fixtures" },
  { text: "Team stats", location: "stats" },
  { text: "History", location: "history" },
];

export default function CurrentUniverseInformation({
  universe,
}: UniverseProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [currentLocation, setCurrentLocation] = useState<keyof typeof componentMap>("home");
  const [currentCompetitionIndex, setCurrentCompetitionIndex] = useState(0);
  const [currentDivisionIndex, setCurrentDivisionIndex] = useState(0);

  const CurrentComponent = componentMap[currentLocation]

  const currentCompetition = useMemo(
    () => universe.competitions[currentCompetitionIndex],
    [universe.competitions, currentCompetitionIndex],
  );
  const currentDivision = useMemo(
    () =>
      universe.competitions[currentCompetitionIndex].leagues[
        currentDivisionIndex
      ],
    [universe.competitions, currentCompetitionIndex, currentDivisionIndex],
  );

  function onCountryChange(newCountry: string) {
    const foundCountry = universe.competitions.findIndex(
      (country) => country.country === newCountry,
    );
    if (foundCountry === -1) return;
    setCurrentCompetitionIndex(() => foundCountry);
    setCurrentDivisionIndex(() => 0);
  }

  function onDivisionChange(newDivision: string) {
    const foundDivision = currentCompetition.leagues.findIndex((division) => {
      return division.name === newDivision;
    });
    if (foundDivision === -1) return;
    setCurrentDivisionIndex(() => foundDivision);
  }

  function onMatchPlayed() {
    router.refresh();
  }

  async function startNewSeason() {
    const newSeasonResponse = await fetch(`/api/universe/${universe.id}`, {
      method: "POST",
    });

    const creatingResponse = await newSeasonResponse.json();

    if (!newSeasonResponse.ok) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: creatingResponse.message,
      });
      return;
    }

    toast({
      title: "Season started successfully",
    });
    router.refresh();
  }

  return (
    <>
      <div className="space-y-2 rounded-md border bg-card p-4">
        <h3>Competition</h3>
        <CompetitionSelector
          countries={universe.competitions}
          currentCompetition={currentCompetition}
          currentDivision={currentDivision}
          onCountryChange={onCountryChange}
          onDivisionChange={onDivisionChange}
          startNewSeason={startNewSeason}
          seasonStarted={universe.started}
          universeId={universe.id}
          seasonFinished={universe.finished}
          onMatchPlayed={onMatchPlayed}
        />
      </div>

      <div className="space-y-2 rounded-md border bg-card p-4">
        <h3>Navigation</h3>
        <div className="grid gap-4 md:flex md:items-center">
          {navigationList.map((navigation) => (
            <Button
              onClick={() => setCurrentLocation(navigation.location)}
              key={navigation.location}
            >
              {navigation.text}
            </Button>
          ))}
        </div>
      </div>

      <CurrentComponent currentDivision={currentDivision} universeId={universe.id} />
    </>
  );
}
