// import Button from "@material-ui/core/Button";

// import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import type { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import { Dialog, Divider, Slide, Slider, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import type { filtersInterface } from "@/types";
import { ExperienceButtonMobile } from "./ExperienceButtonMobile";
import styles from "./home.module.scss";

const experience = ["All", "Junior", "Mid", "Senior"];
const sliderStyles = makeStyles(
  createStyles({
    root: {
      background: "white",
      color: "rgb(171, 71, 188)",
    },
    salaryText: {
      display: "flex",
      justifyContent: "center",
    },
    expText: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 10,
    },
    close: {
      position: "fixed",
      left: 20,
      marginDown: 10,
    },
  }),
);
const useStyles = makeStyles(
  createStyles({
    root: {
      borderRadius: 20,
      letterSpacing: 0.5,
      fontSize: 12.6,
      color: "#777777",
      height: 35,
      textTransform: "none",
      background: "white",
      padding: "0 12px",
      borderColor: "rgb(228, 232, 240)",
      "&:hover": {
        borderColor: "rgb(186, 104, 200)",
        backgroundColor: "white",
      },
    },
    divider: {
      marginTop: 45,
      marginBottom: 20,
    },
  }),
);
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  const { children, ...rest } = props;
  return (
    <Slide direction="down" ref={ref} {...rest}>
      {children}
    </Slide>
  );
});

type ExpSalaryFilterMobileProps = {
  valuetext: (value: number) => string;
  updateFilter: (key: string, value: string) => void;
  filters: filtersInterface;
  handleSliderChange: (
    event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => void;
  salaryFilter: number[];
  handleSliderChangeCommitted: (
    event: React.ChangeEvent<{}>,
    value: number[] | number,
  ) => void;
};
export const ExpSalaryFilterMobile: React.FC<ExpSalaryFilterMobileProps> = ({
  valuetext,
  updateFilter,
  filters,
  handleSliderChange,
  salaryFilter,
  handleSliderChangeCommitted,
}) => {
  const classes = useStyles();
  const sliderClass = sliderStyles();
  const text = "Filters";
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
  return (
    <>
      <button
        className={
          Number(filters.salarymin) !== 0 ||
          Number(filters.salarymax) !== 50 ||
          filters.experience !== "all"
            ? `${styles.activeButton} ${classes.root}`
            : classes.root
        }
        variant="outlined"
        onClick={handleClickOpen}>
        {text}
      </button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <div onClick={handleClose} style={{ marginBottom: 50 }}>
          <button
            className={sliderClass.close}
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close">
            <CloseIcon />
          </button>
          <h2 className={styles.textTitleMobile}>{text}</h2>
          <Divider className={classes.divider} />
        </div>

        <div>
          <Typography
            className={sliderClass.expText}
            id="range-slider"
            gutterBottom>
            Choose experience level
          </Typography>
          <div className={styles.expContainerMobile}>
            {experience.map((lvl, index) => (
              <ExperienceButtonMobile
                key={index}
                isActive={isActive(lvl.toLowerCase(), filters.experience)}
                filters={filters}
                updateFilters={updateFilter}
                name={lvl}
              />
            ))}
          </div>
          <div className={styles.salaryContainerMobile}>
            <Typography
              className={sliderClass.salaryText}
              id="range-slider"
              gutterBottom>
              Choose salary in thousands (PLN)
            </Typography>
            <Slider
              className={sliderClass.root}
              max={50}
              value={salaryFilter}
              onChange={handleSliderChange}
              onChangeCommitted={handleSliderChangeCommitted}
              valueLabelDisplay="auto"
              aria-labelledby="salary-slider"
              getAriaValueText={valuetext}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
