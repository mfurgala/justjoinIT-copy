import { faHandshake, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import { useLocation } from "react-router-dom";
import Tab from "./Tab";
import TabOffers from "./TabOffers";

const tabs = [
  {
    to: "/ski-cams",
    text: "Brand Stories",
    img: <BusinessOutlinedIcon />,
  },
  {
    to: "/justgeekit",
    text: "Just Geek IT",
    img: <FontAwesomeIcon icon={faNewspaper} />,
  },
  {
    to: "/devs",
    text: "Matchmaking",
    img: <FontAwesomeIcon icon={faHandshake} />,
  },
];

const TabMenu = () => {
  const location = useLocation();
  const isActive = (destination: string) => location.pathname === destination;
  return (
    <>
      <TabOffers
        location={location}
        to="/"
        text="Job Offers"
        img={<WorkOutlineOutlinedIcon />}
      />
      {tabs.map(({ to, text, img }) => (
        <Tab img={img} key={to} to={to} text={text} isActive={isActive(to)} />
      ))}
    </>
  );
};

export default TabMenu;
