import { Avatar, Button, Card, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { gradient, screenWidth } from "../theme";

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
  const [w, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Card
      style={{
        flex: 1,
        marginTop: "8px",
        marginBottom: "8px",
        marginLeft: "16px",
        marginRight: "16px",
      }}
      maxH={"68px"}
    >
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor="#eb1b2e" offset="0%" />
          <stop stopColor="purple" offset="100%" />
        </linearGradient>
      </svg>

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

        {w > parseInt(screenWidth.sm) ? (
          <Button
            backgroundImage={gradient}
            color={"white"}
            size={"sm"}
            onClick={() => userTapped(index)}
            maxW={"116px"}
          >
            View Match History
          </Button>
        ) : (
          <FaHistory
            onClick={() => userTapped(index)}
            style={{ fill: "url(#blue-gradient)" }}
          />
        )}
        <HStack flex={1}>
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
