import { Router } from "express";
import keys from "./keys.js";
import bodyParser from "body-parser";

import mysql from "mysql";

import validateTimeRange from "./middlewares/validate-time-range.js";

import {
  getStateInformation,
  monthlyRepetitionStates,
  cumulatedMonthly,
  cumulatedStateHours,
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

  var limitsQuery = `SELECT json FROM persistent_data WHERE tag = 'coordinates'`;

  var minLat = -12.0487;
  var maxLat = -12.0468;
  var minLng = -77.1017;
  var maxLng = -77.1001;

  db.query(limitsQuery, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });
    var limits = JSON.parse(data[0].json);

    minLat = limits.minLat;
    maxLat = limits.maxLat;
    minLng = limits.minLon;
    maxLng = limits.maxLon;
  });

  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    const gridSize = 100;
    const grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({ count: 0 }))
    );
    // Establecer límites de latitud y longitud (ejemplo)
    // const minLat = -12.0487;
    // const maxLat = -12.0468;
    // const minLng = -77.1017;
    // const maxLng = -77.1001;

    const latStep = (maxLat - minLat) / gridSize;
    const lngStep = (maxLng - minLng) / gridSize;

    data.forEach((row) => {
      var jsonData = JSON.parse(row.data);

      // Obtener la latitud y longitud de tus datos (ajustar según la estructura de tu JSON)
      const lat = jsonData.latitude;
      const lng = jsonData.longitude;
      const carga = jsonData.carga;
      var state = jsonData.state;

      // Agregamos el filtro para el state de efectivo
      if (carga >= 2 && state >= 3) {
        state = 6;
      }

      const weightCheck =
        !req.body.filters.weightRange ||
        (carga >= req.body.filters.weightRange[0] &&
          carga <= req.body.filters.weightRange[1]);
      const stateCheck =
        !req.body.filters.stateFilter || state === req.body.filters.stateFilter;

      // Calcular el índice en el grid para esta latitud y longitud
      const latIndex = Math.floor((lat - minLat) / latStep);
      const lngIndex = Math.floor((lng - minLng) / lngStep);

      if (weightCheck && stateCheck) {
        // Asegurarse de que el índice esté dentro de los límites del grid
        if (
          latIndex >= 0 &&
          latIndex < gridSize &&
          lngIndex >= 0 &&
          lngIndex < gridSize
        ) {
          // Incrementar el contador en el grid para la celda correspondiente
          grid[latIndex][lngIndex].count++;
        }
      }
    });

    // console.log(grid);

    const heatmapJSON = [];

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const { count } = grid[y][x];
        if (count > 0) {
          heatmapJSON.push({ g: x, l: y, tmp: count });
        } else {
          heatmapJSON.push({ g: x, l: y, tmp: 0 });
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

  var limitsQuery = `SELECT json FROM persistent_data WHERE tag = 'coordinates'`;

  var minLat = -12.0487;
  var maxLat = -12.0468;
  var minLng = -77.1017;
  var maxLng = -77.1001;

  db.query(limitsQuery, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });
    var limits = JSON.parse(data[0].json);

    minLat = limits.minLat;
    maxLat = limits.maxLat;
    minLng = limits.minLon;
    maxLng = limits.maxLon;
  });
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    const gridSize = 100;
    const grid = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({ count: 0, total: 0 }))
    );

    // Establecer límites de latitud y longitud (ejemplo)
    // const minLat = -12.0487;
    // const maxLat = -12.0468;
    // const minLng = -77.1017;
    // const maxLng = -77.1001;

    const latStep = (maxLat - minLat) / gridSize;
    const lngStep = (maxLng - minLng) / gridSize;

    data.forEach((row) => {
      var jsonData = JSON.parse(row.data);

      // Obtener la latitud y longitud de tus datos (ajustar según la estructura de tu JSON)
      const lat = jsonData.latitude;
      const lng = jsonData.longitude;
      const carga = jsonData.carga;
      var state = jsonData.state;

      // Agregamos el filtro para el state de efectivo
      if (carga >= 2 && state >= 3) {
        state = 6;
      }

      const weightCheck =
        !req.body.filters.weightRange ||
        (carga >= req.body.filters.weightRange[0] &&
          carga <= req.body.filters.weightRange[1]);
      const stateCheck =
        !req.body.filters.stateFilter || state === req.body.filters.stateFilter;

      // Calcular el índice en el grid para esta latitud y longitud
      const latIndex = Math.floor((lat - minLat) / latStep);
      const lngIndex = Math.floor((lng - minLng) / lngStep);

      if (weightCheck && stateCheck) {
        // Asegurarse de que el índice esté dentro de los límites del grid
        if (
          latIndex >= 0 &&
          latIndex < gridSize &&
          lngIndex >= 0 &&
          lngIndex < gridSize
        ) {
          // Acumular la suma de pesos y aumentar el contador
          grid[latIndex][lngIndex].total += carga;
          grid[latIndex][lngIndex].count++;
        }
      }
    });

    // console.log(grid);

    const heatmapJSON = [];

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const { count, total } = grid[y][x];
        if (count > 0) {
          // Calcular el promedio de pesos
          const average = total / count;
          // Round to two decimals
          const roundedAv = Math.round(average * 100) / 100;

          heatmapJSON.push({ g: x, l: y, tmp: roundedAv });
        } else {
          heatmapJSON.push({ g: x, l: y, tmp: 0 });
        }
      }
    }

    return res.json({ Status: "Success", payload: heatmapJSON });
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

