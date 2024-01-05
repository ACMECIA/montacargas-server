import React from "react";
import { Checkbox } from "antd";
import { Select } from "antd";

// import getOrderStatus from "./lib/utils";
const recentMaintenance = [
  {
    id: "1",
    fecha: "05/01/2023",
    hora: "18:42",
    tipo_alerta: "Batería baja",
    cod_activo: "KM061657",
    horometro: "125",
    tonelaje: "4.5",
    tipo_mantenimiento: "",
    checklist: "",
    comentarios: "",
  },
  {
    id: "2",
    fecha: "04/01/2023",
    hora: "09:42",
    tipo_alerta: "Mantenimiento - Fin",
    cod_activo: "KM061657",
    horometro: "125",
    tonelaje: "4.5",
    tipo_mantenimiento: "",
    checklist: <Checkbox />,
    comentarios: "Mtto 125 planificado",
  },

  {
    id: "3",
    fecha: "03/01/2023",
    hora: "06:30",
    tipo_alerta: "Mantenimiento - Inicio",
    cod_activo: "KM061657",
    horometro: "125",
    tonelaje: "4.5",
    tipo_mantenimiento: <SelectState label={"Tipo mantenimiento"} />,
    checklist: <Checkbox />,
    comentarios: "Mtto 125 planificado",
  },
];

export default function RecentOrders({ tableName }) {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">{tableName}</strong>
      <div className="mt-3">
        <table className="w-full text-grey-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr>
              <td>Fecha</td>
              <td>Hora</td>
              <td>Tipo de Alerta</td>
              <td>Cod. Activo</td>
              <td>Horómetro</td>
              <td>Tonelaje</td>
              <td>Tipo de Mantenimiento</td>
              <td>Checklist</td>
              <td>Comentarios</td>
            </tr>
          </thead>
          <tbody>
            {recentMaintenance.map((row) => (
              <tr key={row.id}>
                <td>{row.fecha}</td>
                <td>{row.hora}</td>
                <td>{row.tipo_alerta}</td>
                <td>{row.cod_activo}</td>
                <td>{row.horometro}</td>
                <td>{row.tonelaje}</td>
                <td>{row.tipo_mantenimiento}</td>
                <td>{row.checklist}</td>
                <td>{row.comentarios}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SelectState({ label, width, value, onChange }) {
  const handleChange = (val) => {
    let current = value ? [...value] : "";
    current = val;
    // onChange(current);
  };

  return (
    <Select
      placeholder={label}
      style={{ width: width }}
      onChange={handleChange}
      options={[
        { value: "correctivo", label: "Correctivo" },
        { value: "preventivo", label: "Preventivo" },
      ]}
    />
  );
}
