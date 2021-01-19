import React, { useState, useEffect } from 'react';
import Chart from "react-google-charts";

function Dashboard(props) {
    const [usedData, setUsedData] = useState("");
    const [chart, setChart] = useState(<></>);
    const [domains , setDomains] = useState("");
    const [databases, setDatabases] = useState("");


    useEffect(() => {

    /**
     *  This functions gets the used data of the user.
     *  @author Robert Boudewijn
     *  @date 2020-01-19
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
            setUsedData(response);
        }
    }

    /**
     *  This function gets all domains of the current user.
     *  @author Robert Boudewijn
     *  @date 2020-01-18
     *  @async
     *  @params None
     *  @return None
     */
    async function getDomains() {
        let request = await fetch(props.IP + "getUserDomains.php",
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

            setDomains(response);


        } else if (request.status === 401) {
            //nothing user is not logged on so...
        } else {
            //error
        }
    }

    /**
     *  This function gets all domains of the current user.
     *  @author Robert Boudewijn
     *  @date 2020-01-18
     *  @async
     *  @params None
     *  @return None
     */
    async function getDatabases() {
        let request = await fetch(props.IP + "getUserDatabases.php",
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

            setDatabases(response);
        } else if (request.status === 401) {
            //nothing user is not logged on so...
        } else {
            //error
        }
    }

        getUsedData();
        getDomains();
        getDatabases();
    }, [props.IP])

    useEffect(() => {
        if (usedData !== "") {
            setChart(<Chart
                width={400}
                height={300}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ["Type", "Amount"],
                    ["Database", usedData.usedDirSize - usedData.folderUsedDirSize],
                    ["Storage", usedData.folderUsedDirSize],
                    ["Free", usedData.maxDirSize - usedData.usedDirSize]
                ]}
                options={{
                    title: 'Storage',
                    sliceVisibilityThreshold: .00000001, //this makes sure that all slices are visible
                }}
                rootProps={{ 'data-testid': '1' }}
            />)
        }
    },[usedData])


    function returnLi(liArray){
        if(typeof liArray === "object"){
            return liArray.map(Element => <li key={Element}>{Element}</li>)
        }else{
            return <li>Geen gevonden</li>
        }
    }

    return (
        <>
            <h1 className="title">Dashboard</h1>
            <div className="columns">
                <div className="column">
                    <h2 className="subtitle">Domains:</h2>
                    <div className="content">
                        <ul id="domains">
                        {returnLi(domains)}
                        </ul>
                    </div>
                    <h2 className="subtitle">Databases:</h2>
                    <div className="content">
                        <ul id="databases">
                            {returnLi(databases)}
                        </ul>
                    </div>
                </div>
                <div className="column is-5-desktop ">
                    {chart}
                </div>
            </div>
        </>

    );
}
export default Dashboard;