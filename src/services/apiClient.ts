import axios from "axios";
export default axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMjQ1NWRmMjk0MDU5M2U0NTJjNWMxOTFjYjNhYzQyZiIsInN1YiI6IjY2MzRmYzcxYzYxNmFjMDEyODE5ZWQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JuRq_nXJR39gKDZmtSnuFb801ahhNxSpnRGJYsYQkI8'
  },

})