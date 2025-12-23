import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { renderWithRouter } from "../App/utils/tests";
import AddOffer from "../App/views/PostJob/AddOffer";

const formValues = {
  techStack: [],
  userID: "23232323",
  agreements: `Informujemy, że administratorem danych jest ______________ z siedzibą w ___________, ul. _______________ (dalej jako "administrator"). Masz prawo do żądania dostępu do swoich danych osobowych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do wniesienia sprzeciwu wobec przetwarzania, a także prawo do przenoszenia danych oraz wniesienia skargi do organu nadzorczego. Dane osobowe przetwarzane będą w celu realizacji procesu rekrutacji. Podanie danych w zakresie wynikającym z ustawy z dnia 26 czerwca 1974 r. Kodeks pracy jest obowiązkowe. W pozostałym zakresie podanie danych jest dobrowolne. Odmowa podania danych obowiązkowych może skutkować brakiem możliwości przeprowadzenia procesu rekrutacji. Administrator przetwarza dane obowiązkowe na podstawie ciążącego na nim obowiązku prawnego, zaś w zakresie danych dodatkowych podstawą przetwarzania jest zgoda. Dane osobowe będą przetwarzane do czasu zakończenia postępowania rekrutacyjnego i przez okres możliwości dochodzenia ewentualnych roszczeń, a w przypadku wyrażenia zgody na udział w przyszłych postępowaniach rekrutacyjnych - do czasu wycofania tej zgody. Zgoda na przetwarzanie danych osobowych może zostać wycofana w dowolnym momencie. Odbiorcą danych jest serwis Just Join IT oraz inne podmioty, którym powierzyliśmy przetwarzanie danych w związku z rekrutacją.`,
};
jest.mock("react-trix", () => ({ TrixEditor: () => <div>Fajny trix</div> }));
jest.mock("opencage-api-client", () => {
  return { geocode: () => Promise.reject() };
});
test("Test AddOffer render errors", () => {
  const { container } = renderWithRouter(
    <AddOffer
      formValues={formValues}
      handleNext={() => {}}
      setFormValues={() => {}}
    />,
  );
  expect(container).toMatchSnapshot("Render");
  fireEvent.click(screen.getByText("Next Step"));
  expect(screen.getAllByText("Field is required").length).toEqual(9);
  expect(container).toMatchSnapshot("After submit with errors");
});
