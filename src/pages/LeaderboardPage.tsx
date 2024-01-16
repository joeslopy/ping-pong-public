import { ChakraProvider, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LeaderboardRow, {
  LeaderboardRowProps,
} from "../components/LeaderboardRow";

import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { app } from "../firebase";
import NavBar from "../components/NavBar";
import { MATCH_DB, REDIRECT_URL, USER_DB } from "../environment";
export default function LeaderboardPage() {
  const [usersData, setUsersData] = useState<any[]>([]);
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
    const userArray: any[] = [];

    usersList.map((user) => {
      const leaderboardUser = {
        name: user.first_name + " " + user.last_name,
        rating: user.rating,
        uid: user.uid,
      };
      userArray.push(leaderboardUser);
    });

    userArray.sort((user1, user2) =>
      user1.rating < user2.rating ? 1 : user1.rating > user2.rating ? -1 : 0
    );

    setUsersData(userArray);
  }

  return (
    <ChakraProvider>
      <NavBar />
      <VStack
        alignContent={"center"}
        align={"stretch"}
        width={"75%"}
        margin={"auto"}
      >
        <div style={{ alignItems: "center" }}>
          <h1 style={{ textAlign: "center" }}>Leaderboard</h1>
        </div>

        {usersData?.map((userData: LeaderboardRowProps, index) => (
          <LeaderboardRow
            key={index}
            index={index}
            userTapped={userTapped}
            name={userData.name}
            rating={userData.rating}
            rank={index + 1}
          />
        ))}
      </VStack>
    </ChakraProvider>
  );
}
