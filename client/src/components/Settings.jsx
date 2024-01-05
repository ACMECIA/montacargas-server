import React, { Fragment } from "react";
import FrenquencyChart from "./charts/FrenquencyChart";
import CumulatedFrenquencyChart from "./charts/CumulatedFrenquencyChart";
import Box from "./shared/Box";
import DoubleBellChart from "./charts/DoubleBellChart";
import axios from "axios";
import { useEffect, useState } from "react";

import DeviceSchedule from "./utils/settings/DeviceSchedule";
import UserManagement from "./utils/settings/UserManagement";

export default function Settings() {
  const [rol, setRol] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("/api/auth", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res);
        // setLoaded(true);
        if (res.data.Status === "Success") {
          // setAuth(true);
          setName(res.data.username);
          setRol(res.data.rol);

          //   navigate("/");
          //
        } else {
          // setAuth(false);
          // navigate("/login");
          // setMessage(res.data.Error);
        }
      });
  });

  return (
    <Fragment>
      {rol === "admin" ? (
        <SettingsDisplay></SettingsDisplay>
      ) : (
        "No tienes permiso"
      )}{" "}
    </Fragment>
  );
}

export function SettingsDisplay() {
  return (
    <div className="grid grid-cols-2 w-full gap-4 p-4">
      <div className="col-span-1 flex flex-col gap-4">
        <Box>
          <DeviceSchedule chartName={"Horario del Sistema"}></DeviceSchedule>
        </Box>

        <Box></Box>
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        <Box>
          <UserManagement chartName={"Gestión de Usuarios"}></UserManagement>
        </Box>

        <Box></Box>
      </div>
    </div>
  );
}
