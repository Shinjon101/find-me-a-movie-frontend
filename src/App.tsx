import { Grid, GridItem, Show } from "@chakra-ui/react";
import GenreList from "./Components/GenreList";
import MovieGrid from "./Components/MovieGrid";
import MovieHeading from "./Components/MovieHeading";
import NavBar from "./Components/NavBar";
import { SortSelector } from "./Components/SortSelector";

const App = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "150px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
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

export default App;
