import { useEffect } from "react";
// @ts-expect-error
import Loading from "react-loading-animation";
import { Link, useLocation } from "react-router-dom";
import type { applicationInterface, offer } from "@/types";
import { OfferListItem } from "./OfferListItem";
import styles from "./offers.module.scss";

export interface OffersListProps {
  offersList: offer[];
  applications?: applicationInterface[];
  fetching?: boolean;
  setHideFilter?: React.Dispatch<React.SetStateAction<boolean>>;
  hideFilter?: boolean;
}

export const OffersList: React.FC<OffersListProps> = ({
  offersList,
  applications,
  fetching,
  setHideFilter,
}) => {
  const location = useLocation();
  useEffect(() => {
    if (setHideFilter !== undefined) {
      setHideFilter(false);
    }
  }, [setHideFilter]);

  const offerListRender = () => {
    if (location.pathname === "/dashboard") {
      if (offersList.length > 0) {
        return offersList.map((offer, index) => (
          <OfferListItem
            key={index}
            offer={offer}
            applications={applications}
          />
        ));
      } else {
        return (
          <div className={styles.dashboardText}>
            <span className={styles.noOffersDash}>
              Please <Link to={"/add"}>add</Link> an offer to see it on your
              dashboard
            </span>
          </div>
        );
      }
    } else {
      if (offersList.length > 0) {
        return offersList.map((offer, index) => (
          <OfferListItem
            key={index}
            offer={offer}
            applications={applications}
          />
        ));
      } else {
        return (
          <div className={styles.dashboardText}>
            <span className={styles.noOffersDash}>
              No offers with chosen criterias :(
            </span>
          </div>
        );
      }
    }
  };

  return (
    <div className={styles.offersList}>
      {fetching ? (
        <div className={styles.loadingContainer}>
          <Loading className={styles.loadingDimensions} />
        </div>
      ) : (
        ""
      )}
      {offerListRender()}
    </div>
  );
};
