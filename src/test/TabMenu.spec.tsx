import React from "react";
import TabMenu from "../Header/Tab/TabMenu";
import { renderWithRouter } from "./tests";

test("Snapshot", () => {
  const { container } = renderWithRouter(
    <TabMenu location={{ pathname: "", search: "", state: "", hash: "" }} />,
  );
  expect(container).toMatchSnapshot();
});
