"use client";

import { Division, MatchWeek } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type FixtureTableProps = {
  division: Division;
};

type RenderMatchWeekProps = {
  week: MatchWeek;
};

function getCurrentWeek(matchWeek: MatchWeek[]) {
  for (let i = 0; i < matchWeek.length; i++) {
    const presumedWeek = matchWeek[i];
    if (!presumedWeek) return;
    if (!presumedWeek.played) {
      return presumedWeek;
    }
  }
}

function getLastPlayedWeek(matchWeek: MatchWeek[]) {
  for (let i = matchWeek.length; i >= 0; i--) {
    const presumedWeek = matchWeek[i];
    if (!presumedWeek) continue;
    if (presumedWeek.played) {
      return presumedWeek;
    }
  }
}

function getPlayedWeek(matchWeek: MatchWeek[], week?: number) {
  if (!week) return;

  const lastWeek = matchWeek[week - 1];
  if (!lastWeek) return;
  if (!lastWeek.played) return;

  return lastWeek;
}

function RenderMatchWeek({ week }: RenderMatchWeekProps) {
  return (
    <>
      {week.matches.map((match, index) => (
        <TableRow key={index}>
          <TableCell>{match.homeTeam.name}</TableCell>
          <TableCell>
            {week.played && match.homeScore} - {week.played && match.awayScore}
          </TableCell>
          <TableCell>{match.awayTeam.name}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default function FixtureTable({ division }: FixtureTableProps) {
  const matchWeek = division.MatchWeek;

  const currentWeek = getCurrentWeek(matchWeek);
  const lastPlayedWeek = getLastPlayedWeek(matchWeek);
  const playedWeek = getPlayedWeek(matchWeek, lastPlayedWeek?.week);

  // TODO: Check on playedWeek returning undefined on the last week

  return (
    <>
      {currentWeek && (
        <>
          <h3>Current fixture:</h3>
          <Table className="border text-center">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="text-center">Home</TableHead>
                <TableHead className="text-center">Result</TableHead>
                <TableHead className="text-center">Away</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <RenderMatchWeek week={currentWeek} />
            </TableBody>
          </Table>
        </>
      )}

      {playedWeek && (
        <>
          <h3>Last results:</h3>
          <Table className="border text-center">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="text-center">Home</TableHead>
                <TableHead className="text-center">Result</TableHead>
                <TableHead className="text-center">Away</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <RenderMatchWeek week={playedWeek} />
            </TableBody>
          </Table>{" "}
        </>
      )}
    </>
  );
}
