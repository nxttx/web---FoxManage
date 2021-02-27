import React, { useState, useEffect } from 'react';

function Domains(props) {
    const [domains , setDomains] = useState("");



    useEffect(() => {
    /**
     *  This function gets all domains of the current user.
     *  @author Robert Boudewijn
     *  @date 2020-01-18
     *  @async
     *  @params None
     *  @return None
     */
    async function getDomains() {
        let request = await fetch(props.IP + "users/domains.php",
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


        getDomains();
    }, [props.IP])


    return (
        <>
            <h1 className="title">Domains</h1>
            {domains}
        </>

    );
}
export default Domains;