import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByLabelText(/What do you want to ask/i);
  expect(linkElement).toBeInTheDocument();
});
