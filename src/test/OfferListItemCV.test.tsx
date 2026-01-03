import { screen, waitFor } from "@testing-library/react";
import React from "react";
import OfferListItemCV from "../views/home/OfferListItemCV";
import { CV } from "./mockData";
import { renderWithRouter } from "./tests";

test("Check CVs", async () => {
  const { container } = renderWithRouter(
    <OfferListItemCV
      title={"Python developer"}
      setOpen={() => {}}
      open={true}
      showCvs={CV}
    />,
  );
  await waitFor(() =>
    expect(screen.getAllByText(/show cv/i).length).toEqual(2),
  );
});
