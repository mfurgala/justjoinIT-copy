import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import type { applicationInterface } from "@/types";
import styles from "./offers.module.scss";

type OfferListItemCVProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showCvs?: applicationInterface[];
  open: boolean;
  title: string;
};

const useStyles = makeStyles(
  createStyles({
    dialog: { padding: "16px 16px 0px 16px" },
    checkIcon: { fontSize: 17, color: "#47b300" },
    clearIcon: { fontSize: 17, color: "#FF6347" },
  }),
);
export const OfferListItemCV: React.FC<OfferListItemCVProps> = ({
  setOpen,
  showCvs,
  open,
  title,
}) => {
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    e.preventDefault();
  };
  const classes = useStyles();
  return (
    <Dialog
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation();
      }}
      onClose={handleClose}
      open={open}>
      <div className={styles.fontTitleDialog}>
        <DialogTitle className={classes.dialog} id="simple-dialog-title">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close">
            <ClearIcon />
          </IconButton>
          CV applied for {title}
          <hr />
        </DialogTitle>
      </div>
      <DialogContent>
        {showCvs !== undefined
          ? showCvs.map((application, index) => (
              <div key={index} className={styles.fontInsideDialog}>
                <div>
                  <span className={styles.spanFont}>Name: </span>
                  {application.name}{" "}
                </div>
                <div>
                  <span className={styles.spanFont}>Email: </span>{" "}
                  {application.email}{" "}
                </div>
                <div>
                  <span className={styles.spanFont}>Message:</span>{" "}
                  {application.message === "undefined"
                    ? "No description provided"
                    : application.message}
                </div>
                <a
                  className={styles.CVButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${import.meta.env.VITE_ENTRYPOINT}/upload/${application.file}`}>
                  Show CV
                </a>
                <div className={styles.processing}>
                  <span className={styles.recruitmentMobile}>
                    Processing data in future recruitment:{" "}
                  </span>
                  {application.checkbox ? (
                    <div className={styles.centerIcon}>
                      <CheckIcon className={classes.checkIcon} />
                    </div>
                  ) : (
                    <div className={styles.centerIcon}>
                      <ClearIcon className={classes.clearIcon} />
                    </div>
                  )}
                </div>
                <hr className={styles.hrStyle} />
              </div>
            ))
          : ""}
      </DialogContent>
    </Dialog>
  );
};
