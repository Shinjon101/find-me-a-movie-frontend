import { create } from "zustand";
import { Genre } from "./apiClient";

export interface MovieQuery {
  genre?: Genre | null;
  sortOrder?: string;
  searchText?: string;
}

/*used  to store the state (of movie query) and 
 functions to update various filters*/

interface MovieQueryStore {
  movieQuery: MovieQuery;
  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setGenre: (genre: Genre) => void;
}

const useMovieQueryStore = create<MovieQueryStore>((set) => ({
  movieQuery: {},
  setSearchText: (searchText) => set(() => ({ movieQuery: { searchText } })),
  setGenre: (genre) =>
    set((store) => ({
      movieQuery: { ...store.movieQuery, genre: genre.id === 1 ? null : genre },
    })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ movieQuery: { ...store.movieQuery, sortOrder } })),
}));

export default useMovieQueryStore;
