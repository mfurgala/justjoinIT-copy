import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "@style/style.scss";
import { Header } from "@components/Header/Header";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import type { TransitionProps } from "@material-ui/core/transitions";
import Alert from "@material-ui/lab/Alert";
import { API_HOST } from "@utils/api";
import type { userInterface } from "@utils/const";
import { offersList } from "@utils/mockData";
import { Dashboard } from "@views/Auth/Dashboard";
import { SignIn } from "@views/Auth/SignIn";
import { SignUp } from "@views/Auth/SignUp";
import { Home } from "@views/Home/Home";
import { ChoosePlan } from "@views/PostJob/ChoosePlan";
import { JustStepper } from "@views/PostJob/JustStepper";
import style from "./app.module.scss";

const SlideTransition = (props: TransitionProps) => {
  return <Slide {...props} direction="down" />;
};

const App: React.FC = () => {
  const [user, setUser] = useState<userInterface>({
    auth: true,
    name: "",
    userID: "",
    loggedPopup: false,
    offPopup: false,
    createPopup: false,
    addPopup: false,
  });
  const [fetching, setFetching] = useState(false);
  const [offers, setOffers] = useState(offersList);
  const fetchOffers = () => {
    fetch(API_HOST).then((response) => {
      response.json().then((json) => {
        setOffers(json);
        setFetching(false);
      });
    });
  };
  useEffect(() => {
    fetch(`${API_HOST}/me`, {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        response.text().then((text) => {
          const newText: { email: string; name: string; id: string } =
            JSON.parse(text);
          setUser({
            name: newText.email,
            userID: JSON.stringify(newText.id),
            auth: true,
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    const fetchOffers = () => {
      fetch(API_HOST).then((response) => {
        response.json().then((json) => {
          setOffers(json);
          setFetching(false);
        });
      });
    };
    fetchOffers();
  }, []);
  const handleClose = () => {
    setUser({ ...user, loggedPopup: false, offPopup: false, addPopup: false });
  };
  return (
    <div className={style.root}>
      <Snackbar
        open={user.loggedPopup}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          You are logged in.
        </Alert>
      </Snackbar>
      <Snackbar
        open={user.offPopup}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Logged out.
        </Alert>
      </Snackbar>
      <Snackbar
        open={user.addPopup}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Offer successfully added!
        </Alert>
      </Snackbar>
      <BrowserRouter>
        <Header setUser={setUser} user={user} />
        <Switch>
          <Route
            path="/add/basic"
            exact
            render={() =>
              user.auth ? (
                <JustStepper
                  user={user}
                  setUser={setUser}
                  fetchOffers={fetchOffers}
                />
              ) : (
                <Redirect to="/devs" />
              )
            }
          />
          <Route
            path="/add"
            render={() =>
              user.auth ? <ChoosePlan /> : <Redirect to="/devs" />
            }
            exact
          />
          <Route
            path="/devs"
            render={() =>
              user && !user.auth ? (
                <SignIn user={user} setUser={setUser} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
            exact
          />
          <Route path="/devs/signup" exact>
            <SignUp user={user} setUser={setUser} />
          </Route>
          <Route
            path="/facebook"
            component={() => {
              window.location.href = "https://www.facebook.com/JustJoinIT/";
              return null;
            }}
            exact
          />
          <Route
            path="/dashboard"
            render={() =>
              user.auth ? (
                <Dashboard offers={offers} user={user} />
              ) : (
                <Redirect to="/devs" />
              )
            }
            exact
          />
          <Route
            path="/event"
            component={() => {
              window.location.href = "https://event.justjoin.it/";
              return null;
            }}
            exact
          />

          <Route
            path="/justgeekit"
            component={() => {
              window.location.href = "https://geek.justjoin.it/";
              return null;
            }}
            exact
          />

          <Route path="/devs" exact>
            <SignIn user={user} setUser={setUser} />
          </Route>

          <Route path="/offers/:offerTitle" exact>
            <Home fetching={fetching} offers={offers} />
          </Route>

          <Route
            path="/:city?/:language?/:experience?/:salarymin?/:salarymax?"
            exact>
            <Home fetching={fetching} offers={offers} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
