import { render } from "@testing-library/react";
import DrawerButton, {
  type DrawerButtonProps,
} from "../App/components/Header/Drawer/DrawerButton";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function renderDrawerButton(props: Partial<DrawerButtonProps> = {}) {
  const defaultProps: DrawerButtonProps = {
    to: "to",
    img: "img",
    text: "text",
    setOpen() {
      return;
    },
    logout() {},
  };

  return render(
    <BrowserRouter>
      <DrawerButton {...defaultProps} {...props} />{" "}
    </BrowserRouter>,
  );
}

describe("<DrawerButton />", () => {
  test("drawer button snapshot", () => {
    const { container } = renderDrawerButton();
    expect(container).toMatchSnapshot();
  });
});
