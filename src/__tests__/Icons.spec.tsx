import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Icons, { type IconsProps } from "../App/views/PostJob/Icons";

function renderIcons(props: Partial<IconsProps> = {}) {
  const defaultProps: IconsProps = {
    onChange: () => {},
    name: "test",
    img: "img",
    color: "color",
    background: "background",
    to: "test",
  };
  return render(<Icons {...defaultProps} {...props} />);
}
describe("<Icons />", () => {
  it("snapshot", () => {
    const { container } = renderIcons();
    expect(container).toMatchSnapshot();
  });
});
