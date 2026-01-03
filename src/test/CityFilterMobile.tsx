import { expect, test } from "vitest";
import { CityFilterMobile } from "../views/home/CityFilterMobile";
import { cities } from "../views/home/constData";
import { renderWithRouter } from "./tests";

test("Snapshot", async () => {
  const { container } = renderWithRouter(
    <CityFilterMobile
      cities={cities}
      filters={{
        city: "all",
        language: "all",
        experience: "all",
        salarymax: 50,
        salarymin: 1,
      }}
      updateFilters={() => {}}
    />,
  );
  expect(container).toMatchSnapshot();
});
