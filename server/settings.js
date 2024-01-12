import { Router } from "express";
import keys from "./keys.js";
import bodyParser from "body-parser";

import mysql from "mysql";

const SettingsRouter = Router();

SettingsRouter.use(bodyParser.json());

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
  // Select data where type is status
  const sqlSelect = "SELECT * FROM persistent_data WHERE type = 'status'";
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
