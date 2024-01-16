import { useEffect, useState } from "react";

import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  increment,
  doc,
} from "firebase/firestore/lite";
import { app } from "../firebase";
import { MATCH_DB, USER_DB } from "../environment";
import {
  Button,
  ChakraProvider,
  FormControl,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { uuidv4 } from "@firebase/util";
import NavBar from "../components/NavBar";
import { DocumentData } from "firebase/firestore";
import { Player } from "../interfaces";

export default function EnterGamePage() {
  const [users, setUsers] = useState<Player[]>([]);

  const [selectedPlayer1, setSelectedPlayer1] = useState<Player>();
  const [selectedPlayer2, setSelectedPlayer2] = useState<Player>();

  const [player1Score, setPlayer1Score] = useState<number>();
  const [player2Score, setPlayer2Score] = useState<number>();

  const [team1EloRisk, setTeam1EloRisk] = useState<number>();
  const [team2EloRisk, setTeam2EloRisk] = useState<number>();

  const [error, setError] = useState<string>();

  useEffect(() => {
    getUsersFromFB();
  }, []);

  useEffect(() => {
    if (selectedPlayer1 && selectedPlayer2) {
      const eloRisk1 = calculateElo(
        selectedPlayer1.rating,
        selectedPlayer2.rating
      );
      const eloRisk2 = calculateElo(
        selectedPlayer2.rating,
        selectedPlayer1.rating
      );

      setTeam1EloRisk(eloRisk1);
      setTeam2EloRisk(eloRisk2);
    }
  }, [selectedPlayer1, selectedPlayer2, users]);

  async function getUsersFromFB() {
    const db = getFirestore(app);
    const usersCollection = collection(db, USER_DB);
    const usersSnapshot = await getDocs(usersCollection);

    let userArray: any[] = [];

    const usersList = usersSnapshot.docs.map((doc) => doc.data());

    userArray = usersList;

    userArray.sort((user1, user2) =>
      user1.last_name[0] > user2.last_name[0]
        ? 1
        : user1.last_name[0] < user2.last_name[0]
        ? -1
        : 0
    );

    let playerList: Player[] = [];

    userArray.map((user) => {
      const player: Player = {
        uid: user.uid,
        nickName: user.first_name + " " + user.last_name,
        firstName: user.first_name,
        lastName: user.last_name,
        rating: user.rating,
        matches: user.matches,
        eloMult: user.matches < 5 ? 2 : 1,
      };
      playerList.push(player);
    });

    setUsers(playerList);

    if (playerList.length > 0) {
      setSelectedPlayer1(playerList[0]);
      setSelectedPlayer2(playerList[0]);
    }
  }

  function setPlayers(data: DocumentData[]) {}

  function calculateElo(rating1: number, rating2: number) {
    const diff = (rating1 - rating2) / 1000;

    const eProbWinner = 1 / (1 + Math.pow(10, diff));

    const eloRisk = Math.round(50 * eProbWinner);

    return eloRisk;
  }

  function determineWinner() {
    if (
      selectedPlayer1 &&
      selectedPlayer2 &&
      player1Score &&
      player2Score &&
      (player1Score >= 11 || player2Score >= 11) &&
      Math.abs(player1Score - player2Score) >= 2
    ) {
      if (error === "Game is not complete") {
        setError(undefined);
      }

      if (player1Score > player2Score) {
        return {
          winningPlayer: "player1",
          winner: selectedPlayer1,
          loser: selectedPlayer2,
          winnerScore: player1Score,
          loserScore: player2Score,
        };
      } else {
        return {
          winningPlayer: "player2",
          winner: selectedPlayer2,
          loser: selectedPlayer1,
          winnerScore: player2Score,
          loserScore: player1Score,
        };
      }
    } else {
      setError("Game is not complete");
      return;
    }
  }

  async function submitGame() {
    if (selectedPlayer1 && selectedPlayer2) {
      const ratings = determineWinner();

      if (selectedPlayer1.uid == selectedPlayer2.uid) {
        setError("Must select different player");
        return;
      } else {
        if (error == "Must select different player") {
          setError(undefined);
        }
      }

      if (ratings && ratings.winner && ratings.loser && ratings.winningPlayer) {
        const winner = ratings.winner;
        const loser = ratings.loser;

        const diff = (winner.rating - loser.rating) / 1000;

        const winnerEloMult = winner.matches < 5 ? 2 : 1;
        const loserEloMult = loser.matches < 5 ? 2 : 1;

        const eProbWinner = 1 / (1 + Math.pow(10, diff));

        const winnerEloGained = Math.round(50 * winnerEloMult * eProbWinner);
        const loserEloLost = Math.round(50 * loserEloMult * eProbWinner);

        const db = getFirestore(app);

        const winnerRating = winner.rating + winnerEloGained;
        const loserRating = loser.rating - loserEloLost;

        await setDoc(
          doc(db, USER_DB, winner.uid),
          {
            rating: winnerRating,
            matches: increment(1),
          },
          { merge: true }
        );
        await setDoc(
          doc(db, USER_DB, loser.uid),
          {
            rating: loserRating,
            matches: increment(1),
          },
          { merge: true }
        );
        const uid = uuidv4();
        const winnerUid = winner.uid as string;
        const loserUid = loser.uid as string;
        await setDoc(doc(db, MATCH_DB, uid), {
          date: new Date(),
          players: [winner.uid, loser.uid],
          score: {
            [winnerUid]: ratings.winnerScore,
            [loserUid]: ratings.loserScore,
          },
          elo_before: { [winnerUid]: winner.rating, [loserUid]: loser.rating },
          elo_after: { [winnerUid]: winnerRating, [loserUid]: loserRating },
        });

        setPlayer1Score(0);
        setPlayer2Score(0);

        if (ratings.winningPlayer == "player1") {
          setSelectedPlayer1({
            ...selectedPlayer1,
            rating: winnerRating,
            matches: selectedPlayer1.matches + 1,
            eloMult: selectedPlayer1.matches + 1 < 5 ? 2 : 1,
          });
          setSelectedPlayer2({
            ...selectedPlayer2,
            rating: loserRating,
            matches: selectedPlayer2.matches + 1,
            eloMult: selectedPlayer2.matches + 1 < 5 ? 2 : 1,
          });
        } else {
          setSelectedPlayer1({
            ...selectedPlayer1,
            rating: loserRating,
            matches: selectedPlayer1.matches + 1,
            eloMult: selectedPlayer1.matches + 1 < 5 ? 2 : 1,
          });
          setSelectedPlayer2({
            ...selectedPlayer2,
            rating: winnerRating,
            matches: selectedPlayer2.matches + 1,
            eloMult: selectedPlayer2.matches + 1 < 5 ? 2 : 1,
          });
        }
      } else {
        return;
      }
    }
  }

  return (
    <VStack
      alignContent={"center"}
      align={"stretch"}
      width={"75%"}
      margin={"auto"}
    >
      <ChakraProvider>
        <NavBar />
        <h1 style={{ textAlign: "center" }}> Select Players</h1>
        <HStack>
          <FormControl>
            <Select
              onChange={(e) => {
                setSelectedPlayer1(users[e.target.selectedIndex]);
              }}
            >
              {users.map((user) => (
                <option>{user.nickName}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              onChange={(e) => {
                setSelectedPlayer2(users[e.target.selectedIndex]);
              }}
            >
              {users.map((user) => (
                <option>{user.nickName}</option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        <HStack>
          <FormControl>
            <NumberInput
              onChange={(e) => {
                setPlayer1Score(parseInt(e));
              }}
              value={player1Score}
              min={0}
            >
              <NumberInputField placeholder="Enter player 1 score" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <NumberInput
              onChange={(e) => {
                setPlayer2Score(parseInt(e));
              }}
              value={player2Score}
              min={0}
            >
              <NumberInputField placeholder="Enter player 1 score" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </HStack>

        {selectedPlayer1 && selectedPlayer2 && team1EloRisk && team2EloRisk ? (
          <div>
            <HStack>
              <p>
                If player 1 wins they will gain:{" "}
                {team1EloRisk * selectedPlayer1.eloMult}
              </p>
              <p>
                If player 1 loses they will lose:{" "}
                {team2EloRisk * selectedPlayer1.eloMult}
              </p>
            </HStack>
            <HStack>
              <p>
                If player 2 wins they will gain:{" "}
                {team2EloRisk * selectedPlayer2.eloMult}
              </p>
              <p>
                If player 2 loses they will lose:{" "}
                {team1EloRisk * selectedPlayer2.eloMult}
              </p>
            </HStack>
          </div>
        ) : null}

        <Button onClick={submitGame}>Submit Game</Button>
        {error === undefined ? null : (
          <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
        )}
      </ChakraProvider>
    </VStack>
  );
}