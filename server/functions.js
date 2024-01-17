var monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function getStateInformation(arr) {
  let resultado = [];
  let inicio = 0;

  for (let i = 1; i <= arr.length; i++) {
    if (!arr[i] || arr[i].gstate !== arr[i - 1]?.gstate) {
      const fin = i - 1;
      const state = arr[inicio]?.gstate;
      const repeticiones = fin - inicio + 1;

      // Verifica que existan los timestamps antes de crear los objetos Date
      const fInit = arr[inicio]?.timestamp
        ? new Date(arr[inicio].timestamp)
        : null;
      const fEnd = arr[fin]?.timestamp ? new Date(arr[fin].timestamp) : null;

      const hours = fInit && fEnd ? (fEnd - fInit) / (60 * 60 * 1000) : null;
      const month = fInit ? monthNames[fInit.getMonth()] : null;

      resultado.push({
        fInit,
        fEnd,
        repeticiones,
        state,
        month,
        hours,
      });

      inicio = i;
    }
  }

  return resultado;
}

// Función para obtener un array con la cantidad de repeticiones por mes
export function monthlyRepetitionState(data, attribute, estado) {
  // Inicializar el array de resultados con 12 elementos, uno para cada mes
  var repeticionesPorMes = new Array(12).fill(0);

  // Iterar sobre cada objeto en el array de datos
  data.forEach(function (item) {
    // Verificar si el estado es igual al estado proporcionado como parámetro
    if (Number(item[attribute]) === estado) {
      // Obtener el objeto Date desde el timestamp
      var fecha = new Date(item.timestamp);

      // Obtener el mes (0-11) y actualizar el contador en el array de resultados
      repeticionesPorMes[fecha.getMonth()]++;
    }
  });

  return repeticionesPorMes;
}

export function monthlyRepetitionStates(arr) {
  // declara un array con 6 arrays dentro, uno para cada estado, con valores iniciales de 0
  let repeticionesPorMes = new Array(6)
    .fill(0)
    .map(() => new Array(12).fill(0));

  let inicio = 0;

  for (let i = 1; i <= arr.length; i++) {
    if (!arr[i] || arr[i].state !== arr[i - 1]?.state) {
      const fin = i - 1;
      const state = arr[inicio]?.state;
      // const repeticiones = fin - inicio + 1;

      // Verifica que existan los timestamps antes de crear los objetos Date
      const fInit = arr[inicio]?.timestamp
        ? new Date(arr[inicio].timestamp)
        : null;
      const fEnd = arr[fin]?.timestamp ? new Date(arr[fin].timestamp) : null;

      const hours = fInit && fEnd ? (fEnd - fInit) / (60 * 60 * 1000) : null;
      // const month = fInit ? monthNames[fInit.getMonth()] : null;

      // add hours to state and month
      repeticionesPorMes[state][fInit.getMonth()] += hours;

      inicio = i;
    }
  }

  return repeticionesPorMes;
}
