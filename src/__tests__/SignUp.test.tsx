import "@testing-library/jest-dom/extend-expect";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest, server } from "@utils/server";
import { SignUp, type SignUpProps } from "@views/Auth/SignUp";
import { renderWithRouter } from "../App/utils/tests";

function renderSignUp(props: Partial<SignUpProps> = {}) {
  const defaultProps: SignUpProps = {
    user: {},
    setUser: () => {},
    history: {} as any,
    location: {} as any,
    match: {} as any,
  };
  return renderWithRouter(<SignUp {...defaultProps} {...props} />, {
    route: "/devs/signup",
  });
}
test("Test if it gets redirected after successful creation of an account", async () => {
  const { history } = renderSignUp();
  userEvent.type(
    screen.getByRole("textbox", { name: /email/i }),
    "unique@gmail.com",
  );
  userEvent.type(screen.getByLabelText("Password"), "1234");
  userEvent.click(screen.getByRole("button", { name: "Register" }));
  await waitFor(() => expect(history.location.pathname).toEqual("/devs"));
});

test("Snapshot", async () => {
  const { container } = renderSignUp();
  expect(container).toMatchSnapshot();
});
