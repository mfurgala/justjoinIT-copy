import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ArrowDropDown, AttachMoney } from "@mui/icons-material";
import { Button, Popover, Slider } from "@mui/material";
import type { filtersInterface } from "@utils/const";
import { useState } from "react";
import styles from "./home.module.scss";

const filterStyles = makeStyles(
  createStyles({
    root: {
      color: "rgb(171, 71, 188)",
      marginTop: 10,
    },
    popoverSize: {
      height: 270,
    },
  }),
);

const useStyles = makeStyles(
  createStyles({
    root: {
      maxWidth: 170,
      marginRight: 10,
      borderRadius: 20,
      height: 40,
      letterSpacing: 0.5,
      fontSize: 12.6,
      color: "#777777",
      textTransform: "none",
      background: "white",
      padding: "0 12px",
      borderColor: "rgb(228, 232, 240)",
      "&:hover": {
        borderColor: "rgb(186, 104, 200)",
        backgroundColor: "white",
      },
    },
    icon: {
      marginRight: 3,
      fontSize: 17,
    },
  }),
);

type SalaryFilterProps = {
  valuetext: (value: number) => string;
  filters: filtersInterface;
  handleSliderChange: (
    event: React.ChangeEvent<{}>,
    newValue: number[] | number,
  ) => void;
  salaryFilter: number[];
  handleSliderChangeCommitted: (
    event: React.ChangeEvent<{}>,
    newValue: number[] | number,
  ) => void;
};
export const SalaryFilter: React.FC<SalaryFilterProps> = ({
  valuetext,
  filters,
  handleSliderChange,
  salaryFilter,
  handleSliderChangeCommitted,
}) => {
  const sliderClass = filterStyles();
  const buttonClass = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let salaryCases = "";
  if (salaryFilter[0] !== 0 && salaryFilter[1] !== 50) {
    salaryCases =
      String(salaryFilter[0]) + "k - " + String(salaryFilter[1]) + "k";
  } else if (salaryFilter[0] === 0 && salaryFilter[1] !== 50) {
    salaryCases = "<" + String(salaryFilter[1]) + "k";
  } else if (
    salaryFilter[0] !== 0 &&
    salaryFilter[0] !== 50 &&
    salaryFilter[1] === 50
  ) {
    salaryCases = ">" + String(salaryFilter[0]) + "k";
  } else if (salaryFilter[0] === 50 && salaryFilter[1] === 50) {
    salaryCases = String(salaryFilter[0]) + "k+";
  }
  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        className={
          Number(filters.salarymin) !== 0 || Number(filters.salarymax) !== 50
            ? `${styles.activeButton} ${buttonClass.root}`
            : buttonClass.root
        }
        variant="outlined">
        <AttachMoney className={buttonClass.icon} /> Salary {salaryCases}{" "}
        <ArrowDropDown />
      </Button>
      <Popover
        className={sliderClass.popoverSize}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <div className={styles.salaryContainer}>
          <h4 className={styles.salaryHeader}>In thousands (PLN)</h4>
          <div className={styles.sliderWidth}>
            <Slider
              className={sliderClass.root}
              max={50}
              value={salaryFilter}
              valueLabelDisplay="auto"
              aria-labelledby="salary-slider"
              getAriaValueText={valuetext}
              onChange={handleSliderChange}
              onChangeCommitted={handleSliderChangeCommitted}
            />
          </div>
        </div>
      </Popover>
    </>
  );
};
