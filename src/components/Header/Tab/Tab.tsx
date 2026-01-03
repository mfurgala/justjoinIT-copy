// import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import styles from "./tab.module.scss";

const useStyles = makeStyles(
  createStyles({
    root: {
      textTransform: "none",
      marginBottom: 4,
      width: 140,
    },
  }),
);
export type TabProps = {
  text: string;
  to: string;
  isActive: boolean;
  img: React.ReactNode;
};
const Tab: React.FC<TabProps> = ({ text, to, isActive, img }) => {
  const buttonClass = useStyles();
  return (
    <Link to={to} className={styles.linkStyle}>
      <button
        className={`${styles.tab} ${buttonClass.root} ${isActive ? styles.activeTab : ""}`}
        startIcon={img}>
        {text}
      </button>
    </Link>
  );
};

export default Tab;
