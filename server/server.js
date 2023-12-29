import express from "express";
import ChartsRouter from "./charts.js";
import AuthRouter from "./auth.js";
import UtilsRouter from "./utils.js";

const app = express();

app.use("/api/auth", AuthRouter);

app.use("/api/charts", ChartsRouter);

app.use("/api/utils", UtilsRouter);

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
