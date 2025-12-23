// import ButtonBase from "@material-ui/core/ButtonBase";
import styles from "../Home/home.module.scss";

export type IconsProps = {
  name: string;
  to: string;
  img: string;
  onChange: (event: any) => void;
  color: string;
  background: string;
};
export const Icons: React.FC<IconsProps> = ({
  name,
  to,
  img,
  onChange,
  color,
  background,
}) => {
  return (
    <div className={styles.iconContainerAdd}>
      <button
        disableRipple
        onClick={() => onChange([{ name: to, img, background, color }])}>
        <img className={styles.langImg} src={img} alt="Logo" />{" "}
      </button>
      <div className={styles.test}>{name}</div>
    </div>
  );
};
