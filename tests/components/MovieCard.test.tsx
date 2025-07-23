import { render, screen } from "@testing-library/react";
import MovieCard from "../../src/Components/MovieCard";
import { AllProviders } from "../AllProviders";
import { generateMockMovie } from "../mocks/movie";
import {
  imgExtractionUrl,
  placeHolderImageUrl,
} from "../../src/services/ImageExtractionUrl";
import { Movie } from "../../src/hooks/useMovies";
import { parseScore } from "../../src/services/parseScore";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Movie Card", () => {
  const renderComponent = (movie?: Movie) => {
    const mockMovie = movie ?? generateMockMovie();

    render(<MovieCard movie={mockMovie} />, { wrapper: AllProviders });
    return { mockMovie };
  };

  it("should render movie title, release year, rating", () => {
    const { mockMovie } = renderComponent();
    const year = mockMovie.release_date.split("-")[0];

    expect(
      screen.getByRole("heading", { name: mockMovie.title })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/year/i)).toHaveTextContent(year);
    expect(screen.getByTestId("rating-score")).toHaveTextContent(
      parseScore(mockMovie.vote_average).toString()
    );
  });

  it("should render correct genre tags", () => {
    const { mockMovie } = renderComponent();
    const genres = mockMovie.genres;

    genres.forEach((g) => expect(screen.getByText(g.name)).toBeInTheDocument());
  });

  it("should render poster when poster_path available", () => {
    const { mockMovie } = renderComponent();
    const image = screen.getByAltText(mockMovie.title);

    expect(image).toHaveAttribute(
      "src",
      imgExtractionUrl + mockMovie.poster_path
    );
  });

  it("should render placeholder poster when poster_path is empty", () => {
    const mockMovie = generateMockMovie({ poster_path: "" });
    renderComponent(mockMovie);

    const image = screen.getByAltText(mockMovie.title);
    expect(image).toHaveAttribute("src", placeHolderImageUrl);
  });

  it("should navigate to movie detail page when clicked", async () => {
    const user = userEvent.setup();
    const mockMovie = generateMockMovie();

    render(
      <AllProviders>
        <Routes>
          <Route path="/" element={<MovieCard movie={mockMovie} />} />
          <Route
            path={`/movies/${mockMovie.id}`}
            element={<div>Movie Detail Page for {mockMovie.title}</div>}
          />
        </Routes>
      </AllProviders>
    );

    const movieCard = screen.getByRole("link", {
      name: new RegExp(`${mockMovie.title}`),
    });
    await user.click(movieCard);

    expect(
      screen.getByText(`Movie Detail Page for ${mockMovie.title}`)
    ).toBeInTheDocument();
  });
});
