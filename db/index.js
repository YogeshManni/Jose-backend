var pg = require("pg");
module.exports = class appDb {
  constructor() {
    this.db = new pg.Client({
      user: "btpzjacj",
      database: "btpzjacj",
      password: "cPQEkHAETDEseQhvYAH_IAYAVGTTZMGQ",
      port: "5432",
      host: "mahmud.db.elephantsql.com",

      /* user: "postgres",
      database: "jose",
      password: "postgres",
      port: "5432",
      host: "localhost", */
    });
    this.db.connect((err) => {
      if (!err) console.log("Successfully connected to db!");
      else {
        console.log("error occured connecting to db!");
        console.log(err);
      }
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.query(sql, params, (err, res) => {
        if (err) {
          console.log("error running sql" + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }
  stop() {
    this.db.end();
  }
};
