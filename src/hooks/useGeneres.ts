import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenres {
  genres: Genre[]
}


const useGeneres = () =>{

  const [isLoading, setLoading] = useState(false);
  const [generes, setGeneres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
   
  
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchGenres>('/genre/movie/list', { signal: controller.signal })
      .then((res) => {
        setGeneres(res.data.genres);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); 
  }, []);

  return { generes, error, isLoading };
}
export default useGeneres;