import Hidden from "@material-ui/core/Hidden";
// import IconButton from "@material-ui/core/IconButton";
// import Switch from "@material-ui/core/Switch";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { createStyles, makeStyles } from "@material-ui/styles";
import type { filtersInterface, offerInterface } from "@utils/const";
import { cities, language } from "@views/Home/constData";
import { LangButton } from "@views/Home/LangButton";
import { LangFilterMobile } from "@views/Home/LangFilterMobile";
import { Offers } from "@views/Home/Offers";
import { SalaryFilter } from "@views/Home/SalaryFilter";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AllButton } from "./AllButton";
import { CityFilterMobile } from "./CityFilterMobile";
import { ExpFilter } from "./ExpFilter";
import { ExpSalaryFilterMobile } from "./ExpSalaryFilterMobile";
import { FilterButton } from "./FilterButton";
import styles from "./home.module.scss";

const useStyles = makeStyles(
  createStyles({
    root: {
      padding: 0,
    },
  }),
);

function valuetext(value: number): string {
  return `${value}$`;
}

type FiltersProps = {
  filters: filtersInterface;
  updateFilters: (key: string, value: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<filtersInterface>>;
  offers: offerInterface[];
  fetching: boolean;
};
export const Filters: React.FC<FiltersProps> = ({
  filters,
  updateFilters,
  setFilters,
  offers,
  fetching,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  const handleSliderChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number[] | number,
  ) => {
    if (Array.isArray(newValue) && newValue.length > 0) {
      setFilters({
        ...filters,
        salarymin: newValue[0],
        salarymax: newValue[1],
      });
    }
  };

  const handleSliderChangeCommitted = (
    _event: React.ChangeEvent<{}>,
    newValue: number[] | number,
  ) => {
    if (Array.isArray(newValue) && newValue.length > 0) {
      const valueMin = String(newValue[0]);
      const valueMax = String(newValue[1]);
      history.push(
        `/${filters.city}/${filters.language}/${filters.experience}/${valueMin}/${valueMax}`,
      );
    } else {
      history.push(
        `/${filters.city}/${filters.language}/${filters.experience}/${newValue}`,
      );
    }
  };

  const salaryFilter = [filters.salarymin, filters.salarymax];

  const isActive = (link: string, filter: string): boolean => {
    return filter === link;
  };

  const currency: { [key: string]: number } = {
    GBP: 5.17,
    EUR: 4.56,
    USD: 4.21,
    CHF: 4.34,
    PLN: 1,
  };

  let offersList = [...offers];
  if (filters.language !== "all") {
    offersList = offersList.filter(
      (e) => e.technology[0].name === filters.language,
    );
  }
  if (filters.city.toLowerCase() !== "all") {
    const city = cities.find((element) => element.to === filters.city);
    if (city) {
      offersList = offersList.filter(
        (e) => e.city.toLowerCase() === city.name.toLowerCase(),
      );
    }
  }
  if (filters.experience !== "all") {
    offersList = offersList.filter(
      (e) => e.experience.toLowerCase() === filters.experience,
    );
  }
  if (salaryFilter[0] >= 0) {
    offersList = offersList.filter(
      (e) =>
        e.minSalary * currency[e.currency] >= salaryFilter[0] * 1000 ||
        e.maxSalary * currency[e.currency] >= salaryFilter[0] * 1000,
    );
  }
  if (salaryFilter[1] <= 100) {
    offersList = offersList.filter(
      (e) =>
        e.maxSalary * currency[e.currency] <= salaryFilter[1] * 1000 ||
        e.minSalary * currency[e.currency] <= salaryFilter[1] * 1000,
    );
  }
  const [hideFilter, setHideFilter] = useState(false);
  return (
    <div className={styles.whiteBg}>
      <Hidden smDown>
        <div className={styles.view}>
          <div className={styles.border}>
            <div className={styles.flex}>
              <div className={styles.width100}>
                {cities.map(({ name, to }) => (
                  <FilterButton
                    filters={filters}
                    name={name}
                    to={to}
                    key={to}
                    isActive={isActive(to, filters.city)}
                    updateFilters={updateFilters}></FilterButton>
                ))}
              </div>
              <div className={styles.darkPosition}>
                <button
                  className={classes.root}
                  onClick={() => setDarkMode(false)}>
                  <WbSunnyIcon />
                </button>
                {/* <Switch
                  checked={darkMode}
                  onChange={handleChange}
                  color="default"
                /> */}
                <button
                  className={classes.root}
                  onClick={() => setDarkMode(true)}>
                  <Brightness3Icon />
                </button>
              </div>
            </div>
            <div className={styles.flex}>
              <div className={styles.languagePosition}>
                <AllButton
                  filters={filters}
                  name="All"
                  to="all"
                  key="all"
                  updateFilters={updateFilters}
                  isActive={isActive("all", filters.language)}
                />
                {language.map(({ name, to, img }) => (
                  <LangButton
                    filters={filters}
                    name={name}
                    img={img}
                    to={to}
                    key={to}
                    updateFilters={updateFilters}
                    isActive={
                      isActive(to, filters.language) ||
                      isActive("all", filters.language)
                    }></LangButton>
                ))}
              </div>

              <div className={styles.salaryExpContainer}>
                <SalaryFilter
                  valuetext={valuetext}
                  handleSliderChangeCommitted={handleSliderChangeCommitted}
                  salaryFilter={salaryFilter}
                  handleSliderChange={handleSliderChange}
                  filters={filters}
                />
                <ExpFilter updateFilters={updateFilters} filters={filters} />
              </div>
            </div>
          </div>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div style={{ display: hideFilter ? "none" : "flex", margin: "10px" }}>
          <div className={styles.marginRight15}>
            <CityFilterMobile
              filters={filters}
              cities={cities}
              updateFilters={updateFilters}
            />
          </div>
          <div className={styles.marginRight15}>
            <LangFilterMobile
              language={language}
              filters={filters}
              updateFilters={updateFilters}
            />
          </div>
          <div className={styles.marginRight15}>
            <ExpSalaryFilterMobile
              updateFilter={updateFilters}
              valuetext={valuetext}
              handleSliderChangeCommitted={handleSliderChangeCommitted}
              salaryFilter={salaryFilter}
              handleSliderChange={handleSliderChange}
              filters={filters}
            />
          </div>
        </div>
      </Hidden>

      <Offers
        hideFilter={hideFilter}
        setHideFilter={setHideFilter}
        fetching={fetching}
        filters={filters}
        offersList={offersList}
      />
    </div>
  );
};
