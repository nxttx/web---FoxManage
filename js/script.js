/*
GLOBAL VARS:
 */
const IP = "http://localhost/a_routes/";

/*
GLOBAL EVENT LISTENERS
 */
window.addEventListener('load', (event) => {
    getUsedData();
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
async function logIn() {
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
        console.log(typeof response)
        document.getElementById("usedDataText").innerText = response.usedDirSize + " / " + response.maxDirSize + " MB";
        document.getElementById("usedDataSlider").max = response.maxDirSize;
        document.getElementById("usedDataSlider").value = response.usedDirSize;
        let percentage = response.usedDirSize / response.maxDirSize * 100;
        if (percentage > 90) {
            document.getElementById("usedDataSlider").className = "progress is-danger";
        } else if (percentage > 75) {
            document.getElementById("usedDataSlider").className = "progress is-warning";
        }
    } else {
        let x = await request.text();
        console.log(x)
        document.getElementById("usedDataSlider").value = 100;
        document.getElementById("usedDataSlider").className = "progress";
        document.getElementById("usedDataText").innerText = "Request error.";
    }
}

