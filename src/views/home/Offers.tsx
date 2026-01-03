// import { ButtonBase } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MapIcon from "@material-ui/icons/Map";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import type { filtersInterface, offer } from "@/types";
import { MapDetail } from "./MapDetail";
import { OfferDetail } from "./OfferDetail";
import { OffersList } from "./OffersList";
import { OffersMap } from "./OffersMap";
import styles from "./offers.module.scss";

const useStyles = makeStyles(
  createStyles({
    root: {
      zIndex: 500,
      boxShadow:
        "rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px",
      background: "rgb(255, 103, 156)",
      borderRadius: "50%",
      width: 56,
      height: 56,
    },
    whiteIcon: {
      color: "white",
    },
  }),
);

interface OffersProps {
  offersList: offer[];
  filters: filtersInterface;
  fetching: boolean;
  setHideFilter: React.Dispatch<React.SetStateAction<boolean>>;
  hideFilter: boolean;
}
export const Offers: React.FC<OffersProps> = ({
  offersList,
  filters,
  fetching,
  setHideFilter,
  hideFilter,
}) => {
  const classes = useStyles();
  const [mobileViewMode, setMobileViewMode] = useState({
    view: "list",
    header: true,
  });

  return (
    <>
      <Hidden smDown>
        <div className={styles.offersContainerDesktop}>
          <Switch>
            <Route
              path="/offers/:offerTitle"
              component={() => (
                <OfferDetail
                  filters={filters}
                  fetching={fetching}
                  offersList={offersList}
                />
              )}
            />

            <Route
              path="/"
              component={() => (
                <OffersList fetching={fetching} offersList={offersList} />
              )}
            />
          </Switch>

          <div className={styles.width90}>
            <Switch>
              <Route
                path="/offers/:offerTitle"
                component={() => <MapDetail offersList={offersList} />}
              />
              /
              <Route
                path="/"
                component={() => <OffersMap offers={offersList} />}
              />
            </Switch>
          </div>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div
          className={styles.flexRow}
          style={{
            height: hideFilter ? "calc(100vh - 65px)" : "calc(100vh - 120px)",
          }}>
          <div
            className={styles.viewMobile}
            style={{
              display: mobileViewMode.view === "map" ? "none" : "block",
            }}>
            <Switch>
              <Route
                path="/offers/:offerTitle"
                component={() => (
                  <OfferDetail
                    setHideFilter={setHideFilter}
                    filters={filters}
                    fetching={fetching}
                    offersList={offersList}
                  />
                )}
              />
              <Route
                path="/"
                component={() => (
                  <OffersList
                    hideFilter={hideFilter}
                    setHideFilter={setHideFilter}
                    fetching={fetching}
                    offersList={offersList}
                  />
                )}
              />
            </Switch>
          </div>
          <div
            style={{
              display: mobileViewMode.view === "map" ? "block" : "none",
            }}
            className={styles.width100}>
            <Switch>
              <Route
                path="/offers/:offerTitle"
                component={() => (
                  <MapDetail
                    mobileViewMode={mobileViewMode}
                    setMobileViewMode={setMobileViewMode}
                    offersList={offersList}
                  />
                )}
              />
              /
              <Route
                path="/"
                component={() => (
                  <OffersMap
                    mobileViewMode={mobileViewMode}
                    setMobileViewMode={setMobileViewMode}
                    offers={offersList}
                  />
                )}
              />
            </Switch>
          </div>
          <div className={styles.mapButton}>
            <button
              classes={{ root: classes.root }}
              onClick={() => {
                setMobileViewMode({
                  ...mobileViewMode,
                  view: mobileViewMode.view === "list" ? "map" : "list",
                });
              }}>
              {" "}
              {mobileViewMode.view === "list" ? (
                <MapIcon className={classes.whiteIcon} />
              ) : (
                <ArrowBackIcon className={classes.whiteIcon} />
              )}{" "}
            </button>
          </div>
        </div>
      </Hidden>
    </>
  );
};
