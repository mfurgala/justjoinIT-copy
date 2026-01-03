import { createStyles, makeStyles } from "@material-ui/core/styles";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { withStyles } from "@material-ui/styles";
import {
  FormGroup,
  InputAdornment,
  MenuItem,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import { Checkboxes, Select, TextField } from "mui-rff";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import styles from "./addoffer.module.scss";
import "trix/dist/trix";
import "trix/dist/trix.css";
import { Field, Form } from "react-final-form";
import { TrixEditor } from "react-trix";
// import Button from "@material-ui/core/Button";
import type { form } from "@/types";
import { QuestionMark } from "../../assets/images";
import { language } from "../home/constData";
import { Address } from "./Address";
import { agreements } from "./const";
import { Icons } from "./Icons";
import { MapPreview } from "./MapPreview";
import { TechStack } from "./TechStack";

const NewTooltip = withStyles(
  createStyles({
    tooltip: {
      backgroundColor: "black",
      color: "white",
      fontSize: 13,
    },
  }),
)(Tooltip);

const useStylesField = makeStyles(
  createStyles({
    textField: {
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "0px solid #9e9e9e",
      borderRadius: 0,
      outline: "none",
      height: "3rem",
      width: "100%",
      margin: "0 0 20px 0",
      padding: 0,
      boxShadow: "none",
      boxSizing: "content-box",
      transition: "all 0.3s",
      color: "inherit",
      font: "inherit",
      fontSize: "inherit",
    },
    selectField: {
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "0px solid #9e9e9e",
      borderRadius: 0,
      outline: "none",
      height: "3rem",
      width: "100%",
      margin: "0 0 0px 0",
      padding: 0,
      boxShadow: "none",
      boxSizing: "content-box",
      transition: "all 0.3s",
      color: "inherit",
      font: "inherit",
      fontSize: "inherit",
    },
    iconAlignment: {
      verticalAlign: "middle",
    },
    outlineIcon: {
      fontSize: 14,
    },
    selectMargin: {
      marginTop: 20,
      backgroundColor: "transparent",
      border: "none",
      borderBottom: "0px solid #9e9e9e",
      borderRadius: 0,
      outline: "none",
      height: "3rem",
      width: "100%",
      margin: "0 0 0px 0",
      padding: 0,
      boxShadow: "none",
      boxSizing: "content-box",
      transition: "all 0.3s",
      color: "inherit",
      font: "inherit",
      fontSize: "inherit",
    },

    outlineFont: { fontSize: 14 },
  }),
);

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
  }),
);

const useStyleDesc = makeStyles(
  createStyles({
    textField: {
      width: "98%",
      height: 200,
      border: "1px solid rgba(0,0,0,0.12)",
      padding: "10px 10px",
      overflow: "hidden",
      fontSize: 12,
      borderRadius: 4,
    },
    error: {
      width: "98%",
      height: 200,
      border: "1px solid#d50000",
      padding: "10px 10px",
      overflow: "hidden",
      fontSize: 12,
      borderRadius: 4,
    },
  }),
);

type DropzoneProps = {
  setFormValues: React.Dispatch<React.SetStateAction<form>>;
  formValues: form;
  onChange: (acceptedFiles: ArrayBuffer | null | string | undefined) => void;
  values: form;
  error: string;
};

