// import ButtonBase from "@material-ui/core/ButtonBase";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import type { filtersInterface } from "@utils/const";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";

const useStyles = makeStyles(
  createStyles({
    root: {
      borderRadius: 20,
      letterSpacing: 0.5,
      fontSize: 12.6,
      color: "#777777",
      height: 35,
      border: "1px solid",
      background: "white",
      padding: "0 12px",
      marginRight: 12,
      borderColor: "rgb(228, 232, 240)",
      "&:hover": {
        borderColor: "rgb(186, 104, 200)",
        backgroundColor: "white",
      },
    },
  }),
);

type FilterButtonProps = {
  name: string;
  to: string;
  isActive: boolean;
  filters: filtersInterface;
  updateFilters: (key: string, value: string) => void;
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  name,
  to,
  isActive,
  filters,
  updateFilters,
}) => {
  const classes = useStyles();
  return (
    <Link
      to={`/${to}/${filters.language}/${filters.experience}/${filters.salarymin}/${filters.salarymax}`}
      className={styles.linkRoute}>
      <button
        onClick={() => updateFilters("city", to)}
        className={
          isActive ? `${styles.activeButton} ${classes.root}` : classes.root
        }>
        {name}
      </button>
    </Link>
  );
};
