import type * as Leaflet from "leaflet";
import L from "leaflet";
import { Map as MapLeaflet, Marker, Pane, TileLayer } from "react-leaflet";
import { useHistory, useRouteMatch } from "react-router-dom";
import slugify from "slugify";
import type { mobileViewModeInterface, offer } from "@/types";
import styles from "./map.module.scss";
import { OfferPopup } from "./OfferPopup";

interface MatchParams {
  offerTitle: string;
}

interface MapDetailProps {
  offersList: offer[];
  setMobileViewMode?: React.Dispatch<
    React.SetStateAction<mobileViewModeInterface>
  >;
  mobileViewMode?: mobileViewModeInterface;
}
export const MapDetail: React.FC<MapDetailProps> = ({
  offersList,
  setMobileViewMode,
  mobileViewMode,
}) => {
  const history = useHistory();
  const match = useRouteMatch<MatchParams>();
  let bounceIcon: Leaflet.Icon;
  let offerBounce: offer | null = null;
  let offers: offer[] = [];
  if (offersList) {
    offers = [...offersList];
    offerBounce = offers.filter(
      (e) =>
        match.params.offerTitle ===
        slugify(`${e.company}-${e.title}`, {
          lower: true,
        }),
    )[0];
    if (offerBounce.technology?.[0])
      bounceIcon = new L.Icon({
        iconUrl: offerBounce.technology[0].img,
        iconRetinaUrl: offerBounce.technology[0].img,
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [40, 40],
      });
  }
  return (
    <>
      {offerBounce?.coordinates?.[0] ? (
        <MapLeaflet center={offerBounce.coordinates[0]} zoom={12}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Pane className={styles.bounce}>
            <Marker
              position={offerBounce.coordinates[0]}
              icon={bounceIcon}
              onMouseOver={(e: Leaflet.LeafletMouseEvent) => {
                e.target.openPopup();
              }}
              onMouseOut={(e: Leaflet.LeafletMouseEvent) => {
                e.target.closePopup();
              }}>
              <OfferPopup offer={offerBounce} />
            </Marker>
          </Pane>
          {offers?.map((offer, index) => {
            const pointerIcon = new L.Icon({
              iconUrl: offer.technology[0].img,
              iconRetinaUrl: offer.technology[0].img,
              iconAnchor: [5, 55],
              popupAnchor: [10, -44],
              iconSize: [40, 40],
            });
            return (
              <div key={index}>
                {slugify(
                  `${offerBounce && offerBounce.company}-${
                    offerBounce && offerBounce.title
                  }`,
                ) === slugify(`${offer.company}-${offer.title}`) ? (
                  ""
                ) : (
                  <>
                    (
                    <Marker
                      key={index}
                      position={offer.coordinates[0]}
                      icon={pointerIcon}
                      onMouseOver={(e: Leaflet.LeafletMouseEvent) => {
                        e.target.openPopup();
                      }}
                      onMouseOut={(e: Leaflet.LeafletMouseEvent) => {
                        e.target.closePopup();
                      }}
                      onClick={() => {
                        history.push(
                          `/offers/${slugify(
                            `${offer.company}-${offer.title}`,
                            {
                              lower: true,
                            },
                          )}`,
                        );
                        if (setMobileViewMode && mobileViewMode) {
                          setMobileViewMode({
                            ...mobileViewMode,
                            view: "list",
                          });
                        }
                      }}>
                      <OfferPopup offer={offer} />
                    </Marker>
                    )
                  </>
                )}
              </div>
            );
          })}
        </MapLeaflet>
      ) : (
        ""
      )}
    </>
  );
};
