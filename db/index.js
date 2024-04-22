var pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

module.exports = class appDb {
  constructor() {
    this.db = new pg.Client({
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
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
