import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@/components/design-system/core/Button";

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("shows loading spinner when isLoading is true", () => {
    render(<Button isLoading>Click Me</Button>);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(screen.queryByText("Click Me")).not.toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    const button = container.firstChild;
    expect(button).toHaveClass("bg-error");
  });
});
