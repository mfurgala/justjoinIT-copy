import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./tab.module.scss";

const useStyles = makeStyles(
  createStyles({
    root: {
      color: "#B0BAC9",
      fontSize: 14,
      textDecoration: "none",
      fontWeight: 400,
      lineHeight: 1.5,
      width: "100%",
      alineHeight: 56,
      padding: "6px 6px 5px 0px",
    },
    listItem: {
      width: 310,
    },
    listIcon: {
      marginLeft: 5,
    },
  }),
);
type TabDrawProps = {
  to: string;
  text: string;
  img: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TabDraw: React.FC<TabDrawProps> = ({ to, text, img, setOpen }) => {
  const classes = useStyles();
  return (
    <Link onClick={() => setOpen(false)} to={to} className={styles.linkStyle}>
      <ListItem className={classes.listItem}>
        <ListItemIcon className={classes.listIcon}>{img}</ListItemIcon>
        <ListItemText className={classes.root} primary={text} />
      </ListItem>
    </Link>
  );
};
