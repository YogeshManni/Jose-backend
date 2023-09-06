var express = require("express");
var router = express.Router();
var dbEvents = require("../db/db-users");

let _dbo = null;

function getDbo() {
  if (!_dbo) {
    _dbo = new dbEvents(global.db);
  }
  return _dbo;
}

router.post("/addUser", async (req, res, next) => {
  try {
    const response = await getDbo().addUser(req.body);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/getUsers", async (req, res, next) => {
  try {
    const response = await getDbo().getUsers();
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
