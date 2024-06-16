import React from "react";
import { it, expect, describe } from "vitest";

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import Greeting from "../src/Greeting";

describe("Greeting", () => {
  it("should render Hello with the name when name is provided", () => {
    render(<Greeting name="Asep Surasep" />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Asep Surasep/i);
  });

  it("should render login button when name is not provided", () => {
    render(<Greeting />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
