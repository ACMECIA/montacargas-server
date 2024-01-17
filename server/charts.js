import { Router } from "express";
import keys from "./keys.js";
import bodyParser from "body-parser";

import mysql from "mysql";

import {
  getStateInformation,
  monthlyRepetitionState,
  monthlyRepetitionStates,
} from "./functions.js";

const ChartsRouter = Router();

// ChartsRouter.use(cors());
// ChartsRouter.use(express.json());
// ChartsRouter.use(cookieParser());
ChartsRouter.use(bodyParser.json());

export default ChartsRouter;

const db = mysql.createPool({
  host: keys.dbHost,
  user: keys.dbUser,
  password: keys.dbPassword,
  database: keys.dbName,
  port: keys.dbPort,
  timeout: 60000,
});

ChartsRouter.get("/", (req, res) => {
  console.log("ChartsRouter");
  res.send("ChartsRouter");
});

ChartsRouter.post("/realtime", (req, res) => {
  // Obtenemos el intervalo de data
  // console.log("asda", req.body)
  var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query
  var query = `
  SELECT * FROM local_data 
  WHERE date >= FROM_UNIXTIME(${dates[0]}) AND date <= FROM_UNIXTIME(${dates[1]})
  ORDER BY date;
`;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array1 = [];
    var array2 = [];

    for (var i = 0; i < data.length; i++) {
      var jsonData = JSON.parse(data[i].data);
      // console.log(jsonData);
      array1.push([jsonData.timestamp, jsonData.carga]);
      array2.push([jsonData.timestamp, jsonData.velocidad]);
    }

    return res.json({ Status: "Success", array1: array1, array2: array2 });
  });
});

ChartsRouter.post("/heat1", (req, res) => {
  var dates = req.body.filters.dateRange;
  var query = `SELECT * FROM local_data WHERE 
  date >= FROM_UNIXTIME(${dates[0]}) AND date <= FROM_UNIXTIME(${dates[1]});`;

  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    const gridSize = 100;
    const grid = new Array(gridSize)
      .fill()
      .map(() => new Array(gridSize).fill(0));

    data.forEach((row) => {
      var jsonData = JSON.parse(row.data);
      const { x_axis, y_axis, carga1, z1_axis, state } = jsonData;

      const weightCheck =
        !req.body.filters.weightRange ||
        (carga1 >= req.body.filters.weightRange[0] &&
          carga1 <= req.body.filters.weightRange[1]);
      const heightCheck =
        !req.body.filters.heightRange ||
        (z1_axis >= req.body.filters.heightRange[0] &&
          z1_axis <= req.body.filters.heightRange[1]);
      const stateCheck =
        !req.body.filters.stateFilter || state === req.body.filters.stateFilter;

      if (weightCheck && heightCheck && stateCheck) {
        const withinBounds =
          x_axis >= 0 && x_axis < gridSize && y_axis >= 0 && y_axis < gridSize;
        if (withinBounds) {
          grid[y_axis][x_axis]++;
        }
      }
    });

    const heatmapJSON = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] > 0) {
          heatmapJSON.push({ g: x, l: y, tmp: grid[y][x] });
        }
      }
    }

    return res.json({ Status: "Success", payload: heatmapJSON });
  });
});

ChartsRouter.post("/heat2", (req, res) => {
  var dates = req.body.filters.dateRange;
  var query = `SELECT * FROM local_data WHERE 
  date >= FROM_UNIXTIME(${dates[0]}) AND date <= FROM_UNIXTIME(${dates[1]});`;

  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    const gridSize = 100;
    const grid = new Array(gridSize)
      .fill()
      .map(() => new Array(gridSize).fill(0));

    data.forEach((row) => {
      var jsonData = JSON.parse(row.data);
      const { x_axis, y_axis, carga2, z2_axis, state } = jsonData;

      const weightCheck =
        !req.body.filters.weightRange ||
        (carga2 >= req.body.filters.weightRange[0] &&
          carga2 <= req.body.filters.weightRange[1]);
      const heightCheck =
        !req.body.filters.heightRange ||
        (z2_axis >= req.body.filters.heightRange[0] &&
          z2_axis <= req.body.filters.heightRange[1]);
      const stateCheck =
        !req.body.filters.stateFilter || state === req.body.filters.stateFilter;

      if (weightCheck && heightCheck && stateCheck) {
        const withinBounds =
          x_axis >= 0 && x_axis < gridSize && y_axis >= 0 && y_axis < gridSize;
        if (withinBounds) {
          grid[y_axis][x_axis]++;
        }
      }
    });

    const heatmapJSON = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] > 0) {
          heatmapJSON.push({ g: x, l: y, tmp: grid[y][x] });
        }
      }
    }

    return res.json({ Status: "Success", payload: heatmapJSON });
  });
});

