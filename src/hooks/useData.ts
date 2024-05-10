import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T>{
  page: number;
  results: T[];
  genres: T[];  //shitty api design
  
}

const useData = <T>( endpoint:string , requestConfig?:AxiosRequestConfig, dataModify?: (data: T[])=> T[], deps?: any[], searchSort?: (data: T[], order: string|undefined)=>T[], searchSortOrder?:string) => { 
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint,{signal: controller.signal, ...requestConfig })
      .then((res) => {

  
        let resData = <T[]> []   
           if(res.data.genres) {
            resData = res.data.genres;
            setData(resData)
           }
           if(res.data.results) {
               
            resData = res.data.results;
            dataModify? resData= dataModify(resData): resData;
            searchSort? resData = searchSort(resData, searchSortOrder): resData;
            setData(resData);
           
           }
           setLoading(false)
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort(); 
  }, deps? [...deps]: []);

  return { data, error, isLoading };
};
export default useData;