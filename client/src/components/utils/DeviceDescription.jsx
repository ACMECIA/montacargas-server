import React, { useState } from "react";
import { useEffect } from "react";
import { getHostPath } from "../../utils/host";
import useLocalStorage from "use-local-storage";

export default function Description({ chartName, dataPath, dataRate = 10000 }) {
  const [status, setStatus] = useLocalStorage(`${dataPath}`, false);

  let isFetching = false;

  const fetchData = () => {
    if (!isFetching) {
      isFetching = true;
      fetch(getHostPath(dataPath))
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          isFetching = false;
        })
        .catch((err) => {
          console.log(err.message);
          setStatus(false); // Valor por defecto
          isFetching = false;
        });
    }
  };

  useEffect(() => {
    // Ejecutar fetchData inicialmente
    fetchData();

    // Configurar un intervalo para ejecutar fetchData cada 500 milisegundos
    const intervalId = setInterval(fetchData, dataRate);

    // Limpieza cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-2 w-full">
      <strong className="text-gray-700 font-medium">{chartName}</strong>

      <div className="mt-10  mx-20   items-justify flex flex-col">
        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Equipo: </div>
          <div className="flex flex-1 ">Montacargas</div>
        </div>
        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Marca: </div>
          <div className="flex flex-1 ">TOYOTA 4.5 TN</div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Modelo: </div>
          <div className="flex flex-1 ">02-7FG45 N/S</div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Bastidor: </div>
          <div className="flex flex-1 ">A7FGA50-51912</div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Cod. Activo: </div>
          <div className="flex flex-1 ">KM0061657</div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Tonelaje: </div>
          <div className="flex flex-1 ">4.5</div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Estatus: </div>
          <div className={`flex flex-1  ${status ? "text-green-700" : ""}`}>
            {status ? "Operando" : "Detenido"}
          </div>
        </div>

        <div className="flex flex-row my-5">
          <div className="flex flex-1 mr-10">Horómetro: </div>
          <div className="flex flex-1 text-komatsu-blue text-xl">
            <Hourmeter dataRate={6000} dataPath={"hourmeter"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hourmeter({ dataPath, dataRate = 1000 }) {
  // const [minutes, setMinutes] = useLocalStorage(`${dataPath}`, 0);
  // const [hours, setHours] = useLocalStorage(`${dataPath}2`, 0);

  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch(getHostPath(dataPath))
        .then((res) => res.json())
        .then((data) => {
          setMinutes(data.minutes);
          setHours(data.hours);
        })
        .catch((err) => {
          console.log(err.message);
          setMinutes(0); // Valor por defecto
          setHours(0); // Valor por defecto
        });
    };
    // Ejecutar fetchData inicialmente
    fetchData();

    // Configurar un intervalo para ejecutar fetchData cada 500 milisegundos
    const intervalId = setInterval(fetchData, dataRate);

    // Limpieza cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Función para formatear los minutos y las horas con dos dígitos
  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <div className="flex flex-row">
      <div className="hour">
        <span id="hourDisplay">{formatTime(hours)}</span>
      </div>
      <div className="separator">:</div>
      <div className="minute">
        <span id="minuteDisplay">{formatTime(minutes)}</span>
      </div>
    </div>
  );
}