ChartsRouter.post("/heat11", (req, res) => {
  var dates = req.body.filters.dateRange;
  var query = `SELECT * FROM local_data WHERE 
  date >= FROM_UNIXTIME(${dates[0]}) AND date <= FROM_UNIXTIME(${dates[1]});`;

  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    const gridSize = 100;
    const grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({ count: 0, total: 0 }))
    );

    data.forEach((row) => {
      var jsonData = JSON.parse(row.data);
      const { x_axis, y_axis, carga1, z1_axis, state } = jsonData;

      const weightCheck =
        !req.body.filters.weightRange ||
        (carga1 >= req.body.filters.weightRange[0] &&
          carga1 <= req.body.filters.weightRange[1]);
      const heightCheck =
        !req.body.filters.heightRange ||
        (z1_axis >= req.body.filters.heightRange[0] &&
          z1_axis <= req.body.filters.heightRange[1]);
      const stateCheck =
        !req.body.filters.stateFilter || state === req.body.filters.stateFilter;

      if (weightCheck && heightCheck && stateCheck) {
        const withinBounds =
          x_axis >= 0 && x_axis < gridSize && y_axis >= 0 && y_axis < gridSize;
        if (withinBounds) {
          grid[y_axis][x_axis].count++;
          grid[y_axis][x_axis].total += carga1;
        }
      }
    });

    const heatmapJSON = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const { count, total } = grid[y][x];
        if (count > 0) {
          const average = total / count;
          heatmapJSON.push({ g: x, l: y, tmp: average });
        } else {
          heatmapJSON.push({ g: x, l: y, tmp: 0 });
        }
      }
    }

    return res.json({ Status: "Success", payload: heatmapJSON });
  });
});

ChartsRouter.post("/heat22", (req, res) => {
  var dates = req.body.filters.dateRange;
  var query = `SELECT * FROM local_data WHERE 
  date >= FROM_UNIXTIME(${dates[0]}) AND date <= FROM_UNIXTIME(${dates[1]});`;

  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    const gridSize = 100;
    const grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({ count: 0, total: 0 }))
    );

    data.forEach((row) => {
      var jsonData = JSON.parse(row.data);
      const { x_axis, y_axis, carga2, z2_axis, state } = jsonData;

      const weightCheck =
        !req.body.filters.weightRange ||
        (carga2 >= req.body.filters.weightRange[0] &&
          carga2 <= req.body.filters.weightRange[1]);
      const heightCheck =
        !req.body.filters.heightRange ||
        (z2_axis >= req.body.filters.heightRange[0] &&
          z2_axis <= req.body.filters.heightRange[1]);
      const stateCheck =
        !req.body.filters.stateFilter || state === req.body.filters.stateFilter;

      if (weightCheck && heightCheck && stateCheck) {
        const withinBounds =
          x_axis >= 0 && x_axis < gridSize && y_axis >= 0 && y_axis < gridSize;
        if (withinBounds) {
          grid[y_axis][x_axis].count++;
          grid[y_axis][x_axis].total += carga2;
        }
      }
    });

    const heatmapJSON = [];

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const { count, total } = grid[y][x];
        if (count > 0) {
          const average = total / count;
          heatmapJSON.push({ g: x, l: y, tmp: average });
        } else {
          heatmapJSON.push({ g: x, l: y, tmp: 0 });
        }
      }
    }

    return res.json({ Status: "Success", payload: heatmapJSON });
  });
});

ChartsRouter.get("/frequency2", (req, res) => {
  // Obtenemos el intervalo de data
  // var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query
  // var query = `SELECT data FROM local_data;`;
  var query = `
  SELECT * FROM local_data 
  ORDER BY date;
`;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data.map((row) => JSON.parse(row.data));
    // console.log(array_in);
    var array_out = [];

    var count = 0;
    var current_state = 0;
    var prev_state = 0;
    var current_date = 0;

    for (var i = 0; i < array_in.length; i++) {
      current_state = array_in[i].state;
      current_date = array_in[i].timestamp;

      if (current_state != prev_state) {
        array_out[count] = {
          state: current_state,
          fInit: current_date,
          fEnd: current_date,
        };
        count++;
      } else {
        if (array_out.length > 0) {
          array_out[count - 1].fEnd = current_date;
        } else {
          // Handle the case where array_out is empty
        }
      }
      prev_state = current_state;
    }

    var nombresMeses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    for (var i = 0; i < array_out.length; i++) {
      const diferenciaEnMilisegundos = array_out[i].fEnd - array_out[i].fInit;
      const horas = diferenciaEnMilisegundos / (60 * 60 * 1000);
      array_out[i].hours = horas;

      var date = new Date(array_out[i].fInit);
      var mes = date.getMonth();
      array_out[i].month = nombresMeses[mes];
    }

    // return res.json({ Status: "Success" });
    return res.json({ Status: "Success", payload: array_out });
  });
});

