import { render, screen } from "@testing-library/react";
import InsideDrawer, {
  type InsideDrawerProps,
} from "../App/components/Header/Drawer/InsideDrawer";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function renderInsideDrawer(props: Partial<InsideDrawerProps> = {}) {
  const defaultProps: InsideDrawerProps = {
    user: {
      auth: true,
    },
    setOpen() {
      return;
    },
  };

  return render(
    <BrowserRouter>
      <InsideDrawer {...defaultProps} {...props} />
    </BrowserRouter>,
  );
}

describe("<InsideDrawer />", () => {
  test("check if dashboard button is available", () => {
    renderInsideDrawer();
    const buttonDrawer = screen.getByRole("link", { name: /dashboard/i });
    expect(buttonDrawer).toBeInTheDocument();
  });
  test("check if sign in button is available", () => {
    renderInsideDrawer({ user: { auth: false } });
    const buttonDrawer = screen.getByRole("link", { name: /sign in/i });
    expect(buttonDrawer).toBeInTheDocument();
  });
});
