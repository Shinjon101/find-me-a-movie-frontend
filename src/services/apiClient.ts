import axios, { AxiosRequestConfig } from "axios";
import { Movie } from "../hooks/useMovies";

export interface MovieFetchResponse<T>{
  page: number;
  results: T[];
}
export interface Genre {
  id: number;
  name: string;
}
export interface GenreFetchResponse {
  genres: Genre[]
}

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjQ1NWRmMjk0MDU5M2U0NTJjNWMxOTFjYjNhYzQyZiIsInN1YiI6IjY2MzRmYzcxYzYxNmFjMDEyODE5ZWQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JuRq_nXJR39gKDZmtSnuFb801ahhNxSpnRGJYsYQkI8'
  },

});

class APIClient {
  endpoint: string;

  constructor  ( endpoint: string) {
    this.endpoint = endpoint
  }

  getMovies = (config: AxiosRequestConfig)=>{

    return axiosInstance.get<MovieFetchResponse<Movie>>(this.endpoint, config)
    .then(res => res.data);
  }

  getGenres = ()=> {
    return axiosInstance.get<GenreFetchResponse>(this.endpoint)
    .then(res => res.data);
  }
}

export default APIClient;