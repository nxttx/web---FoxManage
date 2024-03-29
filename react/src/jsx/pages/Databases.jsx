import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDatabases } from "../../redux/actions";
import AddDatabaseModal from "../components/AddDatabaseModal";
import {IP} from "../../GLOBALVAR";

function Databases(props) {
  const databases = useSelector((state) => state.databases);
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    if (databases === -1) {
      dispatch(getDatabases());
    } // eslint-disable-next-line
  }, [databases]);

  function handleNew() {
    setModalActive(true);
  }

  function handleSQLDump() {
    alert(
      "We are sorry, but it seems like this feature is not implemented yet."
    );
  }

  function handleCopy() {
    alert(
      "We are sorry, but it seems like this feature is not implemented yet."
    );
  }

  async function handleDrop(name) {
    if (window.confirm('Weet je zeker dat je '+name+' wilt verwijderen?')) {
      let request = await fetch(IP + "databases.php?name=" + name, {
        method: "delete", // *GET, POST, PUT, DELETE, etc.
        mode: 'cors',
        // cache: 'no-cache',
        // credentials: 'same-origin',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      if (request.status === 200) {
        alert("Database verwijderd!");
      }
      dispatch(getDatabases());
    }
  }

  function renderDataBases() {
    if (databases !== -1) {
      let thead = (
        <thead>
          <tr>
            <th>Naam</th>
            <th>Sql-dump</th>
            <th>Kopieer</th>
            <th>Drop database</th>
          </tr>
        </thead>
      );
      let tbody = (
        <tbody>
          {databases.map((db) => (
            <tr key={db}>
              <th>{db}</th>
              <th>
                <button
                  className="button is-small is-info is-light is-outlined"
                  onClick={handleSQLDump}
                >
                  <span className="icon is-small">
                    <i className="fas fa-download" />
                  </span>
                  <span>Download</span>
                </button>
              </th>
              <th>
                <button
                  className="button is-small is-info is-light is-outlined"
                  onClick={handleCopy}
                >
                  <span className="icon is-small">
                    <i className="fas fa-copy" />
                  </span>
                  <span>Kopieer en hernoem</span>
                </button>
              </th>
              <th>
                <button
                  className="button is-small is-danger is-outlined"
                  onClick={()=>handleDrop(db)}
                >
                  <span className="icon is-small">
                    <i className="fas fa-times" />
                  </span>
                  <span>Verwijder</span>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      );
      return (
        <table className="table is-hoverable ">
          {thead}
          {tbody}
        </table>
      );
    }
  }

  return (
    <>
      <AddDatabaseModal
        modalActive={modalActive}
        setModalActive={setModalActive}
        refreshDatabasesList={()=>dispatch(getDatabases())}
      />
      <h1 className="title">Databases</h1>
      <p>Hier kunt u nieuwe databases maken of bestaande databases beheren.</p>
      <br />
      <button className="button is-small is-success" onClick={handleNew}>
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Nieuwe database</span>
      </button>
      <br />
      <br />

      {renderDataBases()}
    </>
  );
}

export default Databases;
