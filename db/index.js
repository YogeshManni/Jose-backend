var pg = require("pg");
var env = require("../env");

module.exports = class appDb {
  constructor() {
    this.db = new pg.Client({
      user: env.DB_USER,
      database: env.DB_DATABASE,
      password: env.DB_PASSWORD,
      port: env.DB_PORT,
      host: env.DB_HOST,
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
