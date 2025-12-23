// import {
//   faCode,
//   faHandshake,
//   faNewspaper,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import type { userInterface } from "@utils/const";
import { DrawerButton } from "../Drawer/DrawerButton";
import { TabDraw } from "./TabDraw";

type TabMenuDrawProps = {
  user: userInterface;
  logout: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const tabs = [
  {
    to: "/",
    text: "Job Offers",
    img: <WorkOutlineOutlinedIcon />,
  },
  {
    to: "/ski-cams",
    text: "Brand Stories",
    img: <BusinessOutlinedIcon />,
  },
  {
    to: "/justgeekit",
    text: "Just Geek IT",
  },
  {
    to: "/devs",
    text: "Matchmaking",
  },
];

const TabMenuDraw: React.FC<TabMenuDrawProps> = ({ user, logout, setOpen }) => {
  return (
    <>
      {user.auth ? (
        <DrawerButton setOpen={setOpen} to={"/dashboard"} text={"Dashboard"} />
      ) : (
        <DrawerButton setOpen={setOpen} to={"/devs"} text={"Sign in"} />
      )}
      <List>
        {" "}
        {tabs.map(({ to, text, img }) => (
          <TabDraw setOpen={setOpen} img={img} key={to} to={to} text={text} />
        ))}
        {user.auth ? (
          <DrawerButton
            setOpen={setOpen}
            logout={logout}
            to={"/"}
            text={`Logout ${user?.name ? user.name.slice(0, user.name.indexOf("@")) : ""}`}
            img={<ExitToAppIcon />}
          />
        ) : (
          ""
        )}
      </List>
    </>
  );
};

export default TabMenuDraw;
