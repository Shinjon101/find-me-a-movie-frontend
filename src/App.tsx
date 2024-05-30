import { useState } from "react";
import GenreList from "./Components/GenreList";
import MovieGrid from "./Components/MovieGrid";
import NavBar from "./Components/NavBar";
import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Genre } from "./services/apiClient";
import { SortSelector } from "./Components/SortSelector";
import MovieHeading from "./Components/MovieHeading";

export interface MovieQuery {
  genre: Genre | null;
  sortOrder: string;
  searchText: string;
}

const App = () => {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({} as MovieQuery);

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
        <NavBar
          onSearch={(searchText) => {
            setMovieQuery({ ...movieQuery, searchText });
          }}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={3}>
          <GenreList
            selectedGenre={movieQuery.genre}
            onSelectGenre={(genre) => setMovieQuery({ ...movieQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <MovieHeading movieQuery={movieQuery} />
        <SortSelector
          sortOrder={movieQuery.sortOrder}
          onSelectSortOrder={(sortOrder) =>
            setMovieQuery({ ...movieQuery, sortOrder })
          }
        />
        <MovieGrid movieQuery={movieQuery} />
      </GridItem>
    </Grid>
  );
};

export default App;