ChartsRouter.get("/frequency2", validateTimeRange, async (req, res) => {
  const { startTime, endTime } = req.query;

  const query = `SELECT * FROM local_data WHERE date BETWEEN '${startTime}' AND '${endTime}' ORDER BY date;`;

  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    // check empty data
    if (data.length === 0) {
      return res.json({ Error: "No data found", payload: [] });
    }

    var array_in = data.map((row) => JSON.parse(row.data));
    var array_out = [];

    array_out = getStateInformation(array_in);

    // return res.json({ Status: "Success" });
    return res.json({ Status: "Success", payload: array_out });
  });
});

ChartsRouter.get("/cfrequency", (req, res) => {
  // Obtenemos el intervalo de data
  // var dates = req.body.dateRange;

  // Get the schedule from the database
  const sqlSelect = "SELECT * FROM persistent_data WHERE tag = 'schedule'";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Error in the query" });
    }

    let schedule = JSON.parse(result[0].json);

    let weekdays = schedule.weekdays;
    let sumDays = weekdays.reduce((a, b) => a + b, 0);

    let maxHours = 4 * sumDays * (schedule.endHour - schedule.initHour);

    // Get the data from the database with the time interval make the query
    var query = `
    SELECT * FROM local_data 
    WHERE YEAR(date) = YEAR(CURDATE())
    order by date;
    `;
    db.query(query, (err, data) => {
      if (err) return res.json({ Error: "Error in the query" });

      var array_in = data.map((row) => JSON.parse(row.data));
      var array_out = [];
      var array1 = Array(12).fill(0);
      var array2 = Array(12).fill(0);
      var array3 = Array(12).fill(0);

      [array1, array2, array3] = cumulatedMonthly(array_in, maxHours);

      return res.json({
        Status: "Success",
        payload: { array1, array2, array3 },
      });
    });
  });
});

ChartsRouter.get("/cfrequency2", (req, res) => {
  // Obtenemos el intervalo de data
  const { startTime, endTime } = req.query;

  const sqlSelect = "SELECT * FROM persistent_data WHERE tag = 'schedule'";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Error in the query" });
    }

    let schedule = JSON.parse(result[0].json);

    let weekdays = schedule.weekdays;
    let sumDays = weekdays.reduce((a, b) => a + b, 0);

    let maxHours = 4 * sumDays * (schedule.endHour - schedule.initHour);

    // Get the data from the database with the time interval make the query
    const query = `SELECT * FROM local_data WHERE date BETWEEN '${startTime}' AND '${endTime}' ORDER BY date;`;

    db.query(query, (err, data) => {
      if (err) return res.json({ Error: "Error in the query" });

      // check empty data
      if (data.length === 0) {
        return res.json({ Error: "No data found", payload: [] });
      }

      var array_in = data.map((row) => JSON.parse(row.data));
      var array_out = [];
      var array1 = Array(12).fill(0);
      var array2 = Array(12).fill(0);
      var array3 = Array(12).fill(0);

      [array1, array2, array3] = cumulatedMonthly(array_in, maxHours);

      return res.json({
        Status: "Success",
        payload: { array1, array2, array3 },
      });
    });
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

    var allArrays = monthlyRepetitionStates(array_in);
    array1 = allArrays[0];
    array2 = allArrays[1];
    array3 = allArrays[2];
    array4 = allArrays[3];
    array5 = allArrays[4];
    array6 = allArrays[5];

    return res.json({
      Status: "Success",
      payload: { array1, array2, array3, array4, array5, array6 },
    });
  });
});

