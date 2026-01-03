import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useShowNotification } from "@/store/notificationStore";
import type { user } from "@/types";
import styles from "./auth.module.scss";
import { AuthLayout } from "./components/AuthLayout";
import { FormAlert } from "./components/FormAlert";
import { Input } from "./components/Input";
import { SocialButtons } from "./components/SocialButtons";

export interface SignInProps {
  user: user;
  setUser: React.Dispatch<React.SetStateAction<user>>;
}
export function SignIn({ setUser, user }: SignInProps) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showNotification = useShowNotification();
  const [isError, setIsError] = useState(false);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_ENTRYPOINT}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const text = await response.text();
      if (response.ok) {
        setUser({
          ...user,
          name: email,
          auth: true,
          userID: text,
          loggedPopup: false,
        });
        showNotification("Successfully signed in!");
        history.push("/dashboard");
      } else setIsError(true);
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  };
  return (
    <AuthLayout title="Login to your account">
      <SocialButtons type="signIn" />
      <form onSubmit={login}>
        <Input error={isError} type="email" value={email} setValue={setEmail} />
        <Input
          error={isError}
          type="password"
          value={password}
          setValue={setPassword}
        />
        {isError && <FormAlert message="Incorrect email or password" />}
        <button type="submit" className={styles.btn} color="secondary">
          Sign in
        </button>
      </form>
      <span>
        New Account?
        <Link to="/devs/register" className={styles.register}>
          Register
        </Link>
      </span>
      <hr className={styles.one} />
      <span>
        <Link
          to="/devs/reset"
          className={styles.register}
          style={{ marginLeft: 0 }}>
          Forgot Password?
        </Link>
      </span>
    </AuthLayout>
  );
}
