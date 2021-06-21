import React, { useState } from "react";
import { IP } from "../../GLOBALVAR";

function AddDatabaseModal(props) {
  const [newDatabaseName, setNewDatabaseName] = useState("");
  const [forbiddenItem, setForbiddenItem] = useState(false);
  const [safeBlocked, setsafeBlocked] = useState(true);
  const forbiddenList = [
    ";",
    "select",
    "drop",
    "alter",
    "delete",
    "update",
    "create",
    " ",
  ];

  function forbiddenItemCheck(){
    if (forbiddenItem) {
      return (
          <div className="notification is-warning">
            <p>
              De naam van uw nieuwe database mag niet langer dan 50 tekens zijn en mag de volgende karaters of
              woorden <b>niet</b> bevatten:
            </p>
            <ul className="columns is-flex-wrap-wrap">
              {forbiddenList.map((item) => {
                if (item === " ") {
                  return <li className="column is-3" key={"spatie"}>spatie</li>;
                }
                return <li className="column is-3" key={item}>"{item}"</li>;
              })}
            </ul>
          </div>
      );
    }
  }

  /**
   * Handle database name change.
   *
   * @author Robert Boudewijn
   * @date 2021/01/20
   * @param {*} e
   */
  function handleNewDatabaseNameChange(e) {
    let value = e.target.value;
    setNewDatabaseName(value);
    setForbiddenItem(false);

    if(value.length < 1 || value.length > 50){
      setsafeBlocked(true);
      setForbiddenItem(true);
    }else{
      setsafeBlocked(false);
    }

    forbiddenList.forEach(element=>{
      if(value.toLowerCase().includes(element)){
        setForbiddenItem(true);
        setsafeBlocked(true);
      }
    })

  }

  function cancel() {
    setNewDatabaseName("");
    setForbiddenItem(false);
    setsafeBlocked(true);
    props.setModalActive(false);
  }

  async function safeRoute() {
    let request = await fetch(IP + "databases.php?name=" + newDatabaseName, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors',
      // cache: 'no-cache',
      // credentials: 'same-origin',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    if (request.status === 201) {
      cancel();
      props.refreshDatabasesList();
    }
  }

  return (
    <div className={props.modalActive ? "modal is-active" : "modal"}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Nieuwe database</p>
          <button className="delete" aria-label="close" onClick={cancel} />
        </header>
        <section className="modal-card-body">
          <div className="content">
            {forbiddenItemCheck()}
            <div className="field">
              <label className="label has-text-left" htmlFor="username">
                Database naam
              </label>
            <input
              autoFocus
              className="input"
              id="newDatabaseName"
              placeholder="Database naam"
              type="text"
              value={newDatabaseName}
              onChange={handleNewDatabaseNameChange}
            />
          </div>
          </div>
        </section>
        <footer className="modal-card-foot columns">
          <div className="column" />
          <div className="column is-5">
            <div className="buttons">
              <button
                className="button is-small is-danger is-outlined"
                onClick={cancel}
              >
                <span className="icon is-small">
                  <i className="fas fa-times" />
                </span>
                <span>Annuleer</span>
              </button>
              <button
                className="button is-small is-success"
                onClick={safeRoute}
                disabled={safeBlocked}
              >
                <span className="icon is-small">
                  <i className="fas fa-plus" />
                </span>
                <span>Nieuwe opslaan</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AddDatabaseModal;
