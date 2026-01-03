import { screen, waitFor } from "@testing-library/react";
import React from "react";
import Dashboard from "../views/dashboard/Dashboard";
import { offersList } from "./mockData";
import { renderWithRouter } from "./tests";

test("Shows offers posted by a company", async () => {
  const { container } = renderWithRouter(
    <Dashboard
      user={{ userID: "5e8cc6d853004b069507091d" }}
      offers={offersList}
    />,
  );
  await waitFor(() => expect(screen.getAllByRole("heading").length).toEqual(3));
  expect(container).toMatchSnapshot();
});

test("Shows a prompt to add an offer if there are no offers posted", async () => {
  renderWithRouter(
    <Dashboard
      user={{ userID: "483ds90f49f890d8f5489" }}
      offers={offersList}
    />,
    { route: "/dashboard" },
  );
  await waitFor(() =>
    expect(
      screen.getByText(/to see it on your dashboard/i),
    ).toBeInTheDocument(),
  );
});

test("Checks the number of offers with 2 cvs", async () => {
  renderWithRouter(
    <Dashboard
      user={{ userID: "5e8cc6d853004b069507091d" }}
      offers={offersList}
    />,
  );
  await waitFor(() => expect(screen.getAllByText("2 CV")).toHaveLength(1));
});

test("Shows the offers which dont have CVs", async () => {
  renderWithRouter(
    <Dashboard
      user={{ userID: "5e8cc6d853004b069507091d" }}
      offers={offersList}
    />,
  );
  await waitFor(() => expect(screen.getAllByText("0 CV")).toHaveLength(2));
});
