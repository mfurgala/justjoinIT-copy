import { useEffect, useState } from "react";
import type { offer, user } from "@/types";
import { OffersList } from "../home/OffersList";
import styles from "./dashboard.module.scss";

type DashboardProps = {
  user: user;
  offers: offer[];
};
export function Dashboard({ user, offers }: DashboardProps) {
  const [applications, setApplications] = useState([]);
  const offersList = offers.filter((offer) => offer.userID === user.userID);
  useEffect(() => {
    const fetchApplications = async () => {
      const applications = await fetch(
        `${import.meta.env.VITE_ENTRYPOINT}/cv/get`,
      );
      const data = await applications.json();
      setApplications(data);
    };
    fetchApplications();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <OffersList applications={applications} offersList={offersList} />
    </div>
  );
}
