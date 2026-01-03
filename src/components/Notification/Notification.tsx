// import { Slide } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
// import { TransitionProps } from "@material-ui/core/transitions";
import Alert from "@mui/material/Alert";
import { useNotificationStore } from "@/store/notificationStore";

export function Notification() {
  const { open, message, severity, hide } = useNotificationStore();
  return (
    open && (
      // <Snackbar
      //   open={open}
      //   // TransitionComponent={function SlideTransition(props: TransitionProps) {
      //   //   return <Slide {...props} direction="down" />;
      //   // }}
      //   anchorOrigin={{ vertical: "top", horizontal: "center" }}
      //   autoHideDuration={3000}
      //   onClose={hide}>
      <Alert onClose={hide} severity={severity}>
        {message}
      </Alert>
    )
  );
}
