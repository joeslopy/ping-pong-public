import { Avatar, Button, Card, HStack, Text } from "@chakra-ui/react";
import React from "react";

export interface LeaderboardRowProps {
  name: string;
  rating: number;
  matches: number;
  image?: string;
  rank?: number;
  index?: number;
  userTapped?: any;
}

export default function LeaderboardRow({
  name,
  rating,
  matches,
  image,
  rank,
  index,
  userTapped,
}: LeaderboardRowProps) {
  return (
    <Button
      onClick={() => userTapped(index)}
      style={{ flex: 1, padding: "0px" }}
    >
      <Card style={{ flex: 1 }}>
        <HStack>
          <Text paddingLeft={"20px"} paddingRight={"10px"} textStyle={"lg"}>
            {rank}
          </Text>

          <Avatar style={{ margin: "10px" }} />

          <Text textAlign={"left"} textStyle={"lg"} flex={2}>
            {name}
          </Text>
          <Text textAlign={"left"} textStyle={"lg"} flex={1}>
            {matches}
          </Text>
          <Text textAlign={"left"} textStyle={"lg"} flex={1}>
            {rating}
          </Text>
        </HStack>
      </Card>
    </Button>
  );
}
