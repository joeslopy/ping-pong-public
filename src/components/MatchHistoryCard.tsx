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
  const [elementWidths, setElementWidths] = useState(new Map<string, number>());
  const elemetIds = [
    "match-time",
    "oponent-name",
    "outcome",
    "score",
    "elo-diff",
    "elo-after-match",
  ];

  function getWidthForElement(elementId: string): number | undefined {
    var element = document.getElementById(elementId);
    var positionInfo = element?.getBoundingClientRect();
    var width = positionInfo?.width;
    return width;
  }

  useEffect(() => {
    // initial size calculation
    handleResize();
  }, []);

  function handleResize() {
    for (let elementId of elemetIds) {
      const elementWidth = getWidthForElement(elementId);

      setElementWidths((map) => new Map(map.set(elementId, elementWidth ?? 0)));
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Card
      style={{ justifyContent: "center", display: "flex", padding: "8px" }}
      height={"60px"}
    >
      <HStack
        style={{
          display: "flex",
          textAlign: "left",
          padding: "8px",
        }}
      >
        <Text minW={elementWidths.get(elemetIds[0])} textStyle={"md"}>
          {format(date * 1000, "HH:mm")}
        </Text>

        <Text textStyle={"md"} flex={1} minW={elementWidths.get(elemetIds[1])}>
          {player?.nickName ?? "Mysterious Person"}
        </Text>

        <Text
          textStyle={"md"}
          minW={elementWidths.get(elemetIds[2])}
          style={{
            color: winner === currentPlayer ? "green" : "red",
          }}
        >
          {winner === currentPlayer ? "W" : "L"}
        </Text>

        <Text minW={elementWidths.get(elemetIds[3])} textStyle={"md"}>
          {score}
        </Text>

        <Text
          textStyle={"md"}
          minW={elementWidths.get(elemetIds[4])}
          style={{
            color: eloAfter - eloBefore > 0 ? "green" : "red",
          }}
        >
          {eloAfter - eloBefore > 0 ? "+" : null}
          {eloAfter - eloBefore}
        </Text>

        <Text minW={elementWidths.get(elemetIds[5])} textStyle={"md"}>
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

  console.log("WTFFF", date);

  //const prevDate = format((previousDate ?? 0) * 1000, "MMM dd yyyy");
  const currDate = format(date, "MMM dd yyyy");

  return (
    <div style={{ whiteSpace: "nowrap" }}>
      <Text textStyle={"md-title"}>{currDate}</Text>
      <HStack display={"flex"}>
        <Text id={"match-time"} textStyle={"xs"}>
          Match Time
        </Text>{" "}
        <Text id={"oponent-name"} textStyle={"xs"} flex={1}>
          Oponent Name
        </Text>{" "}
        <Text id={"outcome"} textStyle={"xs"}>
          Outcome
        </Text>{" "}
        <Text id={"score"} textStyle={"xs"}>
          Score
        </Text>{" "}
        <Text id={"elo-diff"} textStyle={"xs"}>
          Elo Difference
        </Text>{" "}
        <Text id={"elo-after-match"} textStyle={"xs"}>
          Elo After Match
        </Text>{" "}
      </HStack>

      {matchHistroy.map((match) => (
        <MatchHistoryEntry {...match} />
      ))}

      {/* {matchHistroy.map((match) => {
        <MatchHistoryEntry></MatchHistoryEntry>;
      })} */}
    </div>
  );

  //   <div>
  //   {prevDate === currDate && previousDate !== date ? null : (
  //     <>
  //       <Text fontWeight={600}>{format(date * 1000, "MMM dd yyyy")} </Text>

  //
  //     </>
  //   )}
  //   <Card
  //     style={{ justifyContent: "center", display: "flex" }}
  //     height={"60px"}
  //   >
  //     <HStack
  //       style={{
  //         justifyContent: "space-evenly",
  //         display: "flex",
  //         textAlign: "left",
  //       }}
  //     >
  //       <Text style={{ fontSize: fontSize, textAlign: "left" }}>
  //         {format(date * 1000, "HH:mm")}
  //       </Text>

  //       <Text style={{ fontSize: fontSize }}>
  //         {player?.nickName ?? "Mysterious Person"}
  //       </Text>

  //       <Text
  //         style={{
  //           color: winner === currentPlayer ? "green" : "red",
  //           fontSize: fontSize,
  //         }}
  //       >
  //         {winner === currentPlayer ? "W" : "L"}
  //       </Text>

  //       <Text style={{ fontSize: fontSize }}>{outcome}</Text>

  //       <Text
  //         style={{
  //           color: eloAfter - eloBefore > 0 ? "green" : "red",
  //           fontSize: fontSize,
  //         }}
  //       >
  //         {eloAfter - eloBefore}
  //       </Text>

  //       <Text style={{ fontSize: fontSize }}>{eloAfter}</Text>
  //     </HStack>
  //   </Card>
  // </div>
}