ChartsRouter.get("/stacked2", (req, res) => {
  const { startTime, endTime } = req.query;

  const query = `SELECT * FROM local_data WHERE date BETWEEN '${startTime}' AND '${endTime}' ORDER BY date;`;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    // check empty data
    if (data.length === 0) {
      return res.json({ Error: "No data found", payload: [] });
    }

    var array_in = data.map((row) => JSON.parse(row.data));

    var array1 = Array(12).fill(0);
    var array2 = Array(12).fill(0);
    var array3 = Array(12).fill(0);
    var array4 = Array(12).fill(0);
    var array5 = Array(12).fill(0);
    var array6 = Array(12).fill(0);

    var allArrays = monthlyRepetitionStates(array_in);
    array1 = allArrays[0];
    array2 = allArrays[1];
    array3 = allArrays[2];
    array4 = allArrays[3];
    array5 = allArrays[4];
    array6 = allArrays[5];

    return res.json({
      Status: "Success",
      payload: { array1, array2, array3, array4, array5, array6 },
    });
  });
});

ChartsRouter.post("/bell", (req, res) => {
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
      array_out[i] = array_in[i].carga;
    }

    // Get mean of array_out
    // var sum = 0;
    // for (var i = 0; i < array_out.length; i++) {
    //   sum += array_out[i];
    // }
    // var mean = sum / array_out.length;
    // console.log(mean);

    return res.json({ Status: "Success", payload: array_out });
  });
});

ChartsRouter.post("/histogram", (req, res) => {
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
      // Solo agregar a array_out si es que arra_in[i].carga es mayor a 0.2
      // if (array_in[i].carga > 0.2) {
      array_out.push(array_in[i]);
      // }
      // array_out[i] = array_in[i];
    }

    // Get mean of array_out
    // var sum = 0;
    // for (var i = 0; i < array_out.length; i++) {
    //   sum += array_out[i];
    // }
    // var mean = sum / array_out.length;
    // console.log(mean);

    return res.json({ Status: "Success", payload: array_out });
  });
});

ChartsRouter.get("/disponibilidad", (req, res) => {
  // Obtenemos el intervalo de data
  // var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query
  const maxHours = 220;
  var query = `
  SELECT * FROM local_data 
  WHERE YEAR(date) = YEAR(CURDATE())
  order by date;
  `;
  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data.map((row) => JSON.parse(row.data));

    // Obtenermos el acumulado del estado 1, es decir inoperativo
    var array1 = cumulatedStateHours(array_in, 1);

    // obtener la disponibilidad restando maxHours - array1 entre maxHours
    // elementwise
    array1 = array1.map((x) => (100 * (maxHours - x)) / maxHours);

    return res.json({ Status: "Success", payload: { array1 } });
  });
});

ChartsRouter.get("/confiabilidad", (req, res) => {
  // Obtenemos el intervalo de data
  // var dates = req.body.dateRange;

  const euler = 2.71828;
  // Get the data from the database with the time interval make the query
  const maxHours = 220;
  var query = `
  SELECT * FROM alerts 
  WHERE YEAR(date) = YEAR(CURDATE())
  order by date;
  `;

  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    // var array_in = data;

    // Count the number of corrective maintenances per month

    const counts = {};

    data.forEach((item) => {
      const month = new Date(item.date).getMonth();
      if (item.mant_type === "correctivo") {
        counts[month] = (counts[month] || 0) + 1;
      }
    });

    const result = [];

    for (let i = 0; i < 12; i++) {
      result.push({ month: i, count: counts[i] || 0 });
    }

    console.log(result);

    var arrayCorrective = result.map((x) => x.count);

    //Finalmente la confiabilidad, que es euler**(-paradasCorrectivas)
    var confiabilidad = arrayCorrective.map((x, i) => euler ** -x);

    var array1 = confiabilidad;

    return res.json({ Status: "Success", payload: { array1 } });
  });
});

