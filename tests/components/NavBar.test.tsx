import { render, screen } from "@testing-library/react";
import NavBar from "../../src/Components/NavBar";
import { AllProviders } from "../AllProviders";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("NavBar", () => {
  it("should render the logo as a button", () => {
    render(<NavBar />, { wrapper: AllProviders });
    const logo = screen.getByRole("button", { name: /go to homepage/i });

    expect(logo).toBeInTheDocument();
  });

  it("navigates to '/' when logo is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/some-page"]}>
        <Routes>
          <Route path="*" element={<NavBar />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const logo = screen.getByRole("button", { name: /go to homepage/i });
    await user.click(logo);

    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
