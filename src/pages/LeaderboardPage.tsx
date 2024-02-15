import { VStack, Text, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LeaderboardRow, {
  LeaderboardRowProps,
} from "../components/LeaderboardRow";

import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { app } from "../firebase";
import NavBar from "../components/NavBar";
import { REDIRECT_URL, USER_DB } from "../environment";
import { Player } from "../interfaces";
import Background from "../components/Background";
export default function LeaderboardPage() {
  const [usersData, setUsersData] = useState<Player[]>([]);
  useEffect(() => {
    getLeaderboardData();
  }, []);

  useEffect(() => {}, [usersData]);

  function userTapped(index: number) {
    const user = usersData[index];
    if (user) {
      window.location.href = `${REDIRECT_URL}/match-history/${user.uid}`;
    }
  }

  async function getLeaderboardData() {
    const db = getFirestore(app);
    const usersCollection = collection(db, USER_DB);
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    const userArray: Player[] = [];

    usersList.map((user) => {
      const leaderboardUser: Player = {
        firstName: user.first_name,
        lastName: user.last_name,
        nickName: user.first_name + " " + user.last_name,
        rating: user.rating,
        uid: user.uid,
        matches: user.matches,
        eloMult: user.matches >= 5 ? 1 : 2,
      };
      userArray.push(leaderboardUser);
    });

    userArray.sort((user1, user2) =>
      user1.rating < user2.rating ? 1 : user1.rating > user2.rating ? -1 : 0
    );

    setUsersData(userArray);
  }

  return (
    <Background>
      <NavBar />
      <VStack
        alignContent={"center"}
        align={"stretch"}
        width={"100%"}
        textAlign={"center"}
      >
        <Text textStyle={"lg-title"}>Leaderboard</Text>

        <HStack
          maxW={"1024px"}
          display={"flex"}
          style={{ paddingLeft: "48px" }}
        >
          <Text
            paddingLeft={"56px"}
            textAlign={"left"}
            textStyle={"md-title"}
            flex={2}
          >
            Player
          </Text>
          <Text textAlign={"left"} textStyle={"md-title"} flex={1}>
            Matches Played
          </Text>
          <Text textAlign={"left"} textStyle={"md-title"} flex={1}>
            Elo
          </Text>
        </HStack>
        {usersData?.map((userData: Player, index) => (
          <LeaderboardRow
            key={index}
            index={index}
            matches={userData.matches}
            userTapped={userTapped}
            name={userData.nickName}
            rating={userData.rating}
            rank={index + 1}
          />
        ))}
      </VStack>
    </Background>
  );
}
