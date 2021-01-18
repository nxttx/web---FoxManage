/*
GLOBAL VARS:
 */
const IP = "http://localhost/a_routes/"; //test local
// const IP = "http://192.168.2.12/a_routes/"; //test for mobile

/*
GLOBAL EVENT LISTENERS
 */
window.addEventListener('load', (event) => {
    getUsedData();
    if (window.location.pathname === "/index.php" || window.location.pathname === "/") {
        getDomains();
        getDatabases();
    }
});


/*
FUNCTIONS
 */

/**
 *  This function handles the login button in index.
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @async
 *  @params None
 *  @return None
 */
async function logIn(e) {
    console.log(e)
    e.preventDefault()
    const USERNAME = document.getElementById("username").value;
    const PASSWORD = document.getElementById("password").value;
    let loginbutton = document.getElementById("LoginButton");
    if (PASSWORD.length >= 8) {
        loginbutton.className = "button is-block is-primary is-fullwidth is-loading";
        let request = await fetch(IP + "login.php",
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                // mode: 'cors',
                // cache: 'no-cache',
                // credentials: 'same-origin',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: "username=" + USERNAME + "&password=" + PASSWORD,
            }
        );
        if (request.status === 200) {
            loginbutton.className = "button is-block is-success is-fullwidth";
            window.location.reload();
        } else if (request.status === 500) {
            document.getElementById("infoBox").innerText = "There was an error."
            loginbutton.className = "button is-block is-primary is-fullwidth";
        } else {
            document.getElementById("infoBox").innerText = "Account not found or incorrect password."
            document.getElementById("infoBox").className = "title has-text-danger is-5";
            loginbutton.className = "button is-block is-danger is-fullwidth";
        }
    } else {
        document.getElementById("infoBox").innerText = "Password must be longer than 7 characters."
        document.getElementById("infoBox").className = "title has-text-danger is-5";
        document.getElementById("password").className = "input is-danger";
    }

}

/**
 *  This function logges the current user out.
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @async
 *  @params None
 *  @return None
 */
async function logOut() {
    let request = await fetch(IP + "logout.php",
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors',
            // cache: 'no-cache',
            // credentials: 'same-origin',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }
    );
    if (request.status === 200) {
        window.location.reload();
    } else {
        alert("Something went wrong. Try again later.")
    }
}

/**
 *  This functions gets the used data of the user.
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @async
 *  @params None
 *  @return None
 */
async function getUsedData() {
    let request = await fetch(IP + "getUsedData.php",
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors',
            // cache: 'no-cache',
            // credentials: 'same-origin',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }
    );
    if (request.status === 200) {
        let response = await request.json();
        document.getElementById("usedDataText").innerText = response.usedDirSize + " / " + response.maxDirSize + " MB";
        document.getElementById("usedDataSlider").max = response.maxDirSize;
        document.getElementById("usedDataSlider").value = response.usedDirSize;

        let percentage = response.usedDirSize / response.maxDirSize * 100;
        if (percentage > 90) {
            document.getElementById("usedDataSlider").className = "progress is-danger";

        } else if (percentage > 75) {
            document.getElementById("usedDataSlider").className = "progress is-warning";
        }

        if (window.location.pathname === "/index.php" || window.location.pathname === "/") {
            loadChart(response);
        }

    } else if (request.status === 401) {
        //nothing user is not logged on so...
    } else {
        document.getElementById("usedDataSlider").value = 100;
        document.getElementById("usedDataSlider").className = "progress";
        document.getElementById("usedDataText").innerText = "Request error.";
    }
}

/**
 *  This functions builds the chart in dashboard.
 *  @author Robert Boudewijn
 *  @date 2020-01-18
 *  @async
 *  @params {Object} {usedDirSize, maxDirSize, folderUsedDirSize}
 *  @return None
 */
async function loadChart(response) {
    google.charts.load("current", {"packages": ["corechart"]});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        let data = google.visualization.arrayToDataTable([
            ["Type", "amount"],
            ["Database", response.usedDirSize - response.folderUsedDirSize],
            ["storage", response.folderUsedDirSize],
            ["free", response.maxDirSize - response.usedDirSize]
        ]);

        let options = {
            title: "Storage",
            sliceVisibilityThreshold: .00000001, //this makes sure that all slices are visible
        };

        let chart = new google.visualization.PieChart(document.getElementById("piechart"));

        chart.draw(data, options);
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
    let request = await fetch(IP + "getUserDomains.php",
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors',
            // cache: 'no-cache',
            // credentials: 'same-origin',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }
    );
    if (request.status === 200) {
        let response = await request.json();

        let list = "";
        //handle data
        response.forEach(domain => {
            list += '<li>' + domain + '</li>';
        })

        document.getElementById("domains").innerHTML =list;


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
    let request = await fetch(IP + "getUserDatabases.php",
        {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors',
            // cache: 'no-cache',
            // credentials: 'same-origin',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        }
    );
    if (request.status === 200) {
        let response = await request.json();
        console.log(response);
        let list = "";
        //handle data
        response.forEach(database => {
            list += '<li>' + database + '</li>';
        })

        document.getElementById("databases").innerHTML =list;


    } else if (request.status === 401) {
        //nothing user is not logged on so...
    } else {
        //error
    }
}