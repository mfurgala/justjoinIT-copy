import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useShowNotification } from "@/store/notificationStore";
import styles from "./auth.module.scss";
import { AuthLayout } from "./components/AuthLayout";
import { FormAlert } from "./components/FormAlert";
import { Input } from "./components/Input";

export function ResetPassword() {
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();
  const showNotification = useShowNotification();

  async function resetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_ENTRYPOINT}/auth/reset`,
      {
        method: "POST",
        body: email,
        headers: { "Content-Type": "text/plain" },
      },
    );

    if (response.ok) {
      showNotification("Password reset link sent to your email.");
      history.push("/");
    } else setIsError(true);
  }

  return (
    <AuthLayout title="Password Assistance">
      <form onSubmit={resetPassword}>
        <Input type="email" value={email} setValue={setEmail} error={isError} />
        {isError && <FormAlert message="Email address not found" />}
        <button className={styles.btn} type="submit">
          Reset Password
        </button>
      </form>
      <span>
        Back to
        <Link to="/devs" className={styles.register}>
          Login
        </Link>
      </span>
    </AuthLayout>
  );
}
