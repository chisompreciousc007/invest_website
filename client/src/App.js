import React, { useState } from "react";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import Dashboard from "./components/Dashboard";
// import Deposit from "./components/Deposit";
// import Profile from "./components/Profile";
// import About from "./components/About";
// import Transactions from "./components/Transactions";
// import FAQ from "./components/FAQ";
// import Support from "./components/Support";
import asyncComponent from "./components/asyncComponent";
import { UserContext } from "./components/UserContext";
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
  const [user, setUser] = useState({ authenticated: false });
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
          <UserContext.Provider value={{ user, setUser }}>
            {user.authenticated ? (
              <Route path="/edit_account" exact component={Profile} />
            ) : null}
            {user.authenticated ? (
              <Route path="/dashboard" exact component={Dashboard} />
            ) : null}
            {user.authenticated ? (
              <Route path="/deposit" exact component={Deposit} />
            ) : null}
            {user.authenticated ? (
              <Route path="/transactions" exact component={Transactions} />
            ) : null}
            <Route path="/login" exact component={Login} />
          </UserContext.Provider>
          <Route render={() => <h1>Page Not Found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
