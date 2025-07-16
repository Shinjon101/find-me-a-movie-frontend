import { render, screen } from "@testing-library/react";
import RatingScore from "../../src/Components/RatingScore";
import { AllProviders } from "../AllProviders";

describe("RatingScore", () => {
  const renderComponent = (score: number) => {
    render(<RatingScore score={score} />, { wrapper: AllProviders });
  };

  it("should render the correct score", () => {
    renderComponent(1.99);

    expect(screen.getByTestId("rating-score")).toHaveTextContent("2");
  });
});
