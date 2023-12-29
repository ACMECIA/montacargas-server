import React, { Fragment } from "react";
import FrenquencyChart from "./charts/FrenquencyChart";
import CumulatedFrenquencyChart from "./charts/CumulatedFrenquencyChart";
import Box from "./shared/Box";
import DoubleBellChart from "./charts/DoubleBellChart";
import axios from "axios";
import { useEffect, useState } from "react";


import { Cascader, Divider } from 'antd';

const options = [
  {
    label: 'Lunes',
    value: '0',
  },
  {
    label: 'Martes',
    value: '1',
  },
  {
    label: 'Miercoles',
    value: '2',
  },
  {
    label: 'Jueves',
    value: '3',
  },
  {
    label: 'Viernes',
    value: '4',
  },
  {
    label: 'Sábado',
    value: '5',
  },
  {
    label: 'Domingo',
    value: '6',
  },
  
];
const onChange = (value) => {
  console.log(value);
};

const dropdownRender = (menus) => (
  <div>
    {menus}
    <Divider
      style={{
        margin: 0,
      }}
    />
    <div
      style={{
        padding: 8,
      }}
    >
      Seleccione los días de trabajo
    </div>
  </div>
);


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
        <Cascader placeholder="Días de la semana"
        dropdownRender={dropdownRender}
          style={{
            width: '50%',
          }}
          options={options}
          onChange={onChange}
          multiple
          maxTagCount="responsive"
        />
        </Box>

        <Box>
          
        </Box>
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        <Box>
         
        </Box>

        <Box>
         
        </Box>
      </div>
    </div>
  );
}
