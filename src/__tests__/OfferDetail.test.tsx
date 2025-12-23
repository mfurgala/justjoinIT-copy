import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { offersList } from "../App/utils/mockData";
import { OfferDetail } from "../App/views/Home/OfferDetail";

test("Sending a CV", async () => {
  const match = {
    params: { offerTitle: "lion-python-developer" },
    isExact: true,
    path: "/offers/:offerTitle",
    url: "/offers/lion-python-developer",
  };
  render(<OfferDetail offersList={offersList} match={match} />);
  userEvent.type(
    screen.getByLabelText("First and last name *"),
    "Andrzej Tunaj",
  );
  userEvent.type(screen.getByLabelText("Email *"), "mail@gmail.com");
  userEvent.click(screen.getByRole("button", { name: /apply cv/i }));
  await expect(
    screen.findByText("Great! Your application was successfully sent to: Lion"),
  );
});

test("Snapshot", () => {
  const match = {
    params: { offerTitle: "lion-python-developer" },
    isExact: true,
    path: "/offers/:offerTitle",
    url: "/offers/lion-python-developer",
  };
  const { container } = render(
    <OfferDetail offersList={offersList} match={match} />,
  );
  expect(container).toMatchSnapshot();
});
