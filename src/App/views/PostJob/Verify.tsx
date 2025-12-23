import { BackgroundOffer } from "@assets/images";
// import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BusinessIcon from "@material-ui/icons/Business";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PeopleIcon from "@material-ui/icons/People";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import { API_HOST } from "@utils/api";
import type { formInterface, userInterface } from "@utils/const";
import L from "leaflet";
// @ts-expect-error
import ReactHtmlParser from "react-html-parser";
import { Map as MapLeaflet, Marker, TileLayer } from "react-leaflet";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import { experience } from "./const";
import styles from "./verify.module.scss";

type VerifyProps = {
  setUser: React.Dispatch<React.SetStateAction<userInterface>>;
  user: userInterface;
  formValues: formInterface;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  fetchOffers: () => void;
};
export const Verify: React.FC<VerifyProps> = ({
  setUser,
  user,
  formValues,
  setActiveStep,
  fetchOffers,
}) => {
  const history = useHistory();
  const coordinates: { lng: number; lat: number } = formValues
    .coordinates?.[0] ?? { lng: 0, lat: 0 };
  const useStylesStep = makeStyles(
    createStyles({
      button: {
        "&:hover": {
          backgroundColor: "#ff5a92;",
        },
        backgroundColor: " #ff4081",
        background: "#f8f8f8",
        letterSpacing: ".5px",
        transition: ".2s ease-out",
        borderRadius: 20,
        width: 130,
        marginTop: 20,
      },
      arrow: {
        verticalAlign: "middle",
      },
      businessIcon: {
        color: "#FF5252",
      },
      peopleIcon: {
        color: "#fb8c00",
      },
      fileIcon: {
        color: "#ab47bc",
      },
      chartIcon: {
        color: "#66BB6A",
      },
    }),
  );
  const classStep = useStylesStep();

  const pointerIcon = new L.Icon({
    iconUrl: formValues.technology?.[0]?.img,
    iconRetinaUrl: formValues.technology?.[0]?.img,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [40, 40],
  });
  let desc = "";

  const sendOffer = async () => {
    try {
      const response = await fetch(`${API_HOST}/add`, {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        setUser({ ...user, addPopup: true });
        fetchOffers();
        history.push("/dashboard");
      } else {
        response.text().then((text) => text);
      }
    } catch (err) {}
  };
  return (
    <div className={styles.offer}>
      <div className={styles.card}>
        <div className={styles.backButton} onClick={() => setActiveStep(0)}>
          <ArrowBackIcon className={classStep.arrow} /> BACK
        </div>
        <div className={styles.top}>
          <div
            className={styles.banner}
            style={{
              background: `url(${BackgroundOffer}) center center / cover no-repeat, linear-gradient(30deg, ${
                formValues.technology?.[0].background
              })`,
            }}>
            <div className={styles.name}>
              <div className={styles.logoCircle}>
                <div className={styles.circle}>
                  <img
                    className={styles.logoImg}
                    src={formValues.logo}
                    alt="logo"
                  />
                </div>
              </div>
              <div className={styles.titleSalary}>
                <span className={styles.salaryStreetDetail}>
                  <NumberFormat
                    value={formValues.minSalary}
                    thousandSeparator={" "}
                    displayType={"text"}
                  />{" "}
                  -{" "}
                  <NumberFormat
                    value={formValues.maxSalary}
                    thousandSeparator={" "}
                    displayType={"text"}
                  />{" "}
                  {formValues.currency} net/month
                </span>
                <div className={styles.title}>
                  <span className={styles.fontTitle}>{formValues.title}</span>
                </div>
                <div>
                  <span className={styles.salaryStreetDetail}>
                    {formValues.street}, {formValues.city}{" "}
                  </span>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className={styles.itSkills}>
            <div className={styles.skill}>
              <div className={styles.skillCircle}>
                <BusinessIcon className={classStep.businessIcon} />
              </div>
              <a href={formValues.email} className={styles.linkStyle}>
                {formValues.company}
              </a>
              <div className={styles.companyDetails}>Company Name</div>
            </div>
            <div className={styles.skill}>
              <div className={styles.skillCircle}>
                <PeopleIcon className={classStep.peopleIcon} />
              </div>
              <span>{formValues.companySize}</span>
              <div className={styles.companyDetails}>Company Size</div>
            </div>
            <div className={styles.skill}>
              <div className={styles.skillCircle}>
                <InsertDriveFileIcon className={classStep.fileIcon} />
              </div>
              <span>{formValues.employment}</span>
              <div className={styles.companyDetails}>EMP. type</div>
            </div>
            <div className={styles.skill}>
              <div className={styles.skillCircle}>
                <ShowChartIcon className={classStep.chartIcon} />
              </div>
              <span>{formValues.experience}</span>
              <div className={styles.companyDetails}>EXP. lvl</div>
            </div>
          </div>
        </div>
        <div className={styles.offerDetails}>
          <div className={styles.techStack}>
            <div className={styles.titleTech}>Tech Stack</div>
            <div className={styles.insideTech}>
              <div className={styles.techSkills}>
                {formValues.techStack.map((stack, index) => {
                  desc = experience.filter((e) => stack.lvl === e.id)[0].desc;
                  return (
                    <div key={index} className={styles.tagsPadding}>
                      <div className={styles.flexRow}>
                        {experience.map((lvl, nestedIndex) => (
                          <span
                            key={nestedIndex}
                            className={
                              stack.lvl && stack.lvl >= lvl.id
                                ? styles.dotClicked
                                : styles.dot
                            }
                          />
                        ))}
                      </div>
                      <div className={styles.language}>{stack.language}</div>
                      <div className={styles.desc}>{desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.techStack}>
            <div className={styles.titleTech}>Description</div>
            <div className={styles.description}>
              {ReactHtmlParser(formValues.description)}
            </div>
          </div>
          <div className={styles.mapContainer}>
            <MapLeaflet center={formValues.coordinates?.[0]} zoom={12}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinates} icon={pointerIcon}></Marker>
            </MapLeaflet>
          </div>
          <div className={styles.agreementsContainer}>
            <div className={styles.titleTech}>Agreements</div>
            <div className={styles.agreements}>{formValues.agreements}</div>
          </div>
        </div>
        <button
          variant="contained"
          color="primary"
          onClick={sendOffer}
          className={classStep.button}>
          Publish
        </button>
      </div>
    </div>
  );
};