ChartsRouter.get("/frequency", (req, res) => {
  // Obtenemos el intervalo de data
  // var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query
  // var query = `SELECT data FROM local_data;`;
  var query = `
  SELECT * FROM local_data 
  WHERE YEAR(date) = YEAR(CURDATE())
  ORDER BY date;
`;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data.map((row) => JSON.parse(row.data));
    // console.log(array_in);
    var array_out = [];

    array_out = getStateInformation(array_in);

    // return res.json({ Status: "Success" });
    return res.json({ Status: "Success", payload: array_out });
  });
});

ChartsRouter.get("/cfrequency", (req, res) => {
  // Obtenemos el intervalo de data
  // var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query
  var query = `
  SELECT * FROM local_data 
  WHERE YEAR(date) = YEAR(CURDATE());
  `;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data.map((row) => JSON.parse(row.data));
    var array_out = [];

    var array1 = Array(12).fill(0);
    var array2 = Array(12).fill(0);
    var array3 = Array(12).fill(0);

    array1 = monthlyRepetitionState(array_in, "gstate", 1);
    array2 = monthlyRepetitionState(array_in, "state", 5);

    // Getting percentage
    // period*repetitions*100/total_hours/3600
    array1 = array1.map((value) => (500 * value) / 3600 / 220);
    array2 = array2.map((value) => (500 * value) / 3600 / 220);
    // Array3 is the division element by element of array2 and array1 (avoid zero division)
    for (var i = 0; i < array1.length; i++) {
      if (array1[i] != 0) {
        array3[i] = (array2[i] / array1[i]) * 100;
      } else {
        array3[i] = 0;
      }
    }
    // console.log(array1);
    // console.log(array2);
    // console.log(array3);

    // array3[mes] = (array2[mes] / array1[mes]) * 100;

    return res.json({ Status: "Success", payload: { array1, array2, array3 } });
  });
});

ChartsRouter.get("/stacked", (req, res) => {
  // Obtenemos el intervalo de data
  // var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query
  var query = `
  SELECT * FROM local_data 
  WHERE YEAR(date) = YEAR(CURDATE())
  ORDER BY date;
  `;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data.map((row) => JSON.parse(row.data));

    var array1 = Array(12).fill(0);
    var array2 = Array(12).fill(0);
    var array3 = Array(12).fill(0);
    var array4 = Array(12).fill(0);
    var array5 = Array(12).fill(0);
    var array6 = Array(12).fill(0);

    // array1 = monthlyRepetitionState(array_in, "state", 0);
    // array2 = monthlyRepetitionState(array_in, "state", 1);
    // array3 = monthlyRepetitionState(array_in, "state", 2);
    // array4 = monthlyRepetitionState(array_in, "state", 3);
    // array5 = monthlyRepetitionState(array_in, "state", 4);
    // array6 = monthlyRepetitionState(array_in, "state", 5);

    var allArrays = monthlyRepetitionStates(array_in);
    array1 = allArrays[0];
    array2 = allArrays[1];
    array3 = allArrays[2];
    array4 = allArrays[3];
    array5 = allArrays[4];
    array6 = allArrays[5];

    // console.log(data_test);
    // Getting hourse
    // period*repetitions/3600
    // array1 = array1.map((value) => (5 * value) / 3600);
    // array2 = array2.map((value) => (5 * value) / 3600);
    // array3 = array3.map((value) => (5 * value) / 3600);
    // array4 = array4.map((value) => (5 * value) / 3600);
    // array5 = array5.map((value) => (5 * value) / 3600);
    // array6 = array6.map((value) => (5 * value) / 3600);

    return res.json({
      Status: "Success",
      payload: { array1, array2, array3, array4, array5, array6 },
    });
  });
});

ChartsRouter.post("/bell1", (req, res) => {
  // Obtenemos el intervalo de data
  console.log(req.body);
  var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query
  var query = `SELECT * FROM local_data WHERE 
  date >= FROM_UNIXTIME(${dates[0]}) AND date <= FROM_UNIXTIME(${dates[1]});
  `;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data.map((row) => JSON.parse(row.data));
    var array_out = [];

    for (var i = 0; i < array_in.length; i++) {
      array_out[i] = array_in[i].carga1;
    }

    return res.json({ Status: "Success", payload: array_out });
  });
});

ChartsRouter.post("/bell2", (req, res) => {
  // Obtenemos el intervalo de data
  var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query
  var query = `SELECT * FROM local_data WHERE 
  date >= FROM_UNIXTIME(${dates[0]}) AND date <= FROM_UNIXTIME(${dates[1]});
  `;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data.map((row) => JSON.parse(row.data));
    var array_out = [];

    for (var i = 0; i < array_in.length; i++) {
      array_out[i] = array_in[i].carga2;
    }

    return res.json({ Status: "Success", payload: array_out });
  });
});
