import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getDomains, getDatabases } from "../../redux/actions";
import Chart from "react-google-charts";

function Dashboard(props) {
    const [chart, setChart] = useState(<></>);
    const [domains , setDomains] = useState("");
    const [databases, setDatabases] = useState("");

    //Set chart
    useEffect(() => {
        if (props.usedData !== "") {
            setChart(<Chart
                width={400}
                height={300}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ["Type", "Amount"],
                    ["Database", props.usedData.usedDirSize - props.usedData.folderUsedDirSize],
                    ["Storage", props.usedData.folderUsedDirSize],
                    ["Free", props.usedData.maxDirSize - props.usedData.usedDirSize]
                ]}
                options={{
                    title: 'Storage',
                    sliceVisibilityThreshold: .00000001, //this makes sure that all slices are visible
                }}
                rootProps={{ 'data-testid': '1' }}
            />)
        }
    },[props.usedData])

    //set domains
    useEffect(() => {
        if (props.domains === "no Data") {
            props.getDomains()
        }else{
        setDomains(props.domains)
        }// eslint-disable-next-line
    }, [props.domains])

    //set databases
    useEffect(() => {
        if (props.databases === "no Data") {
            props.getDatabases()
        }else{
        setDatabases(props.databases)
        }// eslint-disable-next-line
    }, [props.databases])



    /**
     * Makes from an array a set of li's 
     *
     * @author Robert Boudewijn
     * @date 2021/02/04
     * @param {*} liArray
     * @return {*} jsx 
     */
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

const mapStateToProps = state => {
    return { 
        usedData: state.usedData,
        domains: state.domains,
        databases: state.databases
    };
  };

  export default connect(
    mapStateToProps,
    { 
        getDomains,
        getDatabases
     }
  )(Dashboard);
  