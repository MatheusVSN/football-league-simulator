"use client";

import { Competition, Division } from "@/types/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";

type CompetitionSelectorProps = {
  currentCompetition: Competition;
  countries: Competition[];
  currentDivision: Division;
  onCountryChange: (newCountry: string) => void;
  onDivisionChange: (newDivision: string) => void;
  startNewSeason: () => Promise<void>;
  seasonStarted: boolean;
  universeId: string;
  seasonFinished: boolean;
  onMatchPlayed: () => void;
};

type SelectCountryProps = {
  currentCompetition: Competition;
  countries: Competition[];
  onCountryChange: (newCountry: string) => void;
};

type SelectDivisionProps = {
  currentCompetition: Competition;
  currentDivision: Division;
  onDivisionChange: (newDivision: string) => void;
};

function SelectCountry({
  currentCompetition,
  onCountryChange,
  countries,
}: SelectCountryProps) {
  return (
    <Select
      value={currentCompetition.country}
      onValueChange={(country) => onCountryChange(country)}
    >
      <SelectTrigger className="w-full sm:w-52">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available countries</SelectLabel>
          {countries.map((competition) => (
            <SelectItem value={competition.country} key={competition.country}>
              {competition.country}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function SelectDivision({
  currentCompetition,
  onDivisionChange,
  currentDivision,
}: SelectDivisionProps) {
  return (
    <Select
      value={currentDivision.name}
      onValueChange={(division) => onDivisionChange(division)}
    >
      <SelectTrigger className="w-full sm:w-52">
        <SelectValue placeholder="Select a division" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available divisions</SelectLabel>
          {currentCompetition.leagues.map((division) => (
            <SelectItem key={division.name} value={division.name}>
              {division.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function CompetitionSelector({
  currentCompetition,
  countries,
  currentDivision,
  onDivisionChange,
  onCountryChange,
  startNewSeason,
  seasonStarted,
  universeId,
  seasonFinished,
  onMatchPlayed,
}: CompetitionSelectorProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    await startNewSeason();
    setLoading(false);
  }

  async function simulateWeek() {
    setLoading(true);

    const simulateResponse = await fetch(`/api/universe/${universeId}/play`, {
      method: "POST",
    });

    setLoading(false);

    if (!simulateResponse.ok) {
      const result = await simulateResponse.json();
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: result.message,
      });
      return;
    }

    onMatchPlayed();
  }

  return (
    <div className="grid gap-2 sm:flex sm:items-center">
      <SelectCountry
        currentCompetition={currentCompetition}
        countries={countries}
        onCountryChange={onCountryChange}
      />
      <SelectDivision
        currentCompetition={currentCompetition}
        currentDivision={currentDivision}
        onDivisionChange={onDivisionChange}
      />
      {(!seasonStarted || seasonFinished) && (
        <Button disabled={loading} onClick={start}>
          {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
          Start a new season
        </Button>
      )}
      {seasonStarted && !seasonFinished && (
        <Button onClick={simulateWeek} disabled={loading}>
          {loading && <Loader2 size={16} className="mr-2 animate-spin" />}
          Simulate week
        </Button>
      )}
    </div>
  );
}
