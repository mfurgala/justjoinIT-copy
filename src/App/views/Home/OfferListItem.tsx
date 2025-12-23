import Hidden from "@material-ui/core/Hidden";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import BusinessIcon from "@material-ui/icons/Business";
import DescriptionIcon from "@material-ui/icons/Description";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import type { applicationInterface, offerInterface } from "@utils/const";
import { useState } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import slugify from "slugify";
import { OfferListItemCV } from "./OfferListItemCV";
import styles from "./offers.module.scss";

const useStyles = makeStyles(
  createStyles({
    margin: {
      marginRight: 4,
    },
  }),
);

type OfferListItemProps = {
  offer: offerInterface;
  applications: applicationInterface[] | undefined;
};
export const OfferListItem: React.FC<OfferListItemProps> = ({
  offer,
  applications,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [showCvs, setShowCvs] = useState<applicationInterface[]>();

  const cvCount: { [key: string]: number } = {};
  const cvCountFunc = (key: string) => {
    if (cvCount[key] === undefined) {
      cvCount[key] = 1;
    } else {
      cvCount[key] = cvCount[key] + 1;
    }
  };

  if (applications !== undefined) {
    applications.forEach((e) => {
      if (e.offerID) {
        cvCountFunc(e.offerID);
      }
    });
  }

  const [title, setTitle] = useState("");
  const matchingApplications = (offerID: string) => {
    if (applications !== undefined) {
      const matchingApplications = applications.filter(
        (application) => offerID === application.offerID,
      );
      setShowCvs(matchingApplications);
      handleClickOpen();
    }
  };
  return (
    <Link
      key={offer.company + offer.title}
      to={`/offers/${slugify(`${offer.company}-${offer.title}`, {
        lower: true,
      })}`}
      className={styles.offerLink}>
      <div className={`${styles.main} animated fadeIn fast`}>
        <div
          className={styles.color}
          style={{ background: `${offer.technology[0].color}` }}
        />
        <div className={styles.img}>
          <img src={offer.logo} className={styles.logoList} alt="logo" />
        </div>
        <div className={styles.card}>
          <div className={`${styles.flex} ${styles.fontSize}`}>
            <div>
              <h3>{offer.title}</h3>
            </div>
            <div className={styles.salary}>
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
            </div>
          </div>
          <div className={`${styles.flex} ${styles.fontIconText}`}>
            <div className={styles.businessContainer}>
              <BusinessIcon fontSize={"inherit"} /> {offer.company}{" "}
            </div>
            <div className={styles.locationContainer}>
              <LocationOnRoundedIcon
                className={classes.margin}
                fontSize={"inherit"}
              />
              {offer.city}
            </div>
            <Hidden smDown>
              <div className={styles.flexEnd}>
                {offer.techStack.map((element, index) => {
                  if (index < 3) {
                    return (
                      <div key={index} className={styles.tag}>
                        {element.language}
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </Hidden>
          </div>
        </div>

        {applications ? (
          <div
            className={styles.iconCv}
            onClick={(e) => {
              e.preventDefault();
              matchingApplications(offer._id);
              setTitle(offer.title);
            }}>
            <DescriptionIcon className={styles.iconCvSize} />
            <div className={styles.dashboardCVContainer}>
              {cvCount[offer._id] !== undefined ? cvCount[offer._id] : "0"} CV
            </div>
          </div>
        ) : (
          ""
        )}
        <OfferListItemCV
          setOpen={setOpen}
          showCvs={showCvs}
          open={open}
          title={title}
        />
      </div>
    </Link>
  );
};
