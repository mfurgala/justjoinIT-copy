// import ButtonBase from "@material-ui/core/ButtonBase";

import { Link } from "react-router-dom";
import type { filtersInterface } from "@/types";
import styles from "./home.module.scss";

type LangButtonMobileProps = {
  to: string;
  name: string;
  isActive: boolean;
  img: string;
  filters: filtersInterface;
  updateFilters: (key: string, value: string) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const LangButtonMobile: React.FC<LangButtonMobileProps> = ({
  to,
  name,
  isActive,
  img,
  filters,
  updateFilters,
  setOpen,
}) => {
  return (
    <div className={styles.langButtonContainer}>
      <Link
        to={`/${filters.city}/${to}/${filters.experience}/${filters.salarymin}/${filters.salarymax}`}
        className={styles.linkRoute}>
        <button
          disableRipple
          onClick={() => {
            updateFilters("language", to);
            setOpen(false);
          }}
          className={isActive ? styles.langBtnActive : styles.langBtn}>
          <img className={styles.langImg} src={img} alt="Logo" />{" "}
        </button>
        <div className={styles.test}>{name}</div>
      </Link>
    </div>
  );
};
