import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Division, PastSeason, Team } from "@/types/types";

type UniverseHistoryProps = {
  currentDivision: Division;
};

type PastSeasonProps = {
  pastSeasons: PastSeason[];
};

interface TitleCount {
  [key: string]: {
    team: Team;
    titles: number;
  };
}

function ChampionsTable({ pastSeasons }: PastSeasonProps) {
  if (pastSeasons.length < 1) return <p>There is no past champions yet</p>;
  return (
    <Table className="border">
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead>Season</TableHead>
          <TableHead>Champion</TableHead>
          <TableHead>Runner up</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pastSeasons.map((season, index) => (
          <TableRow key={index}>
            <TableCell>{season.season}</TableCell>
            <TableCell>{season.champion.team.name}</TableCell>
            <TableCell>{season.runnerUp.team.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TotalTitlesTable({ pastSeasons }: PastSeasonProps) {
  if (pastSeasons.length < 1)
    return <p>There is no past seasons history yet</p>;

  console.log(pastSeasons);
  const countTitles = pastSeasons.reduce(
    (previousValue: TitleCount, currentObject: PastSeason) => {
      const id = currentObject.champion.team.id;
      if (!previousValue[id]) {
        previousValue[id] = { team: currentObject.champion.team, titles: 0 };
      }
      previousValue[id].titles += 1;
      return previousValue;
    },
    {} as TitleCount,
  );

  const sortedTitles = Object.values(countTitles).sort(
    (a, b) => b.titles - a.titles,
  );

  console.log(sortedTitles);

  return (
    <Table className="border">
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead>Team</TableHead>
          <TableHead>Title(s)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTitles.map((team, index) => (
          <TableRow key={index}>
            <TableCell>{team.team.name}</TableCell>
            <TableCell>{team.titles}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function UniverseHistory({
  currentDivision,
}: UniverseHistoryProps) {
  return (
    <div className="space-y-4 rounded-md border bg-card p-4">
      <div className="flex flex-col-reverse justify-between gap-16 lg:flex-row">
        <div className="w-full space-y-4">
          <h3>Previous champions:</h3>
          <ChampionsTable pastSeasons={currentDivision.pastSeasons} />
        </div>
        <div className="w-full space-y-4">
          <h3>Total titles:</h3>
          <TotalTitlesTable pastSeasons={currentDivision.pastSeasons} />
        </div>
      </div>
    </div>
  );
}
