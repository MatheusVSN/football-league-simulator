"use client";

import { organizeStandingsTable } from "@/lib/standingsTable";
import { Division, TeamStanding } from "@/types/types";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type StandingTableProps = {
  currentDivision: Division;
};

export default function StandingsTable({
  currentDivision,
}: StandingTableProps) {
  const [currentStandings, setCurrentStandings] = useState<
    TeamStanding[] | null
  >(null);

  useEffect(() => {
    const organizedTable = organizeStandingsTable(currentDivision);
    setCurrentStandings(organizedTable);
  }, [currentDivision]);

  const promotionPosition = currentDivision.promotion;
  const relegationPosition = currentDivision.relegation;
  const teamsAmount = currentDivision.teams.length;

  function getPosition(position: number) {
    if (promotionPosition && position <= promotionPosition)
      return "bg-green-700/20";
    if (relegationPosition && position >= teamsAmount - relegationPosition + 1)
      return "bg-red-700/20";
  }

  return (
    <Table className="border">
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead className="w-2">POS</TableHead>
          <TableHead className="w-8">Name</TableHead>
          <TableHead className="w-2">P</TableHead>
          <TableHead className="w-2 max-sm:hidden">W</TableHead>
          <TableHead className="w-2 max-sm:hidden">D</TableHead>
          <TableHead className="w-2 max-sm:hidden">L</TableHead>
          <TableHead className="w-2 max-sm:hidden">GF</TableHead>
          <TableHead className="w-2 max-sm:hidden">GC</TableHead>
          <TableHead className="w-2 max-sm:hidden">GD</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentStandings &&
          currentStandings.map((standing, index) => (
            <TableRow className={`${getPosition(index + 1)}`} key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{standing.team.name}</TableCell>
              <TableCell className="font-bold">{standing.points}</TableCell>
              <TableCell className="max-sm:hidden">{standing.wins}</TableCell>
              <TableCell className="max-sm:hidden">{standing.draw}</TableCell>
              <TableCell className="max-sm:hidden">{standing.losses}</TableCell>
              <TableCell className="max-sm:hidden">
                {standing.goalsFor}
              </TableCell>
              <TableCell className="max-sm:hidden">
                {standing.goalsConceded}
              </TableCell>
              <TableCell className="max-sm:hidden">
                {standing.goalsFor - standing.goalsConceded}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
