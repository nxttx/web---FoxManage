const fetch = require("node-fetch");
let fetchCookies = () => { };
const Tools = require('../Tools');
let IP = "http://Localhost/a_routes/session.php";

describe("Session route test", () => {
  beforeAll(async () => {
  });

  beforeEach(async () => {
    //--Clearing cookies----
    const nodeFetch = require('node-fetch')
    fetchCookies = require('fetch-cookie/node-fetch')(nodeFetch)
    //--Clearing cookies----

    // await new Promise((resolve) => tools.clearDatabase(resolve));
    await Tools.clearDatabase();

  });

  afterEach(async () => {
  });

  describe("Method: Delete", () => {
    test("Happy flow", async () => {
      const request = await fetch(IP, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors',
        // cache: 'no-cache',
        // credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
      expect(request.status).toEqual(200);
    });
  });
  describe("Method: Post", () => {
    test("Happy flow", async () => {
      const request = await fetch(IP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: "username=Test&password=Test1234",
      })
      expect(request.status).toEqual(200);

    });
    test("Alternative flow ~ Wrong password", async () => {
      const request = await fetch(IP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: "username=Test&password=Test1222",
      })
      expect(request.status).toEqual(400);
    });
    test("Alternative flow ~ Wrong username", async () => {
      const request = await fetch(IP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: "username=Tes&password=Test1234",
      })
      expect(request.status).toEqual(400);
    });
    test("Alternative flow ~ Password too Short ", async () => {
      const request = await fetch(IP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: "username=Test&password=Test",
      })
      expect(request.status).toEqual(400);
    });
    test("Alternative flow ~ Username not defined ", async () => {
      const request = await fetch(IP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: "password=Test",
      })
      expect(request.status).toEqual(400);
    });
  });
  describe("Method: GET", () => {
    test("Happy flow", async () => {
      const prep = await fetchCookies(IP, {
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
      expect(response).toEqual({ login: true });
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
