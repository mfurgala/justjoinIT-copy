import { Facebook, Github, Google, Linked } from "@/assets/images";
import styles from "../auth.module.scss";

type SocialButtonProps = {
  name: string;
  icon: string;
  type: "signIn" | "signUp";
};

function SocialButton({ name, icon, type }: SocialButtonProps) {
  const buttonText =
    type === "signIn" ? `Sign in with ${name}` : `Sign up with ${name}`;
  return (
    <button className={styles.socialButton} type="button">
      <img alt="logo" className={styles.socialImg} src={icon} />
      <span>{buttonText}</span>
    </button>
  );
}

export function SocialButtons({ type }: { type: "signIn" | "signUp" }) {
  return (
    <>
      <div className={styles.socials}>
        <SocialButton name="Google" icon={Google} type={type} />
        <SocialButton name="Github" icon={Github} type={type} />
        <SocialButton name="LinkedIn" icon={Linked} type={type} />
        <SocialButton name="Facebook" icon={Facebook} type={type} />
      </div>
      <div className={styles.row}>
        <hr className={styles.double} />
        <span className={styles.spanWeight}>Or</span>
        <hr className={styles.double} />
      </div>
    </>
  );
}
