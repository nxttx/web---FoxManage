import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getFacturen } from "../../redux/actions";

function Facturen(props) {
    const [facturen, setFacturen] = useState("");
    const [currentfactuur, setCurrentfactuur] = useState(1);
    const [modalActive, setModalActive] = useState(false);

    //get data
    useEffect(() => {
        if (props.facturen === "no Data") {
            props.getFacturen()
        } else {
            setFacturen(props.facturen)
        }// eslint-disable-next-line
    }, [props.facturen])


    function PrintElem(elem, title) {
        var mywindow = window.open('', 'PRINT', 'height=600,width=800');

        mywindow.document.write('<html><head><title>' + document.title + '</title> <link rel="stylesheet" href="css/bulma.css"> <link rel="stylesheet" href="css/ccss.css"><script src="https://kit.fontawesome.com/ae33e372bf.js" crossorigin="anonymous"></script>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1 class="title is-4">' + title + '</h1>');
        mywindow.document.write(document.getElementById(elem).innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        // mywindow.close();

        return true;
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
            return <h4 className="subtitle">Laden...</h4>
        }
        function genTr() {
            let trs = facturen.map(element => {
                console.log(element)
                return (
                    <tr
                        key={element.date}
                        className={(currentfactuur === element) ? "is-selected is-clickable" : "is-clickable"}
                        onClick={() => {
                            setCurrentfactuur(element)
                            setModalActive(true)
                        }}
                    >
                        <td>{element.id}</td>
                        <td>{element.date}</td>
                        <td>{(element.payed === 1) ? "Ja" : "Nee"}</td>
                    </tr>)
            })
            return trs
        }
        return (<table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th><abbr title="Factuurnummer">Nr</abbr></th>
                        <th><abbr title="date">Datum</abbr></th>
                        <th><abbr title="payed">Betaald</abbr></th>
                    </tr>
                </thead>
                <tbody>
                    {genTr()}
                </tbody>
            </table>)
    }

    function modal() {
        if (facturen === "" || currentfactuur == 1) {
            return <></>
        }
        return (
            <div className={(modalActive) ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Factuur {currentfactuur.id}</p>
                        <button className="delete" aria-label="close" onClick={() => { setModalActive(false); setCurrentfactuur(1) }}></button>
                    </header>
                    <section className="modal-card-body" id="factuurbody">
                        <div className="content">
                            <p>Robert Boudewijn <br />Robert@robertboudewijn.nl<br />Paasberg 32</p>
                            <hr />
                            <p>{currentfactuur.date}</p>
                            <hr />
                            <p>Dhr. of mw. {currentfactuur.userinfo.firstName} {currentfactuur.userinfo.lastName} <br />
                                {currentfactuur.userinfo.adress} {currentfactuur.userinfo.number}<br />
                                {currentfactuur.userinfo.zipcode}, {currentfactuur.userinfo.city}<br />
                                {currentfactuur.userinfo.country}
                            </p>
                            <hr />
                            <p>Mooie tabel :)</p>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={() => PrintElem("factuurbody", "Factuur "+currentfactuur.id)}>Download</button>
                    </footer>
                </div>
            </div>)
    }



    return (
        <>
            <h1 className="title">Facturen</h1>
            {modal()}
            {table()}
        </>

    );
}

const mapStateToProps = state => {
    return {
        facturen: state.facturen
    };
};

export default connect(
    mapStateToProps,
    {
        getFacturen
    }
)(Facturen);
