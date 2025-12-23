import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, server } from "../App/utils/server.js";
import { renderWithRouter } from "../App/utils/tests";
import SignIn, { type SignInProps } from "../App/views/Auth/SignIn";

function renderSignIn(props: Partial<SignInProps> = {}) {
  const defaultProps: SignInProps = {
    user: {},
    setUser: () => {},
    history: {} as any,
    location: {} as any,
    match: {} as any,
  };
  return renderWithRouter(<SignIn {...defaultProps} {...props} />, {
    route: "/devs",
  });
}
test("Test if it gets redirected after successful login", async () => {
  const { history } = renderSignIn();
  userEvent.type(
    screen.getByRole("textbox", { name: /email/i }),
    "kowalski@gmail.com",
  );
  userEvent.type(screen.getByLabelText("Password"), "1234");
  userEvent.click(screen.getByRole("button", { name: "Sign in" }));
  await waitFor(() => expect(history.location.pathname).toEqual("/dashboard"));
});

test("Shows server error if the request fails", async () => {
  const testErrorMessage = "Email or password is wrong";
  server.use(
    rest.post("/devs", async (req, res, ctx) => {
      return res(ctx.status(400), ctx.text(testErrorMessage));
    }),
  );
  renderSignIn();
  userEvent.click(screen.getByRole("button", { name: "Sign in" }));
  expect(await screen.findByText(testErrorMessage)).toBeInTheDocument();
});

test("Snapshot", async () => {
  const { container } = renderSignIn();
  expect(container).toMatchSnapshot();
});
