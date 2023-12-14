var express = require("express");
var router = express.Router();
var dbPosts = require("../db/db-posts");
const multer = require("multer");

let _dbo = null;

function getDbo() {
  if (!_dbo) {
    _dbo = new dbPosts(global.db);
  }
  return _dbo;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "public/posts";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    let filename = req.body.name + file.originalname;
    filename = filename.replaceAll(":", "-");
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

router.post("/addPost", async function (req, res, next) {
  try {
    let result = await getDbo().addPost(req.body);
    res.status(200).send(`post added to db`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.post(
  "/uploadImage",
  upload.fields([{ name: "image-file", maxCount: 1 }]),
  async function (req, res) {
    try {
      res.status(200).json({
        status: "success",
        message: "File created successfully!!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
