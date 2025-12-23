import { renderWithRouter } from "@utils/tests";
import { CityFilterMobile } from "@views/Home/CityFilterMobile";
import { cities } from "@views/Home/constData";
import { expect, test } from "vitest";

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
