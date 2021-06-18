import React from "react"; //useEffect useState
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/**
 * Makes the header and returns it.
 *
 * @author Robert Boudewijn
 * @date 2021/01/20
 * @param {*} props
 * @return {JSX} JSX
 */
function Header(props) {
  /**
   *  This function logges the current user out.
   *  @author Robert Boudewijn
   *  @date 2020-01-17
   *  @async
   */
  async function logOut() {
    let request = await fetch(props.IP + "session.php", {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (request.status === 200) {
      props.setCurrentScreen("login");
    } else {
      alert("Something went wrong. Try again later.");
    }
  }

  return (
    <nav
      className="navbar has-background-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="images/logo.png" width={112} height={28} alt="logo" />
        </a>
        {/*https://bulma.io/images/bulma-logo.png */}
        <button
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <a
            className="navbar-item"
            href="https://webmail.foxels.nl/"
            target="_blank"
            rel="noreferrer"
          >
            Email
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a href="/" className="navbar-link">
              More
            </a>
            <div className="navbar-dropdown">
              <a href="/" className="navbar-item">
                About
              </a>
              <a href="/" className="navbar-item">
                Jobs
              </a>
              <a href="/" className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider" />
              <a
                href="Mailto:robert@robertboudewijn.nl?subject=FoxManage_Issue"
                className="navbar-item"
              >
                Report an issue
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-info is-light is-outlined" onClick={() => logOut()}>
                <strong>Logout</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Header;
