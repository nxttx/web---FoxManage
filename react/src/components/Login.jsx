import React, { useState, useEffect } from 'react';

/**
 * This function handles the login page. 
 *
 * @author Robert Boudewijn
 * @date 2021/01/20
 * @param {*} props
 * @return {*} 
 */
function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginbutton, setloginbutton] = useState("button is-block is-primary is-fullwidth");
  const [infoBox, setInfoBox] = useState("Please enter your email and password.");
  const [infoBoxClassName, setInfoBoxClassName] = useState("title has-text-grey is-5");
  const [passwordClassName, setPasswordClassName] = useState("input");

  useEffect(() => {
    /**
       *  Checks if the user is allready logged on.
       *  @author Robert Boudewijn
       *  @date 2020-01-19
       *  @async
       *  @params None
       *  @return None
       */
    async function getLoggedInState() {
      let request = await fetch(props.IP + "session.php",
        {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          // mode: 'cors',
          // cache: 'no-cache',
          // credentials: 'same-origin',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
        }
      );
      if (request.status === 200) {
        props.setCurrentScreen("index");
      } else if (request.status === 401) {
        //nothing user is not logged on so...
      }
    }
    getLoggedInState();
  }, [props]);



  /**
   * Handle username change. 
   *
   * @author Robert Boudewijn
   * @date 2021/01/20
   * @param {*} e
   */
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  /**
   * Handle password change.
   *
   * @author Robert Boudewijn
   * @date 2021/01/20
   * @param {*} e
   */
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  /**
   *This function handles a submit of the form. And makes a fetch request to the server to authenticate.
   *
   * @author Robert Boudewijn
   * @date 2021/01/20
   * @param {*} e
   */
  async function handleSubmit(e) {
    e.preventDefault()

    if (password.length >= 8) {
      setloginbutton("button is-block is-primary is-fullwidth is-loading");
      try {
        let request = await fetch(props.IP + "session.php", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: "username=" + username + "&password=" + password,
        }
        );
        console.log(request)
        if (request.status === 200) {
          setloginbutton("button is-block is-success is-fullwidth");
          props.setCurrentScreen("index");
        } else if (request.status === 500) {
          setInfoBox("There was an error.");
          setloginbutton("button is-block is-primary is-fullwidth");
        } else {
          setInfoBox("Account not found or incorrect password.");
          setInfoBoxClassName("title has-text-danger is-5");
          setloginbutton("button is-block is-danger is-fullwidth");
        }
      } catch (e) {
        console.log(e)
        setInfoBox("There was an error.");
        setloginbutton("button is-block is-primary is-fullwidth");
      }
    } else {
      setInfoBox("Password must be longer than 7 characters.");
      setInfoBoxClassName("title has-text-danger is-5");
      setPasswordClassName("input is-danger");
    }

  }

  return (
    <div className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column" />
            <div className="column is-4 has-text-centered">
              <h3 className="title has-text-white">Login</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-white">Login to your manager</p>
              <div className="box">
                <div className={infoBoxClassName}>{infoBox}</div>
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label has-text-left" htmlFor="username">Username</label>
                    <div className="control has-icons-left">
                      <input autoFocus className="input" id="username" placeholder="Username" type="text" value={username} onChange={handleUsernameChange} />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label has-text-left" htmlFor="password">Password</label>
                    <div className="control has-icons-left">
                      <input className={passwordClassName} id="password" placeholder="Password" type="password" value={password} onChange={handlePasswordChange} />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock" />
                      </span>
                    </div>
                  </div>
                  <button id="LoginButton" className={loginbutton} >Login</button>
                </form>
              </div>
              <p className="has-text-grey">
                <a href="/" >Sign Up</a> &nbsp;·&nbsp;
                <a href="/">Forgot Password</a> &nbsp;·&nbsp;
                <a href="/">Need Help?</a>
              </p>
            </div>
            <div className="column" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;