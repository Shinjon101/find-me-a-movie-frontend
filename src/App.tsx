import GenreList from "./Components/GenreList";
import MovieGrid from "./Components/MovieGrid";
import NavBar from "./Components/NavBar";
import { Grid, GridItem, Show } from "@chakra-ui/react";
const App = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside">
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <MovieGrid />
      </GridItem>
    </Grid>
  );
};

export default App;
