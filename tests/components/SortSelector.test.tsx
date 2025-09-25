import { render, screen } from "@testing-library/react";
import { SortSelector } from "../../src/Components/SortSelector";
import userEvent from "@testing-library/user-event";

import { AllProviders } from "../AllProviders";

describe("SortSelector", () => {
  it(' should show default sort label "Popularity" when no sort param is present', () => {
    render(
      <AllProviders>
        <SortSelector />
      </AllProviders>
    );

    const selector = screen.getByRole("button", { name: /sort movies/i });

    expect(selector).toHaveTextContent(/popularity/i);
  });

  it("should pick up Initial label from existing sort URL param", () => {
    render(
      <AllProviders route={`/?sort=vote_average`}>
        <SortSelector />
      </AllProviders>
    );

    const selector = screen.getByRole("button", { name: /sort movies/i });

    expect(selector).toHaveTextContent(/rating/i);
  });

  it.each([
    { value: "popularity", label: "Popularity" },
    { value: "vote_average", label: "Rating" },
    { value: "release_date", label: "Release date" },
  ])("should render $label with $value as value", async ({ value, label }) => {
    render(
      <AllProviders route={`/?sort=${value}`}>
        <SortSelector />
      </AllProviders>
    );

    const user = userEvent.setup();

    const selector = screen.getByRole("button", { name: /sort movies/i });
    await user.click(selector);
    const option = screen.getByRole("menuitem", { name: label });

    expect(option).toHaveAttribute("value", value);
    expect(selector).toHaveTextContent(new RegExp(`order by: ${label}`, "i"));
  });
});
