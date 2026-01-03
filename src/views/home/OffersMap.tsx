import type * as Leaflet from "leaflet";
import L from "leaflet";
import { Map as MapLeaflet, Marker, TileLayer } from "react-leaflet";
import { Link, useHistory } from "react-router-dom";
import slugify from "slugify";
import type { mobileViewModeInterface, offer } from "@/types";
import { cities } from "./constData";
import styles from "./map.module.scss";
import { OfferPopup } from "./OfferPopup";

interface OffersMapProps {
  offers: offer[];
  setMobileViewMode?: React.Dispatch<
    React.SetStateAction<mobileViewModeInterface>
  >;
  mobileViewMode?: mobileViewModeInterface;
}

export const OffersMap: React.FC<OffersMapProps> = ({
  offers,
  setMobileViewMode,
  mobileViewMode,
}) => {
  const history = useHistory();
  let poorParam = window.location.pathname;
  if (poorParam === "/") {
    poorParam = "all";
  } else {
    poorParam = poorParam.substr(1);
    poorParam = poorParam.slice(0, poorParam.indexOf("/"));
  }
  const coordinatesFocus = cities.filter(
    (coordinate) => coordinate.to === poorParam,
  );
  return (
    <MapLeaflet
      classNames={styles.leafletContainer}
      center={
        coordinatesFocus[0]
          ? coordinatesFocus[0].coordinates
          : { lat: 52.2154531, lng: 21.0207946 }
      }
      zoom={coordinatesFocus[0] && coordinatesFocus[0].to === "all" ? 6 : 12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {offers
        ? offers.map((offer, index) => {
            const pointerIcon = new L.Icon({
              iconUrl: offer.technology[0].img,
              iconRetinaUrl: offer.technology[0].img,
              iconAnchor: [5, 55],
              popupAnchor: [10, -44],
              iconSize: [40, 40],
            });

            return (
              <Link
                key={index}
                to={`/offers/${slugify(`${offer.company}-${offer.title}`, {
                  lower: true,
                })}`}
                className={styles.linkStyle}>
                <div>
                  <Marker
                    onMouseOver={(e: Leaflet.LeafletMouseEvent) => {
                      e.target.openPopup();
                    }}
                    onMouseOut={(e: Leaflet.LeafletMouseEvent) => {
                      e.target.closePopup();
                    }}
                    key={index}
                    position={offer.coordinates[0]}
                    icon={pointerIcon}
                    onClick={() => {
                      history.push(
                        `/offers/${slugify(`${offer.company}-${offer.title}`, {
                          lower: true,
                        })}`,
                      );
                      if (setMobileViewMode && mobileViewMode) {
                        setMobileViewMode({ ...mobileViewMode, view: "list" });
                      }
                    }}>
                    <OfferPopup offer={offer} />
                  </Marker>
                </div>
              </Link>
            );
          })
        : ""}
    </MapLeaflet>
  );
};
