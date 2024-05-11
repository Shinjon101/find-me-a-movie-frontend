
import genres from "../data/genres";

export interface Genre {
  id: number;
  name: string;
}

const useGeneres = () =>  ({data:genres, isLoading:false,error:null})
  

export default useGeneres;