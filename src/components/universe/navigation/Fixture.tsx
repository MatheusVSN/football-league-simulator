"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Division, MatchWeek } from "@/types/types";
import { useMemo, useState } from "react";

type UniverseFixturesProps = {
  currentDivision: Division;
};

type FixtureTableProps = {
  week: MatchWeek;
};

function FixtureTable({ week }: FixtureTableProps) {
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

export default function UniverseFixture({
  currentDivision,
}: UniverseFixturesProps) {
  const data = currentDivision.MatchWeek;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [page, setPage] = useState(1);
  const displayData = useMemo(() => {
    // Avoids infinite loop
    if (data.length < 1) return [];

    const start = (page - 1) * itemsPerPage;
    const paginatedData = data.slice(start, start + itemsPerPage);

    // Check if the the user is trying to surpass the limit of pagination
    // Or if he's trying to access before
    if (paginatedData.length < 1) {
      if (page < 1) {
        setPage(1);
        return [];
      }
      setPage(page - 1);
      return [];
    }

    return paginatedData;
  }, [data, page]);

  return (
    <div className="space-y-4 rounded-md border bg-card p-4">
      <h3>All fixtures</h3>

      {data.length > 0 ? (
        <>
          <div className="grid gap-4 text-center md:flex md:items-center">
            <Button onClick={() => setPage(page - 1)}>Previous Page</Button>
            <Button onClick={() => setPage(page + 1)}>Next Page</Button>
            <p>
              Page: {page} of {totalPages} pages available
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayData.map((week, index) => (
              <Table key={index} className="border text-center">
                <TableHeader className="bg-secondary">
                  <TableRow>
                    <TableHead className="text-center">Home</TableHead>
                    <TableHead className="text-center">
                      Week {week.week}
                    </TableHead>
                    <TableHead className="text-center">Away</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <FixtureTable week={week} />
                </TableBody>
              </Table>
            ))}
          </div>
        </>
      ) : (
        <p>There is no fixture for this competition at the moment</p>
      )}
    </div>
  );
}
