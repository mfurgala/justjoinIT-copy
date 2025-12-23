// import { IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import { type MouseEvent, useState } from "react";
import styles from "./auth.module.scss";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(2),
    },

    textField: {
      width: 340,
    },
  }),
);

type Login = {
  email: string;
  password: string;
};

type InputsProps = {
  setValues: React.Dispatch<React.SetStateAction<Login>>;
  values: Login;
  error: string;
};

const Inputs: React.FC<InputsProps> = ({ values, setValues, error }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className={styles.inputWidth}>
      <div className={styles.rowIcon}>
        <PersonOutlinedIcon />
        <TextField
          className={clsx(classes.margin, classes.textField)}
          error={Boolean(error)}
          id="outlined-required"
          label="Email"
          variant="outlined"
          value={values.email}
          onChange={handleChange("email")}
        />
      </div>
      <div className={styles.rowIcon}>
        <HttpsOutlinedIcon />
        <TextField
          variant="outlined"
          className={clsx(classes.margin, classes.textField)}
          id="outlined-adornment-password"
          label="Password"
          error={Boolean(error)}
          type={showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <button
                  aria-label="toggle visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </button>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};
export default Inputs;
