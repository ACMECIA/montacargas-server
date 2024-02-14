import { Router } from "express";
import keys from "./keys.js";

import mysql from "mysql";
import multer from "multer";

const SettingsRouter = Router();

// SettingsRouter.use(bodyParser.json());

export default SettingsRouter;

const db = mysql.createPool({
  host: keys.dbHost,
  user: keys.dbUser,
  password: keys.dbPassword,
  database: keys.dbName,
  port: keys.dbPort,
  timeout: 60000,
});

SettingsRouter.get("/", (req, res) => {
  console.log("SettingsRouter");
  res.send("SettingsRouter");
});

SettingsRouter.get("/general", (req, res) => {
  //Get persistent_data table where type is status
  const sqlSelect = "SELECT * FROM persistent_data WHERE type = 'status'";
  // return the result
  db.query(sqlSelect, (err, result) => {
    // Error handling
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
SettingsRouter.post("/general/edit", (req, res) => {
  console.log(req.body.values);
  // Get key and value from the body
  let key = req.body.values.key;
  let value = req.body.values.value;

  // Update json col where id is the key in table persistent_data
  const sqlUpdate = "UPDATE persistent_data SET json = ? WHERE id = ?";

  db.query(sqlUpdate, [value, key], (err, result) => {
    //debug final query

    // Error handling
    if (err) {
      console.log(err);
    }
    res.status(200).send(result);
    // res.send(result);
  });
});

SettingsRouter.get("/status", (req, res) => {
  console.log("SettingsRouter");
  // Select data where type is status and tag=='label'
  const sqlSelect =
    "SELECT * FROM persistent_data WHERE type = 'status' AND tag='label'";
  // return the result
  db.query(sqlSelect, (err, result) => {
    // Error handling
    if (err) {
      console.log(err);
    }
    res.status(200).send(result);
    // res.send(result);

    // res.send("SettingsRouter");
  });
});

SettingsRouter.get("/schedule", (req, res) => {
  const sqlSelect = "SELECT * FROM persistent_data WHERE tag = 'schedule'";

  db.query(sqlSelect, (err, result) => {
    // Error handling
    if (err) {
      console.log(err);
    }

    let data = JSON.parse(result[0].json);
    console.log(data);
    res.status(200).send(data);
    // res.send(result);
  });
});
SettingsRouter.post("/schedule/edit", (req, res) => {
  console.log(req.body.values);

  const json = JSON.stringify(req.body.values);

  const sqlUpdate =
    "UPDATE persistent_data SET json = ? WHERE tag = 'schedule'";

  db.query(sqlUpdate, [json], (err, result) => {
    //debug final query

    // Error handling
    if (err) {
      console.log(err);
    }

    res.status(200).send(result);
    // res.send(result);
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "layout.png");
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: "./public/data/uploads/" });
SettingsRouter.post(
  "/upload",
  upload.single("uploaded_file"),
  function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any
    console.log(req.file, req.body);
    res.status(200).send("File uploaded");
  }
);
