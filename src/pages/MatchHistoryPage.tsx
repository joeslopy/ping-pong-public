import { ChakraProvider, VStack } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import MatchHistoryCard from "../components/MatchHistoryCard";
import MatchHistoryComponent from "../components/MatchHistoryComponent";
import NavBar from "../components/NavBar";
import { app } from "../firebase";
import { Player } from "../interfaces";
import { USER_DB, MATCH_DB } from "../environment";

export interface MatchHistory {
  previousDate?: number;
  currentPlayer: string;
  date: number;
  winner: string;
  score: string;
  eloBefore: number;
  eloAfter: number;
  eloDifference: number;
  oponent: string;
  player?: Player;
}

export default function MatchHistoryPage() {
  const [matchList, setMatchList] = useState<MatchHistory[]>();
  const [users, setUsers] = useState<Player[]>();
  const [currentUser, setCurrentUser] = useState<Player>();

  useEffect(() => {
    getMatchHistory();
  }, []);

  async function getUserForUid(uid: string) {
    // Fetch player document data
    const db = getFirestore(app);
    const docRef = doc(db, USER_DB, uid);
    const userDoc = await getDoc(docRef);
    const userData = userDoc.data();

    // Check existing user array to avoid unnecessary API calls
    if (userData) {
      const playerInfo = users?.find(function (player) {
        return player.uid == uid;
      });

      if (playerInfo) {
        return playerInfo;
      } else {
        const player: Player = {
          uid: userData.uid,
          nickName: userData.first_name + " " + userData.last_name,
          firstName: userData.first_name,
          lastName: userData.last_name,
          rating: userData.rating,
          matches: userData.matches,
          eloMult: userData.matches < 5 ? 2 : 1,
        };

        const userArray = users;
        userArray?.push(player);
        setUsers(userArray);

        return player;
      }
    }
  }

  async function getMatchHistory() {
    let url = window.location.toString();

    //Get current player uid from url
    let uid = url.split("match-history/")[1];

    // Query match collection for documents with current player
    const db = getFirestore(app);
    const matchQuery = query(
      collection(db, MATCH_DB),
      where("players", "array-contains", uid)
    );
    const usersSnapshot = await getDocs(matchQuery);
    const matchList = usersSnapshot.docs.map((doc) => doc.data());

    let matchArray: MatchHistory[] = [];

    await Promise.all(
      matchList.map(async (matchData, _) => {
        const player = uid;
        const currentPlayer = await getUserForUid(player);
        setCurrentUser(currentPlayer);

        const players = matchData.players;

        //  Players array always has length of 2
        const other: string[] = [...players];
        const index = other.indexOf(player);
        other.splice(index, 1);

        const otherPlayer = other[0];

        const score1 = matchData.score[player];
        const score2 = matchData.score[otherPlayer];

        const winner = score1 > score2 ? player : otherPlayer;

        const eloPlayer1Before = matchData.elo_before[player];
        const eloPlayer1After = matchData.elo_after[player];

        const eloDifference = eloPlayer1After - eloPlayer1Before;

        const playerInfo = await getUserForUid(otherPlayer);

        const match: MatchHistory = {
          currentPlayer: player,
          date: matchData.date["seconds"],
          winner,
          score: `${score1}:${score2}`,
          eloBefore: eloPlayer1Before,
          eloAfter: eloPlayer1After,
          eloDifference,
          oponent: otherPlayer,
          player: playerInfo,
        };
        matchArray.push(match);
      })
    );

    matchArray.sort((match1, match2) => match2.date - match1.date);

    setMatchList(matchArray);
  }

  return (
    <ChakraProvider>
      <NavBar />
      <h1 style={{ textAlign: "center", fontSize: 24, fontWeight: 800 }}>
        {currentUser === undefined
          ? "Loading..."
          : `${currentUser?.firstName}'s Match History`}
      </h1>

      <VStack
        alignContent={"center"}
        align={"stretch"}
        width={"90%"}
        margin={"auto"}
      >
        {matchList?.map((match, index) => (
          <MatchHistoryCard
            previousDate={matchList[Math.max(index - 1, 0)].date}
            date={match.date}
            oponent={match.oponent}
            outcome={match.score}
            player={match.player}
            currentPlayer={match.currentPlayer}
            eloBefore={match.eloBefore}
            eloAfter={match.eloAfter}
            winner={match.winner}
          ></MatchHistoryCard>
        ))}
      </VStack>
    </ChakraProvider>
  );
}
