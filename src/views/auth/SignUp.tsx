import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useShowNotification } from "@/store/notificationStore";
import styles from "./auth.module.scss";
import { AuthLayout } from "./components/AuthLayout";
import { FormAlert } from "./components/FormAlert";
import { Input } from "./components/Input";
import { SocialButtons } from "./components/SocialButtons";

export function SignUp() {
  const history = useHistory();
  const showNotification = useShowNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_ENTRYPOINT}/auth/register`,
        {
          method: "POST",
          body: email,
          headers: { "Content-Type": "text/plain" },
          credentials: "include",
        },
      );
      if (response.ok) {
        showNotification("Account successfully created!");
        history.push("/devs");
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
      console.error(err);
    }
  };
  return (
    <AuthLayout title="Get started for free">
      <SocialButtons type="signUp" />
      <form onSubmit={register}>
        <Input type="email" value={email} setValue={setEmail} error={isError} />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          error={isError}
        />

        {isError && <FormAlert message="This email is already registered" />}
        <button type="submit" className={styles.btn} color="secondary">
          Register
        </button>
      </form>
      <span>
        Already have an account?
        <Link to="/devs" className={styles.register}>
          Sign In
        </Link>
      </span>
    </AuthLayout>
  );
}
