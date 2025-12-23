import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import { offersList } from "../App/utils/mockData";
import { renderWithRouter } from "../App/utils/tests";
import OffersList, { type OffersListProps } from "../App/views/Home/OffersList";

function renderOffersList(props: Partial<OffersListProps> = {}) {
  const defaultProps: OffersListProps = {
    offersList: [],
    history: {} as any,
    location: {} as any,
    match: {} as any,
  };
  return renderWithRouter(
    <OffersList {...defaultProps} {...props} offersList={offersList} />,
  );
}

test("Test if it renders properly all the offers", () => {
  renderOffersList();
  expect(screen.getAllByRole("heading").length).toEqual(3);
});

test("No offers rendered text", () => {
  renderWithRouter(<OffersList offersList={[]} />);
  expect(screen.getByText(/no offers/i)).toBeInTheDocument();
});
test("Snapshot", () => {
  const { container } = renderOffersList();
  expect(container).toMatchSnapshot();
});
