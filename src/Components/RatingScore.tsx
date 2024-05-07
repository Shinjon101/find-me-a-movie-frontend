import { Badge } from "@chakra-ui/react";
import React from "react";

interface Props {
  score: number;
}
const RatingScore = ({ score }: Props) => {
  score = parseFloat(score.toFixed(1));
  let color = score >= 7 ? "green" : score >= 4.5 ? "yellow" : "red";
  return (
    <Badge alignItems="top" borderRadius="4px" paddingX="1" colorScheme={color}>
      {score}
    </Badge>
  );
};

export default RatingScore;
