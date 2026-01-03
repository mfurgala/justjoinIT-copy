import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "@/style/style.scss";
import { Header, Notification } from "@/components";
import type { user } from "@/types";
import { ResetPassword, SignIn, SignUp } from "@/views/auth";
import { Dashboard } from "@/views/dashboard";
import { Home } from "@/views/home/";
import { ChoosePlan, JustStepper } from "@/views/post-job";
import style from "./app.module.scss";
import { offersList } from "./test/mockData";

const App: React.FC = () => {
  const [user, setUser] = useState<user>({
    auth: false,
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
    fetch(import.meta.env.VITE_ENTRYPOINT).then((response) => {
      response.json().then((json) => {
        setOffers(json);
        setFetching(false);
      });
    });
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_ENTRYPOINT}/me`, {
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
      fetch(import.meta.env.VITE_ENTRYPOINT).then((response) => {
        response.json().then((json) => {
          setOffers(json);
          setFetching(false);
        });
      });
    };
    fetchOffers();
  }, []);

  return (
    <div className={style.root}>
      <Notification />
      {/* <Snackbar
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
      </Snackbar> */}
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
          <Route path="/devs/register" exact>
            <SignUp />
          </Route>
          <Route path="/devs/reset" exact>
            <ResetPassword />
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
