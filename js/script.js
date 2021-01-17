/*
GLOBAL VARS:
 */
const IP = "http://localhost/a_routes/";

/*
Functions
 */

/**
 *  This function handles the login button in index.
 *  @author Robert Boudewijn
 *  @date 2020-01-17
 *  @async
 *  @params None
 *  @return None
 */
async function login(){
    const USERNAME = document.getElementById("username").value;
    const PASSWORD = document.getElementById("password").value;

    console.log(USERNAME, PASSWORD)
    let request = await fetch(IP+"login.php",
    {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors',
        // cache: 'no-cache',
        // credentials: 'same-origin',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: "username="+USERNAME+"&password="+PASSWORD,
    }
    );

    console.log(await request.text());
    console.log(request.status);

}