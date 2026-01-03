import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BusinessIcon from "@material-ui/icons/Business";
import CreateIcon from "@material-ui/icons/Create";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import MailIcon from "@material-ui/icons/Mail";
import PeopleIcon from "@material-ui/icons/People";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ShowChartIcon from "@material-ui/icons/ShowChart";
// import { ButtonBase } from "@material-ui/core";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Field, Form } from "react-final-form";
// @ts-expect-error
import ReactHtmlParser from "react-html-parser";
// @ts-expect-error
import Loading from "react-loading-animation";
import NumberFormat from "react-number-format";
import { useHistory, useRouteMatch } from "react-router-dom";
import slugify from "slugify";
import type { filtersInterface, formValuesCV, offer } from "@/types";
import { BackgroundOffer, CVSent } from "../../assets/images";
import styles from "./offers.module.scss";

interface MatchParams {
  offerTitle: string;
}

export interface OfferDetailProps {
  offersList: offer[];
  filters: filtersInterface;
  fetching: boolean;
  setHideFilter?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OfferDetail: React.FC<OfferDetailProps> = ({
  offersList,
  filters,
  fetching,
  setHideFilter,
}) => {
  const match = useRouteMatch<MatchParams>();
  const history = useHistory();
  const offers = [...offersList];
  const offer = offers.filter(
    (e) =>
      match.params.offerTitle ===
      slugify(`${e.company}-${e.title}`, {
        lower: true,
      }),
  )[0];
  const useStyles = makeStyles(
    createStyles({
      root: {
        color: "rgb(255, 255, 255)",
        fontWeight: 600,
        position: "relative",
        paddingRight: 34,
        paddingLeft: 34,
        textTransform: "none",
        boxShadow: "rgba(255, 64, 129, 0.31) 0px 23px 26px -13px",
        background: "rgb(255, 64, 129)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgb(255, 64, 129)",
        borderImage: "initial",
        borderRadius: 18,
        overflow: "hidden",
        transition: "all 0.3s ease-out 0s",
        height: 40,
        margin: "5px 20px 20px 20px",
      },
      arrow: {
        verticalAlign: "middle",
        color: "white",
      },
      businessIcon: { color: "#FF5252" },
      peopleIcon: { color: "#fb8c00" },
      fileIcon: { color: "#ab47bc" },
      chartIcon: { color: "#66BB6A" },
    }),
  );

  const classes = useStyles();

  const [show, setShow] = useState(false);

  const onSubmit = async (values: formValuesCV) => {
    const form = new FormData();
    form.append("name", values.name);
    form.append("email", values.email);
    form.append("message", values.message);
    form.append("checkbox", String(values.checkbox));
    if (values.file) {
      form.append("file", values.file, values.file.name);
    }
    form.append("offerID", offer._id);
    try {
      const request = await fetch(
        `${import.meta.env.VITE_ENTRYPOINT}/cv/upload`,
        {
          method: "POST",
          body: form,
          credentials: "include",
        },
      );
      if (request.ok) {
        setShow(true);
      }
    } catch (e) {
      console.log("Error upload failed", e);
    }
  };
  const experience = [
    {
      id: 1,
      desc: "Nice to have",
    },
    {
      id: 2,
      desc: "Junior",
    },
    {
      id: 3,
      desc: "Regular",
    },
    {
      id: 4,
      desc: "Advanced",
    },
    {
      id: 5,
      desc: "Master",
    },
  ];
  let desc;
  const checkboxData = [
    { label: "Processing data in future recruitment", value: false },
  ];
  const required = (value: string) => (value ? undefined : `Field is required`);
  const mail = (value: string) => {
    const reMail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reMail.test(String(value).toLowerCase())) {
      return undefined;
    } else {
      return "Email is invalid";
    }
  };
  type DropzoneProps = {
    onChange: (acceptedFiles: File[]) => void;
    values: { file: File };
  };
  const Dropzone: React.FC<DropzoneProps> = ({ onChange, values }) => {
    const onDrop = useCallback((acceptedFiles) => {
      onChange(acceptedFiles[0]);
    }, []);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: "application/pdf",
    });

    acceptedFiles.forEach((file) => (
      <li>
        {(file as any).path} - {file.size} bytes
      </li>
    ));

    return (
      <section className="container">
        <div className={styles.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          <FontAwesomeIcon
            className={styles.pictureDrop}
            icon={faFileUpload}
            size="3x"
          />
          <h2 className={styles.uploadDrop}>Upload CV (.pdf)</h2>
        </div>
        <aside>
          {values.file ? (
            <h4 className={styles.detailsDrop}>
              {values.file.name} -{" "}
              {Math.round((values.file.size / 1000000 + Number.EPSILON) * 100) /
                100}{" "}
              MB
            </h4>
          ) : (
            ""
          )}
        </aside>
      </section>
    );
  };

  useEffect(() => {
    if (setHideFilter !== undefined) {
      setHideFilter(true);
    }
  }, []);

  const values = { checkbox: false };
  return (
    <div className={styles.offerDetailContainer}>
      {fetching === true ? (
        <div className={styles.loadingContainer}>
          <Loading className={styles.loadingDimensions} />
        </div>
      ) : (
        ""
      )}
      {offer !== undefined ? (
        <div className={`${styles.offer} ${styles.mobilePadding}`}>
          <div className={styles.top}>
            <div
              className={styles.banner}
              style={{
                background: `url(${BackgroundOffer}) center center / cover no-repeat, linear-gradient(30deg, ${offer.technology[0].background})`,
              }}>
              <div
                className={styles.backButton}
                onClick={() =>
                  history.push(
                    `/${filters.city}/${filters.language}/${filters.experience}/${filters.salarymin}/${filters.salarymax}`,
                  )
                }>
                <ArrowBackIcon className={classes.arrow} />
              </div>
              <div className={styles.name}>
                <div className={styles.logoCircle}>
                  <div className={styles.circle}>
                    <img
                      src={offer.logo}
                      className={styles.companyLogoDimensions}
                      alt="logo"
                    />
                  </div>
                </div>
                <div className={styles.titleSalary}>
                  <span className={styles.salaryStreetDetail}>
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
                    {offer.currency} net/month
                  </span>
                  <div className={styles.title}>
                    <span className={styles.titleDetail}>{offer.title}</span>
                  </div>
                  <div>
                    <span className={styles.salaryStreetDetail}>
                      {offer.street}, {offer.city}{" "}
                    </span>
                  </div>
                </div>
                <div className={styles.flexJustify}>
                  <div className={styles.apply}>
                    <a href="#apply" className={styles.linkRoute}>
                      <button>
                        <MailIcon /> Apply{" "}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.itSkills}>
              <div className={styles.mobileColumn}>
                <div className={styles.skill}>
                  <div className={styles.skillCircle}>
                    <BusinessIcon className={classes.businessIcon} />
                  </div>
                  <a
                    href={`https://${offer.website}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={styles.linkRoute}>
                    {offer.company}
                  </a>
                  <div className={styles.companyDetails}>Company Name</div>
                </div>
                <div className={styles.skill}>
                  <div className={styles.skillCircle}>
                    <PeopleIcon className={classes.peopleIcon} />
                  </div>
                  <span>{offer.companySize}</span>
                  <div className={styles.companyDetails}>Company Size</div>
                </div>
              </div>
              <div className={styles.mobileColumn}>
                <div className={styles.skill}>
                  <div className={styles.skillCircle}>
                    <InsertDriveFileIcon className={classes.fileIcon} />
                  </div>
                  <span>{offer.employment}</span>
                  <div className={styles.companyDetails}>EMP. type</div>
                </div>
                <div className={styles.skill}>
                  <div className={styles.skillCircle}>
                    <ShowChartIcon className={classes.chartIcon} />
                  </div>
                  <div>{offer.experience}</div>
                  <div className={styles.companyDetails}>EXP. lvl</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.offerDetails}>
            <div className={styles.techStack}>
              <div className={styles.titleTech}>Tech Stack</div>
              <div className={styles.insideTech}>
                <div className={styles.techSkills}>
                  {offer.techStack.map((stack, i) => {
                    desc = experience.filter((e) => stack.lvl === e.id)[0].desc;
                    return (
                      <div key={i} className={styles.techPadding}>
                        <div className={styles.flexRow}>
                          {experience.map((lvl, index) => (
                            <span
                              key={index}
                              className={
                                stack.lvl >= lvl.id
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
            <div className={styles.sectionCard}>
              <div className={styles.titleTech}>Description</div>
              <div className={styles.description}>
                <div className={styles.additionalDesc}>
                  {ReactHtmlParser(offer.description)}
                </div>
              </div>
            </div>
            {show ? (
              <div className={styles.CVSent}>
                <img alt="cv-sent" src={CVSent} />
                <span className={styles.spanSent}>
                  Great! Your application was successfully sent to:{" "}
                </span>
                <span className={styles.spanSentCompany}>{offer.company}</span>
              </div>
            ) : (
              <div className={styles.sectionCard}>
                <div className={styles.titleTech}>Apply for this job</div>
                <Form
                  initialValues={values}
                  onSubmit={onSubmit}
                  render={({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                      <div id="apply" className={styles.cvContainer}>
                        <div className={styles.inputsDirection}>
                          <div
                            className={`${styles.inputs} ${styles.marginName}`}>
                            <TextField
                              id="name"
                              fieldProps={{ validate: required }}
                              name="name"
                              variant="outlined"
                              label="First and last name"
                              required={true}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonOutlineOutlinedIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                          <div
                            className={`${styles.inputs} ${styles.marginMail}`}>
                            <TextField
                              id="email"
                              fieldProps={{ validate: mail }}
                              variant="outlined"
                              name="email"
                              label="Email"
                              required={true}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <MailIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </div>

                        <div className={styles.introCV}>
                          <div className={styles.about}>
                            <TextField
                              rows="4"
                              multiline={true}
                              variant="outlined"
                              name="message"
                              label="Introduce yourself (linkedin/github links)"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CreateIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>

                          <div className={styles.CV}>
                            <Field name="file">
                              {(props) => (
                                <Dropzone
                                  values={values}
                                  onChange={props.input.onChange}
                                />
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className={styles.checkBox}>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label={checkboxData[0].label}
                            />
                          </FormGroup>
                        </div>
                        <div className={styles.bottomSection}>
                          <p className={styles.captchaStyling}>
                            This site is protected by reCAPTCHA and the Google
                            Privacy Policy and Terms of Service apply.
                          </p>

                          <button
                            classes={{ root: classes.root }}
                            color="primary"
                            type="submit"
                            onClick={() => handleSubmit}>
                            Apply CV
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
