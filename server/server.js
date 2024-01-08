import express from "express";
import ChartsRouter from "./charts.js";
import AuthRouter from "./auth.js";
import UtilsRouter from "./utils.js";
import UsersRouter from "./users.js";
import SettingsRouter from "./settings.js";

const app = express();

app.use("/api/auth", AuthRouter);

app.use("/api/charts", ChartsRouter);

app.use("/api/utils", UtilsRouter);

app.use("/api/users", UsersRouter);

app.use("/api/settings", SettingsRouter);

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
