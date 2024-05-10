import { Movie } from "../hooks/useMovies"
import Genres from "../data/genres"
 
const genres = Genres;
export const addGenreName = (movies:Movie[]) => {
     
  movies.forEach(movie => {
    movie.genres = movie.genre_ids.map(genreId => {
      const genre = genres.find(genre => genre.id === genreId);
      return genre ? genre.name : 'Unknown';
    });
  });

  console.log(movies);
  
  return movies;
   
}