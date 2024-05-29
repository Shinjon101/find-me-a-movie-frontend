
import {  useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import apiClient from "../services/apiClient";

export interface Genre {
  id: number;
  name: string;
}
interface GenreFetchResponse {
  genres: Genre[]
}

const useGeneres = () =>  
  useQuery({
    queryKey:['genres'],
    queryFn: ()=>
      apiClient.get<GenreFetchResponse>("/genre/movie/list").then((res)=>res.data),
    staleTime: 24*60*60*1000, //24h
    initialData: {genres}
  }
  )

  

export default useGeneres;