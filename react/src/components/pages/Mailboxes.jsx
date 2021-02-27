import React, { useState, useEffect } from 'react';

function Mailboxes(props) {
    const [databases, setDatabases] = useState("");


    useEffect(() => {

    /**
     *  This function gets all domains of the current user.
     *  @author Robert Boudewijn
     *  @date 2020-01-18
     *  @async
     *  @params None
     *  @return None
     */
    async function getDatabases() {
        let request = await fetch(props.IP + "users/databases.php",
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
        getDatabases();
    }, [props.IP])

    
    return (
        <>
            <h1 className="title">Databases</h1>
            {databases}
        </>

    );
}
export default Mailboxes;