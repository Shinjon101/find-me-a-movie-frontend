import { render, screen } from "@testing-library/react";
import ReleaseDate from "../../src/Components/ReleaseDate";

describe("ReleaseDate", () => {
  it("should extract and render only the year", () => {
    render(<ReleaseDate rDate="2006-11-29" />);

    const badge = screen.getByLabelText(/release/i);

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("2006");
  });
});
