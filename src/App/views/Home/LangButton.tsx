// import ButtonBase from "@material-ui/core/ButtonBase";
import type { filtersInterface } from "@utils/const";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";

type LangButtonProps = {
  to: string;
  name: string;
  isActive: boolean;
  img: string;
  filters: filtersInterface;
  updateFilters: (key: string, value: string) => void;
};
export const LangButton: React.FC<LangButtonProps> = ({
  to,
  name,
  isActive,
  img,
  filters,
  updateFilters,
}) => {
  return (
    <div className={styles.langButtonContainer}>
      <Link
        to={`/${filters.city}/${to}/${filters.experience}/${filters.salarymin}/${filters.salarymax}`}
        className={styles.linkRoute}>
        <button
          disableRipple
          onClick={() => updateFilters("language", to)}
          className={isActive ? styles.langBtnActive : styles.langBtn}>
          <img className={styles.langImg} src={img} alt="Logo" />{" "}
        </button>
        <div className={styles.test}>{name}</div>
      </Link>
    </div>
  );
};
