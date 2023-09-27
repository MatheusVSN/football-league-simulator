import { Division } from "@/types/types";
import FixtureTable from "../FixtureTable";
import StandingsTable from "../StandingsTable";

type UniverseHomeProps = {
    currentDivision: Division
}

export default function UniverseHome({currentDivision}: UniverseHomeProps) {
  return (
    <div className="space-y-2 rounded-md border bg-card p-4">
      <div className="flex flex-col-reverse justify-between gap-16 lg:flex-row">
        <div className="w-full space-y-4">
          <h3 className="text-center">Standings</h3>
          <StandingsTable currentDivision={currentDivision} />
        </div>
        <div className="flex w-full flex-col items-center space-y-4">
          <h3 className="text-center">Fixtures</h3>
          {currentDivision.MatchWeek.length < 1 ? (
            <p>There is no fixture</p>
          ) : (
            <FixtureTable division={currentDivision} />
          )}
        </div>
      </div>
    </div>
  );
}
