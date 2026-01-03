import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tab, { type TabProps } from "../Header/Tab/Tab";

function renderTab(props: Partial<TabProps> = {}) {
  const defaultProps: TabProps = {
    text: "test text",
    img: "img",
    isActive: true,
    to: "test",
  };
  return render(
    <BrowserRouter>
      <Tab {...defaultProps} {...props} />
    </BrowserRouter>,
  );
}
describe("<Tab />", () => {
  it("snapshot", () => {
    const { container } = renderTab();
    expect(container).toMatchSnapshot();
  });
});
