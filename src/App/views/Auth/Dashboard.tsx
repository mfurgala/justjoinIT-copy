import { API_HOST } from "@utils/api";
import type { offerInterface, userInterface } from "@utils/const";
import { OffersList } from "@views/Home/OffersList";
import { useEffect, useState } from "react";
import styles from "./auth.module.scss";

type DashboardProps = {
  user: userInterface;
  offers: offerInterface[];
};
export const Dashboard: React.FC<DashboardProps> = ({ user, offers }) => {
  const [applications, setApplications] = useState([]);
  const offersList = offers.filter((offer) => offer.userID === user.userID);
  useEffect(() => {
    fetch(`${API_HOST}/cv/get`, { method: "GET" }).then((response) => {
      response.json().then((json) => {
        setApplications(json);
      });
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <OffersList applications={applications} offersList={offersList} />
    </div>
  );
};
