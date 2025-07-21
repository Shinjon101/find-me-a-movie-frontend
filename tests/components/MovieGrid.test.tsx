import { render, screen } from "@testing-library/react";
import MovieGrid from "../../src/Components/MovieGrid";
import { AllProviders, queryClient } from "../AllProviders";
import { server } from "../mocks/server";
import { mockMovies } from "../mocks/handlers";
import { simulateDelay, simulateError } from "../utils";

describe("MovieGrid", () => {
  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  const renderComponent = () => {
    render(<MovieGrid />, { wrapper: AllProviders });
  };

  it("should render 5 movies", async () => {
    const { handler } = mockMovies(5);
    server.use(handler);
    renderComponent();

    const movies = await screen.findAllByRole("link");

    expect(movies.length).toBe(5);
  });

  it("should render error if data fetching fails", async () => {
    simulateError("/discover/movie");
    renderComponent();

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/error/i);
  });

  it("should render loading skeletons when fetching movies", () => {
    simulateDelay("/discover/movie");
    renderComponent();

    const skeletons = screen.getAllByRole("progressbar");

    expect(skeletons.length).toBeGreaterThan(0);
  });
});
