import { Router } from "express";
import keys from "./keys.js";
import bodyParser from "body-parser";

import mysql from "mysql";

const UtilsRouter = Router();

// ChartsRouter.use(cors());
// ChartsRouter.use(express.json());
// ChartsRouter.use(cookieParser());
UtilsRouter.use(bodyParser.json());

export default UtilsRouter;

const db = mysql.createPool({
  host: keys.dbHost,
  user: keys.dbUser,
  password: keys.dbPassword,
  database: keys.dbName,
  port: keys.dbPort,
  timeout: 60000,
});

UtilsRouter.get("/", (req, res) => {
  console.log("UtilsRouter");
  res.send("UtilsRouter");
});

UtilsRouter.post("/download", (req, res) => {
  var dates = req.body.dateRange;

  var query = `SELECT * FROM local_data WHERE 
  date >= FROM_UNIXTIME(${dates[0]}) AND date <= FROM_UNIXTIME(${dates[1]})
  ORDER BY date;
  `;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data.map((row) => JSON.parse(row.data));
    var array_out = [];

    for (var i = 0; i < array_in.length; i++) {
      array_out[i] = array_in[i];
      array_out[i].timestamp = unixTimestampToHumanReadable(
        array_out[i].timestamp
      );
    }

    var filename = `${array_out[0].timestamp.split(" ")[0]} hasta ${
      array_out[array_out.length - 1].timestamp.split(" ")[0]
    }`;

    var csvString = arrayToCSV(array_out);

    return res.json({
      Status: "Success",
      payload: { data: csvString, filename: filename },
    });
  });
});

function unixTimestampToHumanReadable(unixTimestamp) {
  const date = new Date(unixTimestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function arrayToCSV(data) {
  if (data.length === 0) {
    return "";
  }

  const keys = Object.keys(data[0]);
  const headerRow = keys.join(",");

  const csvRows = [];
  csvRows.push(headerRow);

  for (const obj of data) {
    const values = keys.map((key) => obj[key]);
    const csvRow = values.join(",");
    csvRows.push(csvRow);
  }

  return csvRows.join("\n");
}

// module.exports = UtilsRouter;
