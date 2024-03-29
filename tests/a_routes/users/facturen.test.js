const fetch = require("node-fetch");
let fetchCookies = () => { };
const Tools = require('../../Tools');
let IP = "http://Localhost/a_routes/users/facturen.php";

describe("users/facturen route test", () => {
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
      let equal = [{ "IDEAl": "", "date": "2021-02-05 15:27:15", "id": "2021-003", "payed": "0", "products": [{ "amount": "1", "price": "50.25", "productname": "FoxManage 3 uur" }, { "amount": "1", "price": "25.00", "productname": "Webhosting 1 jaar" }], "userinfo": { "adress": "Wall St", "city": "New York", "country": "United States of America", "firstName": "Test", "lastName": "Test", "number": "57", "zipcode": "NY 10005" } }]
      const request = await fetchCookies(IP, {
        method: 'GET',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      expect(request.status).toEqual(200);
      let response = await request.json();
      expect(response).toEqual(equal);
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
