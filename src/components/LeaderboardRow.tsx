import { Avatar, Button, Card, HStack, Text } from "@chakra-ui/react";
import React from "react";

export interface LeaderboardRowProps {
  name: string;
  rating: number;
  image?: string;
  rank?: number;
  index?: number;
  userTapped?: any;
}

export default function LeaderboardRow({
  name,
  rating,
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
        {" "}
        <HStack>
          <div style={{ textAlign: "left", paddingLeft: "20px" }}>
            <Text>{rank}</Text>
          </div>
          <div style={{ padding: "10px" }}>
            {" "}
            <Avatar />
          </div>

          {/* <Image
          style={{
            borderRadius: "40px",
            height: "80px",
            width: "80px",
            padding: "10px",
          }}
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
        ></Image> */}
          <Text>{name}</Text>
          <div style={{ textAlign: "right", paddingRight: "20px", flex: 1 }}>
            <Text>{rating}</Text>
          </div>
        </HStack>{" "}
      </Card>
    </Button>
  );
}
