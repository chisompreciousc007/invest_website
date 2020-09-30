import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";
import Profile from "./components/Profile";
import About from "./components/About";
import Transactions from "./components/Transactions";
import FAQ from "./components/FAQ";
import Support from "./components/Support";
import Terms from "./components/Terms";
import { UserContext } from "./components/UserContext";

function App() {
  const [user, setUser] = useState(null);
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
            <Route path="/edit_account" exact component={Profile} />
            <Route path="/login" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/deposit" exact component={Deposit} />
            <Route path="/transactions" exact component={Transactions} />
          </UserContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
