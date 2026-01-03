import clsx from "clsx";
// @ts-expect-error
import { Popup } from "react-leaflet";
import NumberFormat from "react-number-format";
import type { offer } from "@/types";
import styles from "./map.module.scss";

type OfferPopupProps = {
  offer: offer;
};

export const OfferPopup: React.FC<OfferPopupProps> = ({ offer }) => {
  return (
    <Popup>
      <div className={styles.flexRow}>
        <div className={clsx(styles.flexColumn, styles.popupContainer)}>
          <img alt="logo" className={styles.iconSize} src={offer.logo} />
        </div>
        <div className={styles.flexColumn}>
          <div className={styles.flexRow}>{offer.title}</div>
          <div className={styles.flexRow}>
            <span className={styles.spanStyle}>
              <NumberFormat
                value={offer.minSalary}
                thousandSeparator={" "}
                displayType={"text"}
              />{" "}
              -{" "}
              <NumberFormat
                value={offer.maxSalary}
                thousandSeparator={" "}
                displayType={"text"}
              />{" "}
              {offer.currency}
            </span>
          </div>
          <div className={styles.flexRow}>{offer.company}</div>
        </div>
      </div>
    </Popup>
  );
};
