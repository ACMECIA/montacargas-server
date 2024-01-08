import { Router } from "express";
import keys from "./keys.js";
import bodyParser from "body-parser";

import mysql from "mysql";

const UsersRouter = Router();

// ChartsRouter.use(cors());
// ChartsRouter.use(express.json());
// ChartsRouter.use(cookieParser());
UsersRouter.use(bodyParser.json());

export default UsersRouter;

const db = mysql.createPool({
  host: keys.dbHost,
  user: keys.dbUser,
  password: keys.dbPassword,
  database: keys.dbName,
  port: keys.dbPort,
  timeout: 60000,
});

UsersRouter.get("/", (req, res) => {
  console.log("UsersRouter");
  res.send("UsersRouter");
});

// Get users emails of clients

UsersRouter.get("/clients", (req, res) => {
  console.log("UsersRouter/clients");
  const sqlSelect = "SELECT * FROM users WHERE rol = 'client'";
  db.query(sqlSelect, (err, result) => {
    // Error handling
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
