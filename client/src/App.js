import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import asyncComponent from "./components/asyncComponent";
import { UserContext } from "./components/UserContext";
import ErrorHandler from "./components/ErrorHandler";
const FAQ = asyncComponent(() => import("./components/FAQ"));
const About = asyncComponent(() => import("./components/About"));
const Home = asyncComponent(() => import("./components/Home"));
const Login = asyncComponent(() => import("./components/Login"));
const SignUp = asyncComponent(() => import("./components/SignUp"));
const Support = asyncComponent(() => import("./components/Support"));
const Dashboard = asyncComponent(() => import("./components/Dashboard"));
const Profile = asyncComponent(() => import("./components/Profile"));
const Transactions = asyncComponent(() => import("./components/Transactions"));
const Deposit = asyncComponent(() => import("./components/Deposit"));
const Terms = asyncComponent(() => import("./components/Terms"));

function App() {
  const [user, setUser] = useState({
    user: {
      //   name: "Loading",
      //   username: "Loading",
      //   isActivated: false,
      //   InvestAmt: "Loading",
      //   updatedAt: "Loading",
      //   pendingInvestAmt: "Loading",
      //   pendingCashoutAmt: "Loading",
      //   isBlocked: false,
      //   createdAt: "Loading",
    },
    payArr: [],
    getArr: [],
    guiderArr: [],
    activationFee: {},
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/faq" exact component={FAQ} />
          <Route path="/support" exact component={Support} />
          <Route path="/signup=:ref" exact component={SignUp} />
          <Route path="/rules" exact component={Terms} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/contactSupport"
            exact
            render={() => (
              <h1>
                Your Account is Blocked,Contact Support at email:
                Support@splashcash247.com, Telegram: SplashCash247_Support,
                Whatsapp: +2348031245678
              </h1>
            )}
          />
          <UserContext.Provider value={{ user, setUser }}>
            <ErrorHandler>
              <Route path="/edit_account" exact component={Profile} />

              <Route path="/dashboard" exact component={Dashboard} />

              <Route path="/deposit" exact component={Deposit} />

              <Route path="/transactions" exact component={Transactions} />
            </ErrorHandler>
          </UserContext.Provider>
          {/* <Route component={() => <h1>Page not found</h1>} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
