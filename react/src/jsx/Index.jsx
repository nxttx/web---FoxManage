import React from "react"; //useEffect
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./includes/Header";
import Aside from "./includes/Aside";
import Footer from "./includes/Footer";
import Dashboard from "./pages/Dashboard";
import Facturen from "./pages/Facturen";
import Databases from "./pages/Databases";
import Domains from "./pages/Domains";
import Mailboxes from "./pages/Mailboxes";

/**
 * Main page function for the appplication. Routing is done here.
 *
 * @author Robert Boudewijn
 * @date 2021/01/20
 * @param {*} props
 * @return {*}
 */
function Index(props) {
  return (
    <Router>
      <Header IP={props.IP} setCurrentScreen={props.setCurrentScreen}/>
      <section>
        <div className="columns">
          <div className="column is-2 has-background-light CS-has-padding-2">
            <Aside IP={props.IP}/>
          </div>
          <div className="column">
            <div className="container CS-has-padding-1">
              <Switch>
                <Route path="/Facturen">
                  <Facturen />
                </Route>
                <Route path="/Domains">
                  <Domains IP={props.IP} />
                </Route>
                <Route path="/Databases">
                  <Databases IP={props.IP} />
                </Route>
                <Route path="/Mailboxes">
                  <Mailboxes IP={props.IP} />
                </Route>
                <Route path="/">
                  <Dashboard IP={props.IP} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </Router>
  );
}
export default Index;
