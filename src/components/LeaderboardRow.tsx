import { Avatar, Button, Card, HStack, Text, VStack } from "@chakra-ui/react";
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
    <Card
      style={{
        flex: 1,
        marginTop: "8px",
        marginBottom: "8px",
        marginLeft: "32px",
        marginRight: "32px",
      }}
      maxH={"68px"}
    >
      <HStack paddingLeft={"20px"} paddingRight={"20px"}>
        <Text paddingRight={"10px"} textStyle={"xl"}>
          {rank}
        </Text>

        <Avatar
          height={{
            xs: "32px",
            sm: "48px",
            md: "48px",
          }}
          width={{
            xs: "32px",
            sm: "48px",
            md: "48px",
          }}
          style={{ margin: "10px" }}
        />

        <Text textStyle={"lg"} textAlign={"left"} flex={1}>
          {name}
        </Text>

        <HStack flex={1}>
          <Button
            backgroundImage={"linear-gradient(to right, #eb1b2e, purple)"}
            color={"white"}
            size={"sm"}
            onClick={() => userTapped(index)}
            maxW={116}
          >
            View Match History
          </Button>
          <Text textAlign={"left"} textStyle={"lg"}>
            {matches}
          </Text>
        </HStack>
        <Text textAlign={"left"} textStyle={"lg"} flex={0}>
          {rating}
        </Text>
      </HStack>
    </Card>
  );
}