ChartsRouter.get("/detenciones", (req, res) => {
  // Obtenemos el intervalo de data
  // var dates = req.body.dateRange;

  // Get the data from the database with the time interval make the query

  var totalHours = 350;
  var horarioInicio = 6;
  var horarioFin = 18;
  var hoursAwayPerDay = horarioInicio + (24 - horarioFin);

  const sqlSelect = "SELECT * FROM persistent_data WHERE tag = 'schedule'";

  db.query(sqlSelect, (err, result) => {
    // Error handling
    if (err) {
      console.log(err);
    }

    let schedule = JSON.parse(result[0].json);

    const sumDays = schedule.weekdays.reduce((a, b) => a + b, 0);
    totalHours = 4 * sumDays * (schedule.endHour - schedule.initHour);
    console.log(totalHours);
    horarioInicio = schedule.initHour;
    horarioFin = schedule.endHour;

    // res.status(200).send(data);
    // res.send(result);
  });

  hoursAwayPerDay = horarioInicio + (24 - horarioFin);

  // const maxHours = 220;
  var query = `
  SELECT * FROM alerts 
  WHERE YEAR(date) = YEAR(CURDATE())
  order by date;
  `;

  // Inicializar un array para almacenar las horas acumuladas por mes
  var horasPorMes = new Array(12).fill().map(() => ({
    correctivo: 0,
    preventivo: 0,
  }));

  db.query(query, (err, data) => {
    if (err) return res.json({ Error: "Error in the query" });

    var array_in = data;
    console.log(array_in);

    // Iterar sobre los datos y acumular las horas para cada tipo de mantenimiento y mes
    for (let i = 0; i < array_in.length; i++) {
      const entry = array_in[i];
      const fecha = new Date(entry.date);
      const mes = fecha.getMonth(); // Obtener el mes

      if (entry.mant_type === "correctivo") {
        if (
          i + 1 < array_in.length &&
          array_in[i + 1].mant_type === "mant-end"
        ) {
          horasPorMes[mes].correctivo += calcularDiferenciaHoras(
            entry.date,
            array_in[i + 1].date,
            hoursAwayPerDay
          );
        }
      } else if (entry.mant_type === "mant-end") {
        if (i - 1 >= 0 && array_in[i - 1].mant_type === "correctivo") {
          // Ya hemos contabilizado estas horas al calcular el correctivo
        } else {
          horasPorMes[mes].preventivo += calcularDiferenciaHoras(
            array_in[i - 1].date,
            entry.date,
            hoursAwayPerDay
          );
        }
      }
    }

    // Preparar el resultado para el mensaje
    var resultPorMes = horasPorMes.map((mes) => ({
      correctivo: mes.correctivo,
      preventivo: mes.preventivo,
    }));

    console.log(resultPorMes);

    var array1 = resultPorMes.map((mes) => (100 * mes.correctivo) / totalHours);
    var array2 = resultPorMes.map((mes) => (100 * mes.preventivo) / totalHours);

    // // Obtenermos el acumulado del estado 1, es decir inoperativo
    // var array1 = cumulatedStateHours(array_in, 1);
    // var array2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // // obtener la disponibilidad restando maxHours - array1 entre maxHours
    // // elementwise
    // array1 = array1.map((x) => (100 * (totalHours - x)) / totalHours);

    // // Por ahora, porque aun no definimos las horas de cada tipo

    // array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return res.json({ Status: "Success", payload: { array1, array2 } });
    // return res.json({ Status: "Success" });
  });
});

// Función para calcular la diferencia de horas entre dos timestamps
function calcularDiferenciaHoras(
  timestampInicio,
  timestampFin,
  hoursAwayPerDay
) {
  const inicio = new Date(timestampInicio);
  const fin = new Date(timestampFin);
  const diferenciaMs = fin - inicio;
  const horas = diferenciaMs / (1000 * 60 * 60); // Convertir de milisegundos a horas
  const minutos = (horas - Math.floor(horas)) * 60; // Extraer los minutos
  const horasDecimal = Math.floor(horas) + minutos / 60; // Convertir los minutos a fracción de hora y sumarlos a las horas enteras

  const milisegundosEnUnDia = 1000 * 60 * 60 * 24;
  const diferenciaDias = Math.floor(diferenciaMs / milisegundosEnUnDia);

  const finalHours = horasDecimal - diferenciaDias * hoursAwayPerDay;

  return finalHours;
}
