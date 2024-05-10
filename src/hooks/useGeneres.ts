
import { CanceledError } from "axios";
import useData from "./useData";

export interface Genre {
  id: number;
  name: string;
}

const useGeneres = () =>
  useData<Genre>('/genre/movie/list')

export default useGeneres;