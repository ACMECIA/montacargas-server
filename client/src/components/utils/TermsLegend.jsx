import React from "react";

export default function TermsLegend({ chartName }) {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-2 w-full ">
      <strong className="text-gray-700 font-medium">{chartName}</strong>

      <div className="mt-5 mx-2 items-justify flex flex-col text-sm">
        <p className="mb-1 text-xs">
          <strong>Proceso Administrativo (Equipo Apagado):</strong> Se considera
          cuando el montacarga esta apagado (Señal de encendido apagada).
        </p>
        <p className="mb-0.5 text-xs">
          <strong>Inoperativo:</strong> Se considera cuando el equipo activó el
          Switch de mantenimiento.
        </p>
        <p className="mb-0.5 text-xs">
          <strong>Espera sin carga:</strong> Se considera al encontrase en un
          mismo lugar (sin movimiento) sin carga.
        </p>
        <p className="mb-0.5 text-xs">
          <strong>Espera con carga:</strong> Se considera al encontrase en un
          mismo lugar (sin movimiento) con carga.
        </p>
        <p className="mb-0.5 text-xs">
          <strong>Traslado sin carga:</strong> Se considera al encontrarse en
          movimiento y sin carga.
        </p>
        <p className="mb-0.5 text-xs">
          <strong>Traslado con carga:</strong> Se considera efectivo cuando el
          montacarga se encuentra en movimiento y con carga.
        </p>

        <p className="mb-0.5 text-xs">
          <strong>Uso:</strong> Se considera cuando realiza trabajos que
          impliquen movimiento o carga
        </p>
        <p className="mb-0.5 text-xs">
          <strong>No uso:</strong> Se considera cuando no se están realizando
          trabajos.
        </p>
        <p className="mb-0.5 text-xs">
          <strong>Efectivo:</strong> Se considera cuando está en uso con carga
          mayor igual a 2 Tn.
        </p>
        <p className="mb-0.5 text-xs">
          <strong>Frecuencia de uso</strong> = Tiempo de Uso / Tiempo total *
          100
        </p>

        <p className="mb-0.5 text-xs">
          <strong>Frecuencia efectiva de uso</strong> = Tiempo efectivo / Tiempo
          total * 100
        </p>
        <p className="mb-0.5 text-xs">
          <strong>Porcentaje efectivo</strong> = Frecuencia efectiva de uso /
          Frecuencia de uso * 100
        </p>
      </div>
    </div>
  );
}
