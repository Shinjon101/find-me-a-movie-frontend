import { render, screen } from "@testing-library/react";
import SearchInput from "../../src/Components/SearchInput";
import { AllProviders } from "../AllProviders";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const setSearchTextMock = vi.fn();

vi.mock("../../src/services/movieQueryStore", () => {
  return {
    __esModule: true,
    default: vi.fn((selector) =>
      selector({
        setSearchText: setSearchTextMock,
      })
    ),
  };
});

describe("SearchInput", () => {
  beforeEach(() => {
    setSearchTextMock.mockClear();
  });

  const renderWithRouter = (initialPath = "/") => {
    const routes = [
      {
        path: "/",
        element: <SearchInput />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [initialPath],
    });

    render(<RouterProvider router={router} />);
    return {
      router,
      input: screen.getByPlaceholderText(/search movie/i),
      user: userEvent.setup(),
    };
  };

  const renderComponent = () => {
    render(<SearchInput />, { wrapper: AllProviders });

    return {
      input: screen.getByPlaceholderText(/search movie/i),
    };
  };

  it("should render input wiht placeholder", () => {
    const { input } = renderComponent();

    expect(input).toBeInTheDocument();
  });

  it("should pass correct input value on submit", async () => {
    const { input } = renderComponent();
    const user = userEvent.setup();

    await user.type(input, "oppenheimer");
    await user.keyboard("[Enter]");

    expect(setSearchTextMock).toHaveBeenCalledWith("oppenheimer");
  });

  it("should update URL when submitted with a value", async () => {
    const { router, input, user } = renderWithRouter();

    await user.type(input, "batman");
    await user.keyboard("[Enter]");

    expect(router.state.location.search).toBe("?search=batman");
  });

  it("should remove search param if submitted empty", async () => {
    const { router, input, user } = renderWithRouter("/?search=something");

    await user.clear(input);
    await user.keyboard("[Enter]");

    expect(setSearchTextMock).toHaveBeenCalledWith("");
    expect(router.state.location.search).toBe("");
  });

  it("should prefill input from URL search param", () => {
    renderWithRouter("/?search=batman");
    const input = screen.getByPlaceholderText(/search movies/i);
    expect(input).toHaveValue("batman");
  });
});
