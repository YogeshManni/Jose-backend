var express = require("express");
var router = express.Router();
var dbEvents = require("../db/db-events");

let _dbo = null;

function getDbo() {
  if (!_dbo) {
    _dbo = new dbEvents(global.db);
  }
  return _dbo;
}

router.get("/", async function (req, res, next) {
  var events = await getDbo().getEvents();
  res.status(200).send(events);
});

router.post("/addEvent", async function (req, res, next) {
  console.log(req.body);
  try {
    let events = await getDbo().addEvent(req.body);
    res.status(200).send(`event added to db`);
  } catch (err) {
    res.status(200).send(err.message);
  }
});

module.exports = router;
