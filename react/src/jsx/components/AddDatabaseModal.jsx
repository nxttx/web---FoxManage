import React, { useState } from "react";

function AddDatabaseModal(props) {
  const [newDatabaseName, setNewDatabaseName] = useState("");

  /**
   * Handle database name change.
   *
   * @author Robert Boudewijn
   * @date 2021/01/20
   * @param {*} e
   */
  function handleNewDatabaseNameChange(e) {
    setNewDatabaseName(e.target.value);
  }

  return (
    <div className={props.modalActive ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Nieuwe database</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              props.setModalActive(false);
            }}
          ></button>
        </header>
        <section className="modal-card-body" id="factuurbody">
          <div className="content">
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
        </section>
        <footer className="modal-card-foot columns">
          <div className="column" />
          <div className="column is-5">
            <div className="buttons">
              <button
                className="button is-small is-danger is-outlined"
                onClick={() => props.setModalActive(false)}
              >
                <span className="icon is-small">
                  <i className="fas fa-times" />
                </span>
                <span>Annuleer</span>
              </button>
              <button className="button is-small is-success" onClick={() => {}}>
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
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
