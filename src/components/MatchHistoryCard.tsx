import { Card, HStack, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Player } from "../interfaces";

export interface MatchHistortyCardProps {
  currentPlayer: string;
  previousDate?: number;
  date: number;
  oponent: string;
  outcome: string;
  eloBefore: number;
  eloAfter: number;
  winner: string;
  player?: Player;
}

export default function MatchHistoryCard({
  currentPlayer,
  previousDate,
  date,
  oponent,
  outcome,
  player,
  eloAfter,
  eloBefore,
  winner,
}: MatchHistortyCardProps) {
  const [fontSize, setFontSize] = useState<number>(18);
  const [subHeadingFontSize, setSubHeadingFontSize] = useState<number>(12);

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width } = window;
      const fontSize = width >= 375 ? 16 : 12;
      setFontSize(fontSize);
      const subHeadingFontSize = width >= 375 ? 12 : 8;
      setSubHeadingFontSize(subHeadingFontSize);
    }

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const subHeaderFontWeight = 800;

  const prevDate = format((previousDate ?? 0) * 1000, "MMM dd yyyy");
  const currDate = format(date * 1000, "MMM dd yyyy");

  return (
    <div>
      {prevDate === currDate && previousDate !== date ? null : (
        <>
          <Text fontWeight={600}>{format(date * 1000, "MMM dd yyyy")} </Text>

          <HStack justifyContent={"space-evenly"}>
            <Text
              fontWeight={subHeaderFontWeight}
              fontSize={subHeadingFontSize}
            >
              Match Time
            </Text>{" "}
            <Text
              fontWeight={subHeaderFontWeight}
              fontSize={subHeadingFontSize}
            >
              Oponent Name
            </Text>{" "}
            <Text
              fontWeight={subHeaderFontWeight}
              fontSize={subHeadingFontSize}
            >
              Outcome
            </Text>{" "}
            <Text
              fontWeight={subHeaderFontWeight}
              fontSize={subHeadingFontSize}
            >
              Score
            </Text>{" "}
            <Text
              fontWeight={subHeaderFontWeight}
              fontSize={subHeadingFontSize}
            >
              Elo Difference
            </Text>{" "}
            <Text
              fontWeight={subHeaderFontWeight}
              fontSize={subHeadingFontSize}
            >
              Elo After Match
            </Text>{" "}
            {/* <div style={{ textAlign: "left", paddingLeft: "20px" }}></div> */}
          </HStack>
        </>
      )}
      <Card
        style={{ justifyContent: "center", display: "flex" }}
        height={"60px"}
      >
        <HStack
          style={{
            justifyContent: "space-evenly",
            display: "flex",
            textAlign: "left",
          }}
        >
          <Text style={{ fontSize: fontSize, textAlign: "left" }}>
            {format(date * 1000, "HH:mm")}
          </Text>

          <Text style={{ fontSize: fontSize }}>
            {player?.nickName ?? "Mysterious Person"}
          </Text>

          <Text
            style={{
              color: winner === currentPlayer ? "green" : "red",
              fontSize: fontSize,
            }}
          >
            {winner === currentPlayer ? "W" : "L"}
          </Text>

          <Text style={{ fontSize: fontSize }}>{outcome}</Text>

          <Text
            style={{
              color: eloAfter - eloBefore > 0 ? "green" : "red",
              fontSize: fontSize,
            }}
          >
            {eloAfter - eloBefore}
          </Text>

          <Text style={{ fontSize: fontSize }}>{eloAfter}</Text>
        </HStack>
      </Card>
    </div>
  );
}
