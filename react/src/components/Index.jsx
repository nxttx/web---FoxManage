import React, { useState } from 'react'; //useEffect 
import Header from './includes/Header';
import Aside from './includes/Aside';
import Footer from './includes/Footer';
import Dashboard from "./pages/Dashboard";


function Index(props) {
  const [currentPage, setCurrentPage] = useState("dashboard");


  function router() {
    switch (currentPage) {
      case "dashboard":
        return (<Dashboard IP={props.IP}></Dashboard>);
      default:
        break;
    }
  }

  return (<>
    <Header IP={props.IP} setCurrentScreen={props.setCurrentScreen}></Header>
    <section>
      <div className="columns">
        <div className="column is-2 has-background-light CS-has-padding-left-2 CS-has-padding-top-2 CS-has-padding-bottom-2">
          <Aside IP={props.IP}></Aside>
        </div>
        <div className="column">
          <div className="container CS-has-padding-left-1">
            {router()}
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </>
  );
}
export default Index;