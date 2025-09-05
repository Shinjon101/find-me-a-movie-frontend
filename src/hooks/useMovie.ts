import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("/movies");

const useMovie = (id: string) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: () => apiClient.getMovie(id),
  });

export default useMovie;
