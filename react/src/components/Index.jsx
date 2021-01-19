import React from 'react'; //useEffect 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './includes/Header';
import Aside from './includes/Aside';
import Footer from './includes/Footer';
import Dashboard from './pages/Dashboard';
import Databases from './pages/Databases';
import Domains from './pages/Domains';
import Mailboxes from './pages/Mailboxes';


function Index(props) {
  return (
    <Router>
      <Header IP={props.IP} setCurrentScreen={props.setCurrentScreen} ></Header>
      <section>
        <div className="columns">
          <div className="column is-2 has-background-light CS-has-padding-left-2 CS-has-padding-top-2 CS-has-padding-bottom-2">
            <Aside IP={props.IP}></Aside>
          </div>
          <div className="column">
            <div className="container CS-has-padding-left-1">
              <Switch>
                <Route path="/Domains">
                  <Domains
                    IP={props.IP}
                    />
                </Route>
                <Route path="/Databases">
                  <Databases
                    IP={props.IP}
                    />
                </Route>
                <Route path="/Mailboxes">
                  <Mailboxes
                    IP={props.IP}
                  />
                </Route>
                <Route path="/">
                  <Dashboard
                    IP={props.IP}
                  />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </Router>
  );
}
export default Index;