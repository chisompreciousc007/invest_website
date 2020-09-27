import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";
import Profile from "./components/Profile";
import About from "./components/About";
import Transactions from "./components/Transactions";
import Referals from "./components/Network";
import FAQ from "./components/FAQ";
import Support from "./components/Support";
import Terms from "./components/Terms";
// import "bootswatch/dist/solar/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/about" exact component={About} />
          <Route path="/faq" exact component={FAQ} />
          <Route path="/support" exact component={Support} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/deposit" exact component={Deposit} />
          <Route path="/transactions" exact component={Transactions} />
          <Route path="/referals" exact component={Referals} />
          <Route path="/rules" exact component={Terms} />
          <Route path="/edit_account" exact component={Profile} />
          <Route path="/signup=:ref" exact component={SignUp} />
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
