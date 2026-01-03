import Hidden from "@material-ui/core/Hidden";
import { Auth } from "@/assets/images";
import styles from "../auth.module.scss";

export function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <h1>{title}</h1>
        {children}
      </div>
      <Hidden smDown>
        <div className={styles.imgContainer}>
          <img alt="auth" className={styles.img} src={Auth} />
        </div>
      </Hidden>
    </div>
  );
}
