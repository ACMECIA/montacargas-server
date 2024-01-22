import React, { Fragment, useEffect, useState } from "react";
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
    value: 1,
  },
  {
    label: "Martes",
    value: 2,
  },
  {
    label: "Miercoles",
    value: 3,
  },
  {
    label: "Jueves",
    value: 4,
  },
  {
    label: "Viernes",
    value: 5,
  },
  {
    label: "Sábado",
    value: 6,
  },
  {
    label: "Domingo",
    value: 0,
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

export default function DeviceSchedule({ dataPath, chartName, serverType }) {
  const [edit, setEdit] = useState(false);
  const [weekdays, setWeekdays] = useState([0, 1, 1, 1, 1, 1, 0]);
  const [initHour, setInitHour] = useState(8);
  const [endHour, setEndHour] = useState(18);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    if (!isFetching) {
      setIsFetching(true);
      fetch(`api/${serverType}/${dataPath}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setWeekdays(data.weekdays);
          setInitHour(data.initHour);
          setEndHour(data.endHour);
          setIsFetching(false);

          // setPosts(data);
        })
        .catch((err) => {
          console.log(err.message);
          setIsFetching(false);
        });
    }
  };

  const fetchEdit = async (values) => {
    if (!isFetching) {
      setIsFetching(true);
      const res = await fetch(`api/${serverType}/${dataPath}/edit`, {
        method: "POST",
        body: JSON.stringify({ values }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      fetchData();
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onEdit = () => {
    setEdit(true);
  };

  const onCancel = () => {
    setEdit(false);
  };
  const onSubmit = (weekdaysIndex, hours) => {
    return () => {
      var indexes = weekdaysIndex.map((day, index) => day[0]);

      // With the indexes array, i want weekdays array of 1 and 0
      var weekdays = [0, 0, 0, 0, 0, 0, 0];
      indexes.forEach((index) => {
        weekdays[index] = 1;
      });
      console.log(hours);
      // Get the hours as numbers
      var initHour = parseInt(hours[0].hour());
      var endHour = parseInt(hours[1].hour());

      fetchEdit({ weekdays, initHour, endHour });

      setEdit(false);
    };
  };

  return (
    <Fragment>
      <strong className="text-gray-700 font-medium">{chartName}</strong>
      <div className="overflow:hidden w-full h-full p-4">
        {edit ? (
          <EditSchedule onCancel={onCancel} onSubmit={onSubmit} />
        ) : (
          <CurrentSchedule
            onEdit={onEdit}
            weekdays={weekdays}
            initHour={initHour}
            endHour={endHour}
          />
        )}
      </div>
    </Fragment>
  );
}

function WeekDaysDropdown({ onChange }) {
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

function CurrentSchedule({ onEdit, weekdays, initHour, endHour }) {
  const days = ["D", "L", "M", "M", "J", "V", "S"];
  const sumDays = weekdays.reduce((a, b) => a + b, 0);
  const totalHours = 4 * sumDays * (endHour - initHour);

  return (
    <Fragment>
      <div className="pb-4">
        <div className="flex justify-center gap-4">
          <ul className="flex flex-row justify-center gap-4 list-none flex-wrap">
            {days.map((day, index) => (
              <li
                key={index}
                className={`w-9 h-9 flex items-center justify-center rounded-full select-none ${
                  weekdays[index]
                    ? "bg-komatsu-blue text-white"
                    : "bg-komatsu-gray"
                }`}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center py-2">
          Horario: {initHour}:00 - {endHour}:00
        </div>
        <div className="flex justify-center py-2">
          Total de horas mensuales: {totalHours} h
        </div>
        <div className="flex flex-row justify-center py-2">
          <GeneralButton onClickFunction={onEdit}>Editar</GeneralButton>
        </div>
      </div>
    </Fragment>
  );
}

function EditSchedule({ onSubmit, onCancel }) {
  const [weekdays, setWeekdays] = useState([0, 1, 1, 1, 1, 1, 0]);
  const [hours, setHours] = useState([]);

  const onChangeDropdown = (value) => {
    setWeekdays(value);

    // get an array of the weekdays by the index
  };

  const onChangeHours = (value) => {
    // console.log(value);
    setHours(value);
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      <span> Nuevo Horario </span>
      <WeekDaysDropdown onChange={onChangeDropdown} />
      <TimePicker.RangePicker
        use12Hours
        format="h:00 a"
        onChange={onChangeHours}
      />

      <div className="flex flex-row justify-center py-2 space-x-2">
        <GeneralButton
          color="komatsu-blue-light"
          width={"50%"}
          onClickFunction={onCancel}
        >
          Cancelar
        </GeneralButton>
        <GeneralButton
          width={"50%"}
          onClickFunction={onSubmit(weekdays, hours)}
        >
          Actualizar
        </GeneralButton>
      </div>
    </div>
  );
}
