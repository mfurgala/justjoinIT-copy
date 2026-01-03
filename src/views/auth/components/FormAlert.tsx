import Alert from "@material-ui/lab/Alert";
import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(
  createStyles({
    root: {
      width: "min(330px, 90%)",
      margin: "5px 0px 15px 0px",
    },
  }),
);

export function FormAlert({ message }: { message: string }) {
  const classes = useStyles();
  return (
    <Alert className={classes.root} variant="filled" severity="error">
      {message}
    </Alert>
  );
}
