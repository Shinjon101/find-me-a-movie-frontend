import { Grid, GridItem, Show } from "@chakra-ui/react";
import GenreList from "../Components/GenreList";
import MovieGrid from "../Components/MovieGrid";
import MovieHeading from "../Components/MovieHeading";
import { SortSelector } from "../Components/SortSelector";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "150px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={3}>
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <MovieHeading />
        <SortSelector />
        <MovieGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
