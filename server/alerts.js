import { Router } from "express";
import keys from "./keys.js";
import bodyParser from "body-parser";

import mysql from "mysql";

const AlertsRouter = Router();

AlertsRouter.use(bodyParser.json());

export default AlertsRouter;

const db = mysql.createPool({
  host: keys.dbHost,
  user: keys.dbUser,
  password: keys.dbPassword,
  database: keys.dbName,
  port: keys.dbPort,
  timeout: 60000,
});

AlertsRouter.get("/", (req, res) => {
  console.log("AlertsRouter");
  res.send("AlertsRouter");
});

AlertsRouter.get("/load", (req, res) => {
  var query = `SELECT * FROM alerts;`;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });
    console.log(data);
    return res.json({ Status: "Success", payload: data });
  });
});
