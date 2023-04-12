import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// Smoke Test
it("renders without crashing", () => {
  render(<Carousel />);
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

test("left arrow is not on page when on first image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // confirm that first photo is being shown
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  // expect left arrow to be missing
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

test("right arrow is not on page when on last image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel to last image
  const numberOfImages = Carousel.defaultProps.cardData.length;
  const rightArrow = queryByTestId("right-arrow");
  for (let i = 1; i < numberOfImages; i++) {
    fireEvent.click(rightArrow);
  }

  // confirm that last photo is being shown
  const lastPhotoAltText = Carousel.defaultProps.cardData[numberOfImages - 1].caption;
  expect(queryByAltText(lastPhotoAltText)).toBeInTheDocument();

  // expect right arrow to be missing
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
});