import { Player } from "../interfaces";
import { MatchHistory } from "../pages/MatchHistoryPage";
import MatchHistoryCard from "./MatchHistoryCard";

export interface MatchHistoryPropSpecial {
  matchList?: MatchHistory[];
  user: Player;
}

export default function MatchHistoryComponent({
  matchList,
  user,
}: MatchHistoryPropSpecial) {
  return (
    <div>
      {matchList?.map((match, index) => (
        <MatchHistoryCard
          previousDate={matchList[Math.max(index - 1, 0)].date}
          date={match.date}
          oponent={match.oponent}
          outcome={match.score}
          player={user}
          currentPlayer={match.currentPlayer}
          eloBefore={match.eloBefore}
          eloAfter={match.eloAfter}
          winner={match.winner}
        ></MatchHistoryCard>
      ))}
    </div>
  );
}
