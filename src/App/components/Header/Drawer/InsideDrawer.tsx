import { Jjit } from "@assets/images";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import RssFeedOutlinedIcon from "@material-ui/icons/RssFeedOutlined";
import { mdiFacebook } from "@mdi/js";
import Icon from "@mdi/react";
import type { userInterface } from "@utils/const";
import { DrawerButton } from "./DrawerButton";
import styles from "./drawer.module.scss";

export type InsideDrawerProps = {
  user: userInterface;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InsideDrawer: React.FC<InsideDrawerProps> = ({
  user,
  setOpen,
}) => {
  const buttons = [
    {
      to: "/facebook",
      text: "Facebook",
      img: <Icon path={mdiFacebook} size={1} color={"rgb(117, 117, 117)"} />,
    },
    {
      to: "/brands/story/just-join-it",
      text: "About Us",
      img: <GroupRoundedIcon />,
    },
    {
      to: "/event",
      text: "Event",
      img: <MicRoundedIcon />,
    },
    {
      to: "/rss",
      text: "RSS",
      img: <RssFeedOutlinedIcon />,
    },
    {
      to: "/terms-and-policies",
      text: "Terms",
      img: <PictureAsPdfOutlinedIcon />,
    },
    {
      to: "/terms-and-policies",
      text: "Policy",
      img: <PictureAsPdfOutlinedIcon />,
    },
  ];

  return (
    <div className={styles.view}>
      <img className={styles.img} src={Jjit} alt="just join it logo" />
      <hr className={styles.double} />
      <List>
        {user.auth ? (
          <DrawerButton
            setOpen={setOpen}
            to={"/dashboard"}
            text={"Dashboard"}
            img={<FontAwesomeIcon icon={faCode} />}
          />
        ) : (
          <DrawerButton
            setOpen={setOpen}
            to={"/devs"}
            text={"Sign in"}
            img={<FontAwesomeIcon icon={faCode} />}
          />
        )}
        {buttons.map(({ to, text, img }) => (
          <DrawerButton
            setOpen={setOpen}
            img={img}
            key={text}
            to={to}
            text={text}
          />
        ))}
      </List>
    </div>
  );
};
