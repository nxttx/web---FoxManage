const clearDatabase = () => {
  return new Promise((resolve, reject) => {
    const mysql = require('mysql');

    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "TEST_foxmanage"
    });

    connection.connect(function (err) {
      if (err) throw err;


      connection.query("DELETE FROM domains", function (err, result) {
        if (err) throw err;
      });

      connection.query("DELETE FROM userdatabases", function (err, result) {
        if (err) throw err;
      });

      connection.query("DELETE FROM usersadress", function (err, result) {
        if (err) throw err;
      });

      connection.query("DELETE FROM factuurproducten", function (err, result) {
        if (err) throw err;
      });

      connection.query("DELETE FROM Facturen", function (err, result) {
        if (err) throw err;
      });

      connection.query("DELETE FROM users", function (err, result) {
        if (err) throw err;
      });

      //Users   
      connection.query(
        "INSERT INTO users " +
        "(`id`,`username`, `email`, `password`, `maxDirSize`, `adminRights`, `subscription`, `registrationDate`, `changePassword`) " +
        "VALUES (1, 'Test', 'Test@test.org'," +
        " '4f717c77fe784bbe0bc35e368cee2cdace5e2eb0fba30eccd47972b546bbd5a7710d5ab1aea19f4d3e0d36a261e6339595a6a05a6f83a7463512497a3d92d0fc'," +
        " 220, 1, '-5.00', '2021-01-17', 0);"
        , function (err, result) {
          if (err) throw err;
        });

      //domains
      connection.query(
        "INSERT INTO `domains` (`id`, `user`, `domainName`) VALUES" +
        "(1, 1, 'domain1.org')," +
        "(2, 1, 'domain2.org')," +
        "(3, 1, 'domain3.org');"
        , function (err, result) {
          if (err) throw err;
        });

      //userdatabases 
      connection.query(
        "INSERT INTO `userdatabases` (`id`, `user`, `databaseName`) VALUES" +
        "(1, 1, 'Database1'), " +
        "(2, 1, 'Database2');"
        , function (err, result) {
          if (err) throw err;
        });

      //usersadress 
      connection.query(
        "INSERT INTO `usersadress` (`id`, `firstname`, `Lastname`, `adress`, `number`, `zipcode`, `city`, `country`) VALUES" +
        "(1, 'Test', 'Test', 'Wall St', '57', 'NY 10005', 'New York', 'United States of America');"
        , function (err, result) {
          if (err) throw err;
        });

      //facturen
      connection.query(
        "INSERT INTO `facturen` (`id`, `user`, `date`, `payed`, `IDEAL`) VALUES" +
        "('2021-003', 1, '2021-02-05 15:27:15', 0, '');"
        , function (err, result) {
          if (err) throw err;
        });

      //factuurproducten
      connection.query(
        "INSERT INTO `factuurproducten` (`id`, `factuurnummer`, `productname`, `amount`, `price`) VALUES" +
        "(1, '2021-003', 'FoxManage 3 uur', 1, '50.25')," +
        "(2, '2021-003', 'Webhosting 1 jaar', 1, '25.00');"
        , function (err, result) {
          if (err) throw err;
        });

      connection.end(() => { resolve(); });
    });
  })
}

module.exports = { clearDatabase } 
