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
  console.log(events);
  res.status(200).send("events");
});

router.post("/addEvent", async function (req, res, next) {
  console.log(req.body);
  //var events =  await getDbo().addEvent();
  //console.log(events)
  res.status(200).send("reached Events");
});

module.exports = router;
