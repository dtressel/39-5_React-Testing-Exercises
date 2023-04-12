import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

// Smoke Test
it("renders without crashing", () => {
  render(<Card />);
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
})