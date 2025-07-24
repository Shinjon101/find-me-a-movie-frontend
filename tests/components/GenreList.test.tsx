import { render, screen } from "@testing-library/react";
import { AllProviders } from "../AllProviders";
import genres from "../../src/data/genres";
import { vi, Mock, should } from "vitest";

vi.mock("../../src/hooks/useGeneres", () => ({
  default: vi.fn(),
}));

import useGeneres from "../../src/hooks/useGeneres";
import GenreList from "../../src/Components/GenreList";

describe("GenreList", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

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
});
