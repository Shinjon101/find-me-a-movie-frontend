import { SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MovieSimpleGrid = ({ children }: Props) => {
  return (
    <SimpleGrid
      as="ul"
      listStyleType="none"
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={8}
      padding={2}
      justifyItems={{ base: "center", sm: "stretch" }}
    >
      {children}
    </SimpleGrid>
  );
};

export default MovieSimpleGrid;
