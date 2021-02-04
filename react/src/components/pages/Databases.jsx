import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getDatabases } from "../../redux/actions";

function Databases(props) {
    const [databases, setDatabases] = useState("");
    console.log(props)


    useEffect(() => {
        if (props.databases === "no Data") {
            props.getDatabases()
        }else{
        setDatabases(props.databases)
        }
    }, [props.databases])


    return (
        <>
            <h1 className="title">Databases</h1>
            {databases}
        </>

    );
}

const mapStateToProps = state => {
    return {
        databases: state.databases
    };
};

export default connect(
    mapStateToProps,
    {
        getDatabases
    }
)(Databases);
