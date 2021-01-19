import React, { } from 'react'; //useEffect useState

function Dashboard(props) {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    return (
        <>
            <h1 className="title">Dashboard</h1>
            <div className="columns">
                <div className="column">
                    <h2 className="subtitle">Domains:</h2>
                    <div className="content">
                        <ul id="domains">
                            <li>Domain 1</li>
                            <li>Domain 2</li>
                            <li>Domain 3</li>
                        </ul>
                    </div>
                    <h2 className="subtitle">Databases:</h2>
                    <div className="content">
                        <ul id="databases">
                            <li>Database 1</li>
                            <li>Database 2</li>
                            <li>Database 3</li>
                        </ul>
                    </div>
                </div>
                <div className="column is-5-desktop ">
                    <div id="piechart" />
                </div>
            </div>
        </>

    );
}
export default Dashboard;