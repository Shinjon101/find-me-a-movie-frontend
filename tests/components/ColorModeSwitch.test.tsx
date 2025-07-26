import { render, screen } from "@testing-library/react";
import ColorModeSwitch from "../../src/Components/ColorModeSwitch";
import { AllProviders } from "../AllProviders";
import userEvent from "@testing-library/user-event";

describe("ColorModeSwitch", () => {
  const renderComponent = () => {
    render(<ColorModeSwitch />, { wrapper: AllProviders });
    return {
      user: userEvent.setup(),
      toggle: screen.getByLabelText(/switch to/i),
    };
  };

  it("should render the color mode toggle switch", () => {
    renderComponent();

    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
  });

  it("should load with dark mode enabled and switch checked", () => {
    const { toggle } = renderComponent();

    expect(screen.getByLabelText(/switch to light/i)).toBeInTheDocument();
    expect(toggle).toBeChecked();
  });

  it("should show correct aria-labels for each mode", async () => {
    const { user, toggle } = renderComponent();

    expect(toggle).toHaveAttribute("aria-label", "Switch to light mode");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-label", "Switch to dark mode");
  });

  it("should toggle color mode when switch is clicked", async () => {
    const { user, toggle } = renderComponent();

    const initialLabel = toggle.getAttribute("aria-label");
    await user.click(toggle);
    const updatedLabel = toggle.getAttribute("aria-label");

    expect(updatedLabel).not.toEqual(initialLabel);
  });

  it("should toggle color mode when text is clicked", async () => {
    const { user, toggle } = renderComponent();

    const textToggle = screen.getByText(/dark mode/i);

    const initialLabel = toggle.getAttribute("aria-label");
    await user.click(textToggle);
    const updatedLabel = toggle.getAttribute("aria-label");

    expect(updatedLabel).not.toEqual(initialLabel);
  });
});
