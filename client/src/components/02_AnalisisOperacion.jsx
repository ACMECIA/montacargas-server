import React from "react";
import BarChart from "./charts/BarChart";
import HeatMapAntChart from "./charts/HeatMapAntChart2";
import Box from "./shared/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EstatusMensual2() {
  // const [name, setName] = useState("");
  // const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8081")
  //     .then((res) => {
  //       if (res.data.valid) {
  //         setName(res.data.username);
  //       } else {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <div className="grid grid-cols w-full gap-4 p-4">
      <div className="col-span-1 flex flex-row gap-4 ">
        {/* 
      <div className="flex flex-col gap-4 px-4 py-4 ">
      <div className="flex flex-row gap-4 w-full"> */}
        <Box>
          <HeatMapAntChart
            serverType={"charts"}
            chartName={"Heatmap 1 (Repeticiones)"}
            dataPath={"heat1"}
            dataRate={10000}
            heatColors="#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF"
            statusFilter={[
              { value: 2, label: "En espera sin carga" },
              { value: 3, label: "En espera con carga" },
              { value: 4, label: "Traslado sin carga" },
              { value: 5, label: "Traslado con carga" },
              { value: 6, label: "Efectivo" },
            ]}
          />
        </Box>

        <Box>
          <HeatMapAntChart
            serverType={"charts"}
            chartName={"Heatmap 2 (Promedio de Pesos)"}
            dataPath={"heat11"}
            dataRate={10000}
            heatColors="#6E32C2-#1890FF-#12CCCC-#80FF73-#FAFFA8-#FFC838-#FF8C12-#FA541C-#F51D27"
            statusFilter={[
              { value: 3, label: "En espera con carga" },
              { value: 5, label: "Traslado con carga" },
              { value: 6, label: "Efectivo" },
            ]}
          />
        </Box>
      </div>

      {/* <div className="col-span-1 flex flex-col gap-4">
        <Box>
          <HeatMapAntChart
          serverType={"charts"}
            chartName={"Heatmap 2 (Repeticiones)"}
            dataPath={"heat2"}
          />
        </Box>

        <Box>
          <HeatMapAntChart
            serverType={"charts"}
            chartName={"Heatmap 2-2 (Promedio Peso)"}
            dataPath={"heat22"}
            dataRate={10000}
          />
        </Box>
      </div> */}
    </div>
  );
}
