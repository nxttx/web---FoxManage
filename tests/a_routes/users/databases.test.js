const fetch = require("node-fetch");
let fetchCookies = () => { };
const Tools = require('../../Tools');
let IP = "http://Localhost/a_routes/users/databases.php";

describe("users/databases route test", () => {
  beforeAll(async () => {
  });

  beforeEach(async () => {
    //--Clearing cookies----
    const nodeFetch = require('node-fetch')
    fetchCookies = require('fetch-cookie/node-fetch')(nodeFetch)
    //--Clearing cookies----

    await Tools.clearDatabase();

  });

  afterEach(async () => {
  });

  describe("Method: GET", () => {
    test("Happy flow", async () => {
      //login
      const prep = await fetchCookies("http://Localhost/a_routes/session.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: "username=Test&password=Test1234",
      })

      const request = await fetchCookies(IP, {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      expect(request.status).toEqual(200);
      let response = await request.json();
      expect(response).toEqual(["Database1", "Database2"]);
    });

    test("Alternative flow ~ not signed in", async () => {
      const request = await fetch(IP, {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      expect(request.status).toEqual(401);
      let response = await request.json();
      expect(response).toEqual({ login: false });
    });
  });
});
