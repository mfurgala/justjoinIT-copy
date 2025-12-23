import { Facebook, Github, Google, Linked, SignUpImage } from "@assets/images";
// import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { API_HOST } from "@utils/api";
import type { userInterface } from "@utils/const";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./auth.module.scss";
import Inputs from "./Inputs";
import SocialButton from "./SocialButton";

export interface SignUpProps {
  user: userInterface;
  setUser: React.Dispatch<React.SetStateAction<userInterface>>;
}

const useStyles = makeStyles(
  createStyles({
    root: {
      width: 396,
      marginBottom: 15,
    },
  }),
);

export const SignUp: React.FC<SignUpProps> = ({ user, setUser }) => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_HOST}/devs/signup`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        setUser({ ...user, createPopup: true });
        history.push("/devs");
      } else {
        response.text().then((text) => setFormError(text));
      }
    } catch (err) {}
  };
  const classAlert = useStyles();
  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <h1>Get started for free</h1>
        <div className={styles.center}>
          <div className={styles.socials}>
            <SocialButton icon={Google}>Register with Google </SocialButton>
            <SocialButton icon={Github}>Register with Github </SocialButton>
          </div>
          <div className={styles.socials}>
            <SocialButton icon={Linked}>Register with LinkedIn </SocialButton>
            <SocialButton icon={Facebook}>Register with Facebook </SocialButton>
          </div>
        </div>
        <div className={styles.row}>
          <hr className={styles.double} />
          <span className={styles.spanWeight}>Or</span>
          <hr className={styles.double} />
        </div>
        <form onSubmit={register}>
          <Inputs error={formError} values={values} setValues={setValues} />
          {formError ? (
            <Alert
              className={classAlert.root}
              variant="filled"
              severity="error">
              {formError}{" "}
            </Alert>
          ) : (
            ""
          )}
          <div className={styles.bottomSign}>
            <button
              type="submit"
              className={styles.btn}
              variant="contained"
              color="secondary">
              Register
            </button>
            <span>
              Already have an account?
              <Link to="/devs" className={styles.register}>
                {" "}
                Sign In
              </Link>
            </span>
            <hr className={styles.one} />
            <span>
              <a className={styles.register} href="www.google.com">
                Forgot Password?
              </a>
            </span>
          </div>
        </form>
      </div>
      <Hidden smDown>
        <div className={styles.imgContainer}>
          <img alt="sign up" className={styles.img} src={SignUpImage} />
        </div>
      </Hidden>
    </div>
  );
};
