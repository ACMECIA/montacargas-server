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
