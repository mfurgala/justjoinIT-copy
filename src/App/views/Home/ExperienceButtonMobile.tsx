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
      borderColor: "rgb(186, 104, 200)",
      height: 35,
      background: "white",
      padding: "10px 12px",
      marginRight: 12,
      marginBottom: 12,
      color: "#777777",
      border: "1px solid",
    },
  }),
);

type ExperienceButtonMobileProps = {
  name: string;
  isActive: boolean;
  filters: filtersInterface;
  updateFilters: (key: string, value: string) => void;
};
export const ExperienceButtonMobile: React.FC<ExperienceButtonMobileProps> = ({
  name,
  isActive,
  filters,
  updateFilters,
}) => {
  const classes = useStyles();
  return (
    <Link
      to={`/${filters.city}/${filters.language}/${name.toLowerCase()}/${filters.salarymin}/${filters.salarymax}`}
      className={styles.linkRoute}>
      <button
        onClick={() => {
          updateFilters("experience", name.toLowerCase());
        }}
        className={isActive ? styles.activeButton : ""}
        classes={{ root: classes.root }}>
        {name}
      </button>
    </Link>
  );
};
