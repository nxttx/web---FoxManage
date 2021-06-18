import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getFacturen } from "../../redux/actions";

function Facturen(props) {
  const [facturen, setFacturen] = useState("");
  const [currentfactuur, setCurrentfactuur] = useState(1);
  const [modalActive, setModalActive] = useState(false);

  //get data
  useEffect(() => {
    if (props.facturen === -1) {
      props.getFacturen();
    } else {
      setFacturen(props.facturen);
    } // eslint-disable-next-line
  }, [props.facturen]);

  /**
   * This function opens a new window with the supplied element and opens the print window
   *
   * @author Robert Boudewijn, dotancohen, Bill Paetzke
   * @date 2021/02/05
   * @param {*} elem
   * @param {*} title
   * @return {*}
   */
  function PrintElem(elem, title) {
    var mywindow = window.open("", "PRINT", "height=600,width=800");

    mywindow.document.write(
      "<html><head><title>" +
        document.title +
        '</title> <link rel="stylesheet" href="css/bulma.css"> <link rel="stylesheet" href="css/ccss.css"><script src="https://kit.fontawesome.com/ae33e372bf.js" crossorigin="anonymous"></script>'
    );
    mywindow.document.write("</head><body >");
    mywindow.document.write(
      '<section><div class="container CS-has-padding-left-3 CS-has-padding-right-3 CS-has-padding-top-3 "> <h1 class="title is-4">' +
        title +
        "</h1>"
    );
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write("</div></section></body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    // mywindow.close();

    return true;
  }

  /**
   * Genarates from a timpstamp a day-month-year, With the option to increase the month
   *
   * @author Robert Boudewijn
   * @date 2021/02/05
   * @param {String} timestamp
   * @param {number} [monthIncrease=0]
   * @return {String}
   */
  function getDate(timestamp, monthIncrease = 0) {
    if (facturen === "") {
      return <></>;
    }
    // Split timestamp into [ Y, M, D, h, m, s ]
    let t = timestamp.split(/[- :]/);

    // Apply each element to the Date function
    let d = new Date(
      Date.UTC(t[0], t[1] - 1 + monthIncrease, t[2], t[3], t[4], t[5])
    );
    let month = d.getMonth() + 1;

    return d.getDay() + "-" + month + "-" + d.getFullYear();
  }

  /**
   * Function that builds the table
   *
   * @author Robert Boudewijn
   * @date 2021/02/04
   * @return {*}
   */
  function table() {
    if (facturen === "") {
      return <h4 className="subtitle">Laden...</h4>;
    }
    function genTr() {
      let trs = facturen.map((element) => {
        return (
          <tr
            key={element.date}
            className={
              currentfactuur === element
                ? "is-selected is-clickable"
                : "is-clickable"
            }
            onClick={() => {
              setCurrentfactuur(element);
              setModalActive(true);
            }}
          >
            <td>{element.id}</td>
            <td>{getDate(element.date)}</td>
            <td>{element.payed === 1 ? "Ja" : "Nee"}</td>
          </tr>
        );
      });
      return trs;
    }
    return (
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th>
              <abbr title="Factuurnummer">Nr</abbr>
            </th>
            <th>
              <abbr title="date">Datum</abbr>
            </th>
            <th>
              <abbr title="payed">Betaald</abbr>
            </th>
          </tr>
        </thead>
        <tbody>{genTr()}</tbody>
      </table>
    );
  }

  /**
   * Functiopn that builds the modal-
   *
   * @author Robert Boudewijn
   * @date 2021/02/05
   * @return {*}
   */
  function modal() {
    if (facturen === "" || currentfactuur === 1) {
      return <></>;
    }
    let totalPrice = 0;
    function genFactuurTr() {
      let trs = currentfactuur.products.map((element) => {
        totalPrice += element.price * element.amount;
        return (
          <tr key={element.productname}>
            <td>{element.amount}</td>
            <td>{element.productname}</td>
            <td>&euro;{element.price.replace(".", ",")}</td>
            <td>
              &euro;
              {(element.price * element.amount).toFixed(2).replace(".", ",")}
            </td>
          </tr>
        );
      });
      return trs;
    }

    function genTotal() {
      return [
        <tr key="subtotaal">
          <th></th>
          <th>Subtotaal</th>
          <th></th>
          <th>&euro;{totalPrice.toFixed(2).replace(".", ",")}</th>
        </tr>,
        <tr key="btw">
          <th></th>
          <th>BTW</th>
          <th></th>
          <th></th>
        </tr>,
        <tr key="totaal">
          <th></th>
          <th>
            <b>Totaal te betalen voor: {getDate(currentfactuur.date, 1)} </b>
          </th>
          <th></th>
          <th>&euro;{totalPrice.toFixed(2).replace(".", ",")}</th>
        </tr>,
      ];
    }

    return (
      <div className={modalActive ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Factuur {currentfactuur.id}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                setModalActive(false);
                setCurrentfactuur(1);
              }}
            ></button>
          </header>
          <section className="modal-card-body" id="factuurbody">
            <div className="content">
              <div className="columns">
                <p className="column">
                  Dhr. of mw. {currentfactuur.userinfo.firstName}{" "}
                  {currentfactuur.userinfo.lastName} <br />
                  {currentfactuur.userinfo.adress}{" "}
                  {currentfactuur.userinfo.number}
                  <br />
                  {currentfactuur.userinfo.zipcode}{" "}
                  {currentfactuur.userinfo.city}
                  <br />
                  {currentfactuur.userinfo.country}
                </p>
                <div className="column" />
                <div className="column">
                  <p>
                    Robert Boudewijn <br />
                    Robert@robertboudewijn.nl
                    <br />
                    Paasberg 32
                  </p>

                  <p>{getDate(currentfactuur.date)}</p>
                </div>
              </div>
              <hr />
              <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                  <tr>
                    <th>Aantal</th>
                    <th>Beschrijving</th>
                    <th>Prijs per eenheid</th>
                    <th>Toaal</th>
                  </tr>
                </thead>
                <tbody>{genFactuurTr()}</tbody>
                <tfoot>{genTotal()}</tfoot>
              </table>
              <p>Bedankt voor uw bestelling.</p>
              <hr />
              <p>
                We verzoeken u vriendelijk het bovenstaande bedrag van &euro;
                {totalPrice.toFixed(2).replace(".", ",")} voor{" "}
                {getDate(currentfactuur.date, 1)} te voldoen op onze
                bankrekening NL59 INGB 0752 8624 21 ten name van Robert
                Boudewijn onder vermelding van “Factuurnr: {currentfactuur.id}”.
                Voor vragen kunt u contact opnemen per e-mail.
              </p>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() =>
                PrintElem("factuurbody", "Factuur nr: " + currentfactuur.id)
              }
            >
              Download
            </button>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="title">Facturen</h1>
      {modal()}
      {table()}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    facturen: state.facturen,
  };
};

export default connect(mapStateToProps, {
  getFacturen,
})(Facturen);
