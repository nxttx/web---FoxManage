import React, { useState, useEffect } from 'react'; // 
// eslint-disable-next-line
import { BrowserRouter as  Router, Switch, Route, Link } from "react-router-dom";

function Aside(props) {
    const [usedDataText, setUsedDataText] = useState("Loading...");
    const [usedDataSliderValue, setUsedDataSliderValue] = useState("");
    const [usedDataSliderMax, setUsedDataSliderMax] = useState(100);
    const [usedDataSliderClass, setUsedDataSliderClass] = useState("progress is-primary");


    useEffect(()=>{
        /**
     *  This functions gets the used data of the user.
     *  @author Robert Boudewijn
     *  @date 2020-01-17
     *  @async
     *  @params None
     *  @return None
     */
    async function getUsedData() {
        let request = await fetch(props.IP + "getUsedData.php",
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
            let response = await request.json();
            setUsedDataText(response.usedDirSize + " / " + response.maxDirSize + " MB");
            setUsedDataSliderMax(response.maxDirSize);
            setUsedDataSliderValue(response.usedDirSize);

            let percentage = response.usedDirSize / response.maxDirSize * 100;
            if (percentage > 90) {
                setUsedDataSliderClass("progress is-danger");

            } else if (percentage > 75) {
                setUsedDataSliderClass("progress is-warning");
            }

        } else if (request.status === 401) {
            //nothing user is not logged on so...
        } else {
            setUsedDataSliderValue(100);
            setUsedDataSliderClass("progress");
            setUsedDataText("Request error.");
        }
    }
        getUsedData();
    },[props.IP]);


    

    /**
     *  Returns the correct progress component
     *
     * @author Robert Boudewijn
     * @date 2021/01/19
     * @return {JSX} 
     */
    function dataSlider() {
        if (usedDataSliderValue !== "") {
            return <progress id="usedDataSlider" className={usedDataSliderClass} max={usedDataSliderMax} value={usedDataSliderValue} />
        } else {
            return <progress id="usedDataSlider" className={usedDataSliderClass} max={usedDataSliderMax} />
        }
    }

    return (

        <aside className="menu">
            <p className="menu-label">
                General
            </p>
            <ul className="menu-list">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/Domains">Domains</Link></li>
                <li><Link to="/Databases">Databases</Link></li>
            </ul>
            <p className="menu-label">
                Data
            </p>
            {dataSlider()}
            <p id="usedDataText">{usedDataText}</p>
        </aside>

    );
}
export default Aside;