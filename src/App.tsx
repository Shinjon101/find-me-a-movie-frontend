import { useState } from "react";
import GenreList from "./Components/GenreList";
import MovieGrid from "./Components/MovieGrid";
import NavBar from "./Components/NavBar";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Genre } from "./hooks/useGeneres";
import { SortSelector } from "./Components/SortSelector";
const App = () => {
  const [selcetedGenre, setSelectedGenre] = useState<Genre | null>(null);
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
          <GenreList
            selectedGenre={selcetedGenre}
            onSelectGenre={(gen) => setSelectedGenre(gen)}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <SortSelector />
        <MovieGrid selectedGenre={selcetedGenre} />
      </GridItem>
    </Grid>
  );
};

export default App;
