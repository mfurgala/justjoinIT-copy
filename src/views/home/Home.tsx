import { useEffect, useState } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import type { matchInterface, offer } from "@/types";
import { Filters } from "./Filters";
import styles from "./home.module.scss";

interface HomeProps {
  offers: offer[];
  fetching: boolean;
}

export const Home: React.FC<HomeProps> = ({ offers, fetching }) => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch<matchInterface>();
  const [filters, setFilters] = useState({
    city: match.params.city || "all",
    language: match.params.language || "all",
    experience: match.params.experience || "all",
    salarymin: parseInt(match.params.salarymin, 10) || 0,
    salarymax: parseInt(match.params.salarymax, 10) || 50,
  });

  useEffect(() => {
    if (location.pathname === "/") {
      setFilters({
        city: "all",
        language: "all",
        experience: "all",
        salarymin: 0,
        salarymax: 50,
      });
    }
  }, [location.pathname]);

  const updateFilter = (key: string, value: string | number) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className={styles.filters}>
      <Filters
        history={history}
        offers={offers}
        fetching={fetching}
        updateFilters={updateFilter}
        setFilters={setFilters}
        filters={filters}
      />
    </div>
  );
};
