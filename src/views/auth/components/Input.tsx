import { createStyles, InputAdornment, makeStyles } from "@material-ui/core/";
import TextField from "@material-ui/core/TextField";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import clsx from "clsx";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import styles from "../auth.module.scss";

type InputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: boolean;
  type: "email" | "password";
};

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

export function Input({ value, setValue, type, error }: InputProps) {
  const passRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  function handleClickShowPassword() {
    setShowPassword(!showPassword);
    const input = passRef.current;
    if (input) {
      const len = input.value.length;
      requestAnimationFrame(() => input.setSelectionRange(len, len));
    }
  }

  switch (type) {
    case "email":
      return (
        <div className={styles.rowIcon}>
          <PersonOutlinedIcon />
          <TextField
            id={"email-input"}
            name={"email"}
            className={clsx(classes.margin, classes.textField)}
            value={value}
            error={error}
            onChange={(e) => setValue(e.target.value)}
            type={type}
            variant="outlined"
            label={"Email"}
          />
        </div>
      );
    case "password":
      return (
        <div className={styles.rowIcon}>
          <HttpsOutlinedIcon />
          <TextField
            inputRef={passRef}
            id={"password-input"}
            name={"password"}
            className={clsx(classes.margin, classes.textField)}
            value={value}
            error={error}
            onChange={(e) => setValue(e.target.value)}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            label={"Password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClickShowPassword}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      fontSize: "1rem",
                    }}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </button>
                </InputAdornment>
              ),
            }}
          />
        </div>
      );
  }
}
