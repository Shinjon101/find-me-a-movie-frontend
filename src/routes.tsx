import { createBrowserRouter } from "react-router-dom";
import Layout from "./Pages/Layout";
import HomePage from "./Pages/HomePage";
import MovieDetailPage from "./Pages/MovieDetailPage";
import ErrorPage from "./Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "game/:id",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

export default router;
