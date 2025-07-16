import { Badge, useColorModeValue } from "@chakra-ui/react";
interface Props {
  rDate: string;
}

const ReleaseDate = ({ rDate }: Props) => {
  const badgeBg = useColorModeValue("blue.100", "blue.600");
  const badgeColor = useColorModeValue("blue.800", "white");
  const year = rDate.slice(0, 4);
  return (
    <Badge
      aria-label="Release Year"
      fontSize="9"
      alignItems="top"
      borderRadius="4px"
      variant="solid"
      paddingX="1"
      bg={badgeBg}
      color={badgeColor}
    >
      {year}
    </Badge>
  );
};

export default ReleaseDate;
