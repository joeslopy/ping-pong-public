import { Card, HStack, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Player } from "../interfaces";
import { MatchHistory, MatchHistoryDate } from "../pages/MatchHistoryPage";

function MatchHistoryEntry({
  currentPlayer,
  date,
  eloAfter,
  eloBefore,
  eloDifference,
  oponent,
  score,
  winner,
  player,
}: MatchHistory) {
  return (
    <Card
      style={{
        justifyContent: "center",
        display: "flex",
        padding: "8px",
        marginTop: "8px",
        marginBottom: "8px",
      }}
      height={"60px"}
    >
      <HStack
        style={{
          display: "flex",
          textAlign: "left",
        }}
      >
        <Text flex={1} textStyle={"md"}>
          {format(date * 1000, "HH:mm")}
        </Text>

        <Text textStyle={"md"} flex={2}>
          {player?.nickName ?? "Mysterious Person"}
        </Text>

        <Text
          textStyle={"md"}
          flex={1}
          style={{
            color: winner === currentPlayer ? "green" : "red",
          }}
        >
          {winner === currentPlayer ? "W" : "L"}
        </Text>

        <Text flex={1} textStyle={"md"}>
          {score}
        </Text>

        <Text
          textStyle={"md"}
          flex={1}
          style={{
            color: eloAfter - eloBefore > 0 ? "green" : "red",
          }}
        >
          {eloAfter - eloBefore > 0 ? "+" : null}
          {eloAfter - eloBefore}
        </Text>

        <Text flex={1} textStyle={"md"}>
          {eloAfter}
        </Text>
      </HStack>
    </Card>
  );
}

export default function MatchHistoryCard({
  date,
  matchHistroy,
}: MatchHistoryDate) {
  const subHeaderFontWeight = 800;

  //const prevDate = format((previousDate ?? 0) * 1000, "MMM dd yyyy");
  const currDate = format(date, "MMM dd yyyy");

  return (
    <div>
      <Text textStyle={"md-title"}>{currDate}</Text>
      <HStack display={"flex"} style={{ padding: "8px" }}>
        <Text textStyle={"xs"} flex={1}>
          Match Time
        </Text>{" "}
        <Text textStyle={"xs"} flex={2}>
          Oponent Name
        </Text>{" "}
        <Text textStyle={"xs"} flex={1}>
          Outcome
        </Text>{" "}
        <Text textStyle={"xs"} flex={1}>
          Score
        </Text>{" "}
        <Text textStyle={"xs"} flex={1}>
          Elo Difference
        </Text>{" "}
        <Text textStyle={"xs"} flex={1}>
          Elo After Match
        </Text>{" "}
      </HStack>

      {matchHistroy.map((match) => (
        <MatchHistoryEntry {...match} />
      ))}
      <div style={{ height: "24px" }} />
    </div>
  );
}
