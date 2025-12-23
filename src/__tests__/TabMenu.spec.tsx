import React from "react";
import TabMenu from "../App/components/Header/Tab/TabMenu";
import { renderWithRouter } from "../App/utils/tests";

test("Snapshot", () => {
  const { container } = renderWithRouter(
    <TabMenu location={{ pathname: "", search: "", state: "", hash: "" }} />,
  );
  expect(container).toMatchSnapshot();
});
