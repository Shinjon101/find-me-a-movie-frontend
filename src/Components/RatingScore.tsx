import { Badge } from "@chakra-ui/react";
import { parseScore } from "../services/parseScore";

interface Props {
  score: number;
}
const RatingScore = ({ score }: Props) => {
  score = parseScore(score);
  let color = score >= 7 ? "green" : score >= 4.5 ? "yellow" : "red";
  return (
    <Badge
      alignItems="top"
      borderRadius="4px"
      variant="solid"
      paddingX="1"
      colorScheme={color}
      data-testid="rating-score"
    >
      {score}
    </Badge>
  );
};

export default RatingScore;
