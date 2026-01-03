// import Button from "@material-ui/core/Button";

// import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import type { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog, Divider, Slide } from "@mui/material";
import { forwardRef, useState } from "react";
import type { cityInterface, filtersInterface } from "@/types";
import { FilterButtonMobile } from "./FilterButtonMobile";
import styles from "./home.module.scss";

const useStyles = makeStyles(
  createStyles({
    root: {
      borderRadius: 20,
      textTransform: "none",
      letterSpacing: 0.5,
      fontSize: 12.6,
      color: "#777777",
      height: 35,
      background: "white",
      padding: "0 12px",
      borderColor: "rgb(228, 232, 240)",
      "&:hover": {
        borderColor: "rgb(186, 104, 200)",
        backgroundColor: "white",
      },
    },
    close: {
      position: "fixed",
      left: 20,
      marginDown: 10,
    },
    divider: {
      marginTop: 45,
    },
  }),
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type CityFilterMobile = {
  filters: filtersInterface;
  updateFilters: (key: string, value: string) => void;
  cities: cityInterface[];
};
export const CityFilterMobile: React.FC<CityFilterMobile> = ({
  filters,
  cities,
  updateFilters,
}) => {
  const classes = useStyles();

  const text = "Location";
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const isActive = (link: string, filter: string): boolean => {
    return filter === link;
  };
  const polishCity = cities.filter((city) => city.to === filters.city);
  return (
    <>
      <button
        className={
          polishCity[0] &&
          isActive(polishCity[0].to, filters.city) &&
          polishCity[0].to !== "all"
            ? `${styles.activeButton} ${classes.root}`
            : classes.root
        }
        variant="outlined"
        onClick={handleClickOpen}>
        {polishCity[0].name !== "All" ? polishCity[0].name : "Location"}
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <div onClick={handleClose} style={{ marginBottom: 50 }}>
          <button
            className={classes.close}
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close">
            <CloseIcon />
          </button>
          <h2 className={styles.textTitleMobile}>{text}</h2>
        </div>
        <Divider className={classes.divider} />
        <div className={styles.buttonListMobile}>
          {cities?.map(({ name, to }) => (
            <FilterButtonMobile
              filters={filters}
              name={name}
              to={to}
              key={to}
              setOpen={setOpen}
              updateFilters={updateFilters}
              isActive={isActive(to, filters.city)}></FilterButtonMobile>
          ))}
        </div>
      </Dialog>
    </>
  );
};
