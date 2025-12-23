import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../App/components/Header/Header";
import { renderWithRouter } from "../App/utils/tests";

test("Snapshot", () => {
  const { container } = renderWithRouter(
    <Header user={{ auth: true }} setUser={() => {}} />,
    { route: "/dashboard" },
  );
  expect(container).toMatchSnapshot();
});
