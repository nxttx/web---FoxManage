
const clearDatabase = () => {
  return new Promise((resolve, reject) =>{
    const mysql = require('mysql');

    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "TEST_foxmanage"
    });
  
    connection.connect(function (err) {
      if (err) throw err;
  
      connection.query("DELETE FROM users", function (err, result) {
        if (err) throw err;
      });
  
      connection.query("INSERT INTO users " +
        "(`username`, `email`, `password`, `maxDirSize`, `adminRights`, `subscription`, `registrationDate`, `changePassword`) " +
        "VALUES ('Test', 'Test@test.org'," +
        " '4f717c77fe784bbe0bc35e368cee2cdace5e2eb0fba30eccd47972b546bbd5a7710d5ab1aea19f4d3e0d36a261e6339595a6a05a6f83a7463512497a3d92d0fc'," +
        " 220, 1, '-5.00', '2021-01-17', 0);"
        , function (err, result) {
          if (err) throw err;
        });
  
      connection.end(()=>{resolve();});
    });
  })
  

  

}

module.exports = { clearDatabase } 