const Dropzone: React.FC<DropzoneProps> = ({
  setFormValues,
  formValues,
  onChange,
  values,
  error,
}) => {
  const onDrop = useCallback((files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (_event: Event) => {
      onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  return (
    <div className={styles.dropzoneContainer}>
      {values.logo === undefined ? (
        <div className={styles.dropzoneFlex} {...getRootProps()}>
          <input {...getInputProps()} />
          <AddAPhotoOutlinedIcon
            style={
              error ? { fontSize: 60, color: "#f44336" } : { fontSize: 60 }
            }
          />
          <div>
            <h3 className={error ? styles.red : ""}>
              Upload/Drop Logo *{" "}
              <NewTooltip title="Upload company logo .png/.jpg/.jpeg in any resolution.">
                <HelpOutlineIcon
                  style={
                    error
                      ? { fontSize: 14, color: "#f44336" }
                      : { fontSize: 14 }
                  }
                />
              </NewTooltip>
            </h3>
            {error ? (
              <h3 className={styles.dropzoneError}>Company logo is required</h3>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <img
          onClick={() => {
            onChange(undefined);
            setFormValues({ ...formValues, logo: undefined });
          }}
          src={values.logo ? values.logo : formValues.logo}
          className={styles.dropzoneUploaded}
          alt="logo"
        />
      )}
    </div>
  );
};

type AddOfferProps = {
  formValues: form;
  setFormValues: React.Dispatch<React.SetStateAction<form>>;
  handleNext: () => void;
};
export const AddOffer: React.FC<AddOfferProps> = ({
  formValues,
  setFormValues,
  handleNext,
}) => {
  const classesField = useStylesField();
  const classStep = useStylesStep();
  const classDesc = useStyleDesc();

  const onSubmit = (values: form) => {
    setFormValues({ ...formValues, ...values });
    handleNext();
  };
  const required = (value: string | number) =>
    value ? undefined : `Field is required`;
  const agreementRequired = (value: string) =>
    value !== agreements ? undefined : `Field is required`;
  const technologyRequired = (value: { img: string }) =>
    value && value.img !== QuestionMark ? undefined : " ";

  const arrayNotEmpty = (value: []) => {
    return value ? value.length === 0 : `Field is required`;
  };
  const emailWeb = (value: string) => {
    const re =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/;
    const re2 =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      re.test(String(value).toLowerCase()) ||
      re2.test(String(value).toLowerCase())
    ) {
      return undefined;
    } else {
      return "Email or link is invalid";
    }
  };
  const website = (value: string) => {
    const re =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/;
    if (re.test(String(value).toLowerCase())) {
      return undefined;
    } else {
      return "Invalid format ex. www.web.com";
    }
  };
  const checkboxData = [{ label: "Fully Remote", value: Boolean }];

  return (
    <div className={styles.addOfferContainer}>
      <div className={styles.card}>
        <Link to={"/add"} className={styles.linkRoute}>
          <div className={styles.backButton}>
            <ArrowBackIcon className={classesField.iconAlignment} /> Back
          </div>
        </Link>
        <Form
          initialValues={formValues}
          onSubmit={onSubmit}
          render={({ handleSubmit, values }) => (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <Field name="logo" validate={required}>
                  {(props) => (
                    <Dropzone
                      setFormValues={setFormValues}
                      error={props.meta.touched && props.meta.error}
                      formValues={formValues}
                      values={values}
                      onChange={props.input.onChange}
                    />
                  )}
                </Field>
                <div className={styles.topContainer}>
                  <TextField
                    fieldProps={{ validate: required }}
                    className={classesField.textField}
                    name="company"
                    label="Short company name"
                    required={true}
                  />
                  <TextField
                    fieldProps={{ validate: website }}
                    className={classesField.textField}
                    name="website"
                    label="Company website"
                    required={true}
                  />
                  <TextField
                    fieldProps={{ validate: required }}
                    className={classesField.textField}
                    InputLabelProps={{ shrink: true }}
                    name="companySize"
                    placeholder="10 - 23"
                    label="Company size"
                    required={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={"end"}>
                          <NewTooltip
                            title={
                              <>
                                How many people work in a company? <br />
                                <br />
                                examples:
                                <br />* 10 - 23
                                <br /> * 300+
                                <br /> * {">"}20
                                <br />
                              </>
                            }>
                            <HelpOutlineIcon
                              className={classesField.outlineIcon}
                            />
                          </NewTooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>

                <div className={styles.topContainerCompany}>
                  <Select
                    name="companyType"
                    fieldProps={{ validate: required }}
                    required={true}
                    displayEmpty
                    className={classesField.selectField}>
                    <MenuItem disabled value="">
                      Choose company type
                    </MenuItem>
                    <MenuItem value="Startup">Startup</MenuItem>
                    <MenuItem value="Software House">Software House</MenuItem>
                    <MenuItem value="E-commerce">E-commerce</MenuItem>
                    <MenuItem value="Corporation">Corporation</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  <Select
                    className={classesField.selectMargin}
                    name="companyIndustry"
                    fieldProps={{ validate: required }}
                    required={true}
                    displayEmpty>
                    <MenuItem disabled value="">
                      Choose company industry
                    </MenuItem>
                    <MenuItem value="Fintech">Fintech</MenuItem>
                    <MenuItem value="Blockchain">Blockchain</MenuItem>
                    <MenuItem value="E-commerce">E-commerce</MenuItem>
                    <MenuItem value="Medicine">Medicine</MenuItem>
                    <MenuItem value="Military">Military</MenuItem>
                    <MenuItem value="Martech">Martech</MenuItem>
                    <MenuItem value="IoT">IoT</MenuItem>
                    <MenuItem value="Logistic">Logistic</MenuItem>
                    <MenuItem value="Beauty">Beauty</MenuItem>
                    <MenuItem value="Travel">Travel</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </div>
              </div>
              <div className={styles.middleContainer}>
                <div className={styles.widthPadding}>
                  <TextField
                    className={classesField.textField}
                    fieldProps={{ validate: required }}
                    required={true}
                    name="title"
                    label="Title"
                  />
                </div>
                <div className={styles.widthPadding}>
                  <Select
                    name="experience"
                    fieldProps={{ validate: required }}
                    required={true}
                    displayEmpty
                    className={classesField.selectField}>
                    <MenuItem disabled value="">
                      Choose an experience level
                    </MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Mid">Mid</MenuItem>
                    <MenuItem value="Senior">Senior</MenuItem>
                  </Select>
                </div>
                <div className={styles.widthPadding}>
                  <Select
                    name="employment"
                    fieldProps={{ validate: required }}
                    required={true}
                    displayEmpty
                    className={classesField.selectField}>
                    <MenuItem disabled value="">
                      Choose an employment type
                    </MenuItem>
                    <MenuItem value="B2B">B2B</MenuItem>
                    <MenuItem value="Permanent">Permanent</MenuItem>
                    <MenuItem value="Mandate Contract">
                      Mandate Contract
                    </MenuItem>
                  </Select>
                </div>
              </div>

              <div className={styles.middleContainer}>
                <div className={styles.widthPadding}>
                  <TextField
                    fieldProps={{ parse: (value) => Number(value) }}
                    className={classesField.textField}
                    name="minSalary"
                    label="Monthly salary from (invoice net)"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={"end"}>
                          <NewTooltip
                            title={
                              <>
                                How much the candidate will earn monthly.
                                <br /> <br /> <b>With B2B</b> <br /> It is the
                                net amount without VAT. <br /> <br />{" "}
                                <b>With Permanent or Mandate contract</b> <br />
                                It is the gross amount.
                              </>
                            }>
                            <HelpOutlineIcon
                              className={classesField.outlineFont}
                            />
                          </NewTooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className={styles.widthPadding}>
                  <TextField
                    fieldProps={{
                      format: (value: number) => (value === 0 ? "" : value),
                      parse: (value) => Number(value),
                    }}
                    className={classesField.textField}
                    name="maxSalary"
                    label="Monthly salary to (invoice net)"
                    type="number"
                  />
                </div>
                <div className={styles.widthPadding}>
                  <Select
                    name="currency"
                    displayEmpty
                    className={classesField.selectField}>
                    <MenuItem disabled value="">
                      Choose currency
                    </MenuItem>
                    <MenuItem value="PLN">PLN</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="CHF">CHF</MenuItem>
                  </Select>
                </div>
              </div>

              <div className={styles.width100}>
                <h3 className={styles.titleMargin}>
                  Tech Stack{" "}
                  <NewTooltip
                    title={
                      <>
                        Tech StackIn this section you should put in tech stack
                        and skill level required from the candidate.
                        <br />
                        <br /> You can do it by selecting existing technology or
                        writing a new one <b>(25 characters limit)</b>
                        <br />
                        <br />
                        examples:
                        <br />* Java
                        <br /> * Git
                        <br /> * React
                      </>
                    }>
                    <HelpOutlineIcon className={classesField.outlineFont} />
                  </NewTooltip>
                </h3>
                <Field name="techStack" validate={arrayNotEmpty}>
                  {(props) => (
                    <div className={styles.techStackContainer}>
                      <TechStack
                        onChange={props.input.onChange}
                        fieldRenderProps={props}
                        formValues={values}
                      />
                    </div>
                  )}
                </Field>
              </div>
              <Field name="description" validate={required}>
                {(props) => {
                  const trixValue = String(props.input.value);
                  return (
                    <div className={styles.width100}>
                      <h3 className={styles.titleMargin}>
                        Job description{" "}
                        <NewTooltip
                          title={
                            <>
                              This section should contain: "about us", "your
                              responsibilities", "our requirements", "nice to
                              have", "we offer".
                            </>
                          }>
                          <HelpOutlineIcon
                            className={classesField.outlineFont}
                          />
                        </NewTooltip>
                      </h3>

                      <TrixEditor
                        mergeTags={[]}
                        value={trixValue}
                        className={
                          props.meta.error && props.meta.touched
                            ? styles.trixError
                            : styles.trix
                        }
                        onChange={(html: string) => props.input.onChange(html)}
                      />
                    </div>
                  );
                }}
              </Field>
              <div className={styles.flexWidth}>
                <h3 className={styles.titleMargin}>Choose your location</h3>
              </div>

              <div className={styles.flexWidth}>
                <Address values={values} required={required} />

                <div className={styles.checkboxContainer}>
                  <FormGroup>
                    <Checkboxes name="remote" data={checkboxData} />
                  </FormGroup>
                </div>
              </div>
              <div className={styles.mapContainer}>
                <MapPreview
                  img={values.technology?.[0]?.img}
                  coordinates={values.coordinates?.[0]}
                />
              </div>
              <Field name="technology" validate={technologyRequired}>
                {(props) => (
                  <div
                    className={
                      props.meta.error && props.meta.touched
                        ? styles.technologyMarginError
                        : styles.technologyMargin
                    }>
                    <div className={styles.technologyTitle}>
                      Choose main technology
                    </div>

                    <div className={styles.technologies}>
                      {language.map(({ name, to, img, color, background }) => (
                        <Icons
                          onChange={props.input.onChange}
                          background={background}
                          color={color}
                          name={name}
                          img={img}
                          to={to}
                          key={to}></Icons>
                      ))}
                    </div>
                  </div>
                )}
              </Field>
              <div className={styles.bottomSection}>
                <h3 className={styles.titleMargin}>How to apply</h3>
                <div className={styles.widthPadding}>
                  <TextField
                    fieldProps={{ validate: emailWeb }}
                    className={classesField.textField}
                    name="email"
                    label="Enter apply email or paste link"
                    required={true}
                  />
                </div>
                <h3 className={styles.titleMargin}>Agreements</h3>
                <h4 className={styles.headerInformation}>Information clause</h4>
                <Field name="agreements" validate={agreementRequired}>
                  {(props) => (
                    <div className={styles.agreements}>
                      <TextareaAutosize
                        className={
                          props.meta.error && props.meta.touched
                            ? classDesc.error
                            : classDesc.textField
                        }
                        value={props.input.value ? props.input.value : ""}
                        onChange={(e) => props.input.onChange(e.target.value)}
                      />
                      {props.meta.error && props.meta.touched && (
                        <span className={styles.agreemErr}>
                          Please fill company name and address
                        </span>
                      )}
                    </div>
                  )}
                </Field>
                <button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classStep.button}>
                  Next Step
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};
