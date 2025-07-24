import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("/genre/movie/list");

const useGeneres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () => apiClient.getGenres(),
    staleTime: 24 * 60 * 60 * 1000, //24h
    initialData: { genres },
  });

export default useGeneres;
