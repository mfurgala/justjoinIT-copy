import { Facebook, Github, Google, Linked, SignUpImage } from "@assets/images";
// import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import type { TransitionProps } from "@material-ui/core/transitions";
import Alert from "@material-ui/lab/Alert";
import { API_HOST } from "@utils/api";
import type { userInterface } from "@utils/const";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./auth.module.scss";
import Inputs from "./Inputs";
import SocialButton from "./SocialButton";

export interface SignInProps {
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

export const SignIn: React.FC<SignInProps> = ({ setUser, user }) => {
  function SlideTransition(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
  }
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const handleClose = () => {
    setUser({ ...user, createPopup: false });
  };
  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_HOST}/devs`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        response
          .text()
          .then()
          .then((text) => {
            setUser({
              ...user,
              name: values.email,
              auth: true,
              userID: text,
              loggedPopup: true,
            });
            history.push("/dashboard");
          });
      } else {
        response
          .text()
          .then()
          .then((text) => {
            setFormError(text);
          });
      }
    } catch (err) {}
  };
  const classAlert = useStyles();
  return (
    <div className={styles.row}>
      <Snackbar
        open={user.createPopup}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Account successfully created!
        </Alert>
      </Snackbar>
      <div className={styles.column}>
        <h1>Get started for free</h1>
        <div className={styles.center}>
          <div className={styles.socials}>
            <SocialButton icon={Google}>Sign in with Google </SocialButton>
            <SocialButton icon={Github}>Sign in with Github </SocialButton>
          </div>
          <div className={styles.socials}>
            <SocialButton icon={Linked}>Sign in with LinkedIn </SocialButton>
            <SocialButton icon={Facebook}>Sign in with Facebook </SocialButton>
          </div>
        </div>
        <div className={styles.row}>
          <hr className={styles.double} />
          <span className={styles.spanWeight}>Or</span>
          <hr className={styles.double} />
        </div>
        <form onSubmit={login}>
          <Inputs error={formError} values={values} setValues={setValues} />
          {formError ? (
            <Alert
              className={classAlert.root}
              variant="filled"
              severity="error">
              {formError}
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
              Sign in
            </button>
            <span>
              New Account?{" "}
              <Link to="/devs/signup" className={styles.register}>
                Register
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
