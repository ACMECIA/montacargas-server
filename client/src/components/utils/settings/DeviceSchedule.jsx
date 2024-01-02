import React, { Fragment, useState } from "react";
// import PlotlyChart from "react-plotlyjs-ts";
// import { useState } from "react";
// import { ResponsiveContainer } from "recharts";
// import RefreshButton from "../../charts/components/RefreshButton";
// import { Button } from "antd";
import GeneralButton from "../GeneralButton";
import { Cascader, Divider } from "antd";
import { TimePicker } from "antd";

const options = [
  {
    label: "Lunes",
    value: "0",
  },
  {
    label: "Martes",
    value: "1",
  },
  {
    label: "Miercoles",
    value: "2",
  },
  {
    label: "Jueves",
    value: "3",
  },
  {
    label: "Viernes",
    value: "4",
  },
  {
    label: "Sábado",
    value: "5",
  },
  {
    label: "Domingo",
    value: "6",
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

const fetchData = () => {};

const onClickFunction = () => {
  fetchData();
};

export default function DeviceSchedule({ dataPath, chartName, serverType }) {
  const [edit, setEdit] = useState(false);

  const onEdit = () => {
    setEdit(true);
  };

  const onCancel = () => {
    setEdit(false);
  };
  const onSubmit = () => {
    setEdit(false);
  };

  return (
    <Fragment>
      <strong className="text-gray-700 font-medium">{chartName}</strong>
      <div className="overflow:hidden w-full h-full p-4">
        {edit ? (
          <EditSchedule onCancel={onCancel} onSubmit={onSubmit} />
        ) : (
          <CurrentSchedule onEdit={onEdit} />
        )}
      </div>
    </Fragment>
  );
}

function WeekDaysDropdown() {
  return (
    <Cascader
      placeholder="Días de la semana"
      dropdownRender={dropdownRender}
      style={{
        width: "50%",
      }}
      options={options}
      onChange={onChange}
      multiple
      maxTagCount="responsive"
    />
  );
}

function CurrentSchedule({ onEdit }) {
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  return (
    <Fragment>
      <div className="pb-4">
        <div className="flex justify-center gap-4">
          <ul className="flex flex-row justify-center gap-4 list-none flex-wrap">
            {days.map((day, index) => (
              <li
                key={index}
                className={`w-9 h-9 flex items-center justify-center rounded-full select-none ${
                  index <= 4 ? "bg-komatsu-blue text-white" : "bg-komatsu-gray"
                }`}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center py-2">Horario: 08:00 - 17:00</div>
        <div className="flex justify-center py-2">Total de horas: 220</div>
        <div className="flex flex-row justify-center py-2">
          <GeneralButton onClickFunction={onEdit}>Editar</GeneralButton>
        </div>
      </div>
    </Fragment>
  );
}

function EditSchedule({ onSubmit, onCancel }) {
  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      <span> Nuevo Horario </span>
      <WeekDaysDropdown />
      <TimePicker.RangePicker use12Hours format="h:00 a" onChange={onChange} />

      <div className="flex flex-row justify-center py-2 space-x-2">
        <GeneralButton
          color="komatsu-blue-light"
          width={"50%"}
          onClickFunction={onCancel}
        >
          Cancelar
        </GeneralButton>
        <GeneralButton width={"50%"} onClickFunction={onSubmit}>
          Actualizar
        </GeneralButton>
      </div>
    </div>
  );
}
