import Hidden from "@material-ui/core/Hidden";
import { createStyles, withStyles } from "@material-ui/core/styles";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { ButtonBase, Drawer, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Jjit } from "../../assets/images";
import type { user } from "@/types";
import { InsideDrawer } from "./Drawer/InsideDrawer";
import styles from "./header.module.scss";
import { Menu } from "./Menu";

const StyledButton = withStyles(
  createStyles({
    root: {
      borderRadius: 30,
      border: 0,
      color: "white",
      height: 42,
      padding: "0px 22px",
      backgroundColor: "#ff4081",
      fontSize: 14,
      fontWeight: 600,
      margin: "0px 2px 0px 5px",
      fontFamily: "Open Sans,sans-serif",
    },
  }),
)(ButtonBase);

interface HeaderProps {
  setUser: React.Dispatch<React.SetStateAction<user>>;
  user: user;
}
export const Header: React.FC<HeaderProps> = ({ setUser, user }) => {
  const logout: () => void = () => {
    setUser({ ...user, auth: false, offPopup: true });
    try {
      fetch(`${import.meta.env.VITE_ENTRYPOINT}/devs/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
    } catch (err) {}
  };
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <Link to="/">
          <img className={styles.margin} src={Jjit} alt="just join it logo" />
        </Link>
        <Hidden smDown>
          <Menu location={location} user={user} direction="row" />
        </Hidden>
      </div>
      <Hidden smDown>
        <div className={styles.flexRow}>
          <Link className={styles.hideButton} to={"/add"}>
            <StyledButton>Post a job</StyledButton>
          </Link>
          {!user.auth ? (
            <Link className={styles.linkStyle} to={"/devs"}>
              {" "}
              <StyledButton style={{ backgroundColor: "#ab47bc" }}>
                Sign in
              </StyledButton>
            </Link>
          ) : (
            <Link className={styles.linkStyle} to={"/"}>
              {" "}
              <StyledButton
                onClick={() => logout()}
                style={{
                  backgroundColor: "#ab47bc",
                }}>
                Logout{" "}
                {user?.name ? user.name.slice(0, user.name.indexOf("@")) : ""}
              </StyledButton>
            </Link>
          )}
        </div>
      </Hidden>
      <IconButton onClick={() => setOpen(!open)} aria-label="drawer">
        <MenuRoundedIcon />
      </IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Hidden smDown>
          <InsideDrawer setOpen={setOpen} user={user} />
        </Hidden>
        <Hidden mdUp>
          <div className={styles.view}>
            <img className={styles.img} src={Jjit} alt="just join it logo" />
            <hr className={styles.double} />
            <Menu
              setOpen={setOpen}
              logout={logout}
              location={location}
              user={user}
              direction="column"
            />
          </div>
        </Hidden>
      </Drawer>
    </div>
  );
};
