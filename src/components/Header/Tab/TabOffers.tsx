// import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
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

type TabOffersProps = {
  text: string;
  to: string;
  img: React.ReactNode;
};
const TabOffers: React.FC<TabOffersProps> = ({ text, to, img }) => {
  const location = useLocation();
  const buttonClass = useStyles();
  let isActive = false;
  if (
    location.pathname.startsWith("/offers") ||
    location.pathname.startsWith("/warszawa") ||
    location.pathname.startsWith("/szczecin") ||
    location.pathname.startsWith("/gdansk") ||
    location.pathname.startsWith("/sopot") ||
    location.pathname.startsWith("/krakow") ||
    location.pathname.startsWith("/poznan") ||
    location.pathname.startsWith("/gdynia") ||
    location.pathname.startsWith("/wroclaw") ||
    location.pathname.startsWith("/sopot") ||
    location.pathname.startsWith("/all") ||
    location.pathname === "/"
  ) {
    isActive = true;
  } else {
    isActive = false;
  }
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

export default TabOffers;
