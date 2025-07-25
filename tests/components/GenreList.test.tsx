import { render, screen } from "@testing-library/react";
import { AllProviders } from "../AllProviders";
import genres from "../../src/data/genres";
import { vi, Mock } from "vitest";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Genre } from "../../src/services/apiClient";

vi.mock("../../src/hooks/useGeneres", () => ({
  default: vi.fn(),
}));

const setGenre = vi.fn();

let mockMovieQuery: { genre: Genre | null } = { genre: null };

vi.mock("../../src/services/movieQueryStore", () => ({
  __esModule: true,
  default: vi.fn((selector) =>
    selector({
      setGenre,
      movieQuery: mockMovieQuery,
    })
  ),
}));

import useGeneres from "../../src/hooks/useGeneres";
import GenreList from "../../src/Components/GenreList";

describe("GenreList", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockMovieQuery = { genre: null };
  });

  const renderWithRouter = (initialPath = "/") => {
    const routes = [
      {
        path: "/",
        element: <GenreList />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [initialPath],
    });

    render(<RouterProvider router={router} />);
    return {
      router,
      user: userEvent.setup(),
    };
  };

  const renderComponent = () => {
    render(<GenreList />, { wrapper: AllProviders });
  };

  it("should render genre list", () => {
    (useGeneres as Mock).mockReturnValue({
      data: { genres },
      isLoading: false,
      error: null,
    });

    renderComponent();

    genres.forEach((g) => expect(screen.getByText(g.name)).toBeInTheDocument());
  });

  it("should render spinner when fetching genres", () => {
    (useGeneres as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderComponent();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should error message when error fetching genres", () => {
    (useGeneres as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("network error"),
    });

    renderComponent();

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("should pre-select genre from URL genre param", () => {
    (useGeneres as Mock).mockReturnValue({
      data: { genres },
      isLoading: false,
      error: null,
    });

    renderWithRouter("/?genre=16");

    const genre = genres.find((g) => g.id === 16);
    expect(screen.getByText(genre?.name!)).toBeInTheDocument();
  });

  it("should call setGenre when a genre button is clicked", async () => {
    (useGeneres as Mock).mockReturnValue({
      data: { genres },
      isLoading: false,
      error: null,
    });

    const { user } = renderWithRouter();
    const button = screen.getByRole("button", {
      name: `Filter by ${genres[1].name} genre`,
    });

    await user.click(button);

    expect(setGenre).toHaveBeenCalledWith(genres[1]);
  });

  it("should remove genre from URL if 'All' genre is clicked", async () => {
    (useGeneres as Mock).mockReturnValue({
      data: { genres },
      isLoading: false,
      error: null,
    });

    const { user, router } = renderWithRouter("/?genre=28");
    const allGenre = genres.find((g) => g.id === 1);

    if (allGenre) {
      const button = screen.getByRole("button", {
        name: `Filter by ${allGenre.name} genre`,
      });

      await user.click(button);

      expect(router.state.location.search).not.toContain("genre");
    }
  });

  it("should highlight selected genre button", () => {
    (useGeneres as Mock).mockReturnValue({
      data: { genres },
      isLoading: false,
      error: null,
    });

    mockMovieQuery = { genre: { id: 28, name: "Action" } };

    renderComponent();

    const button = screen.getByRole("button", {
      name: `Filter by Action genre`,
    });
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
