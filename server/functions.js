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
  let rindex = 0;

  // Declaramos el primer valor de resultado
  resultado[rindex] = {
    fInit: new Date(arr[0].timestamp),
    fEnd: new Date(arr[0].timestamp),
    state: arr[0].gstate,
    hours: 0,
    month: monthNames[new Date(arr[0].timestamp).getMonth()],
  };
  rindex++;

  for (let i = 1; i < arr.length; i++) {
    // if (arr[i].gstate == -1) {
    //   continue; // Ignorar intervalos con gstate igual a -1
    // }
    if (arr[i].gstate !== arr[i - 1].gstate) {
      // Cada que hay un cambio declaramos el nuevo item

      resultado[rindex] = {
        fInit: new Date(arr[i].timestamp),
        fEnd: new Date(arr[i].timestamp),
        state: arr[i].gstate,
        hours: 0,
        month: monthNames[new Date(arr[i].timestamp).getMonth()],
      };

      // Y con ello actualizamos el item anterior
      resultado[rindex - 1].fEnd = new Date(arr[i].timestamp);
      resultado[rindex - 1].hours =
        (resultado[rindex - 1].fEnd.getTime() -
          resultado[rindex - 1].fInit.getTime()) /
        (60 * 60 * 1000);

      rindex++;
    }
  }

  // Itera en resultado y elimina donde haya gstate === -1
  resultado = resultado.filter((item) => item.state !== -1);
  return resultado;
}

export function monthlyRepetitionStates(arr) {
  // declara un array con 6 arrays dentro, uno para cada estado, con valores iniciales de 0
  let horasPorMes = new Array(6).fill(0).map(() => new Array(12).fill(0));
  let resultado = [];
  let rindex = 0;
  // Declaramos el primer valor de resultado
  resultado[rindex] = {
    fInit: new Date(arr[0].timestamp),
    fEnd: new Date(arr[0].timestamp),
    state: arr[0].state,
    hours: 0,
    month: monthNames[new Date(arr[0].timestamp).getMonth()],
  };
  rindex++;

  for (let i = 1; i < arr.length; i++) {
    // if (arr[i].state == -1) {
    //   continue; // Ignorar intervalos con state igual a -1
    // }
    if (arr[i].state !== arr[i - 1].state) {
      // Cada que hay un cambio declaramos el nuevo item
      resultado[rindex] = {
        fInit: new Date(arr[i].timestamp),
        fEnd: new Date(arr[i].timestamp),
        state: arr[i].state,
        hours: 0,
        month: new Date(arr[i].timestamp).getMonth(),
      };

      // Y con ello actualizamos el item anterior
      resultado[rindex - 1].fEnd = new Date(arr[i].timestamp);
      resultado[rindex - 1].hours =
        (resultado[rindex - 1].fEnd.getTime() -
          resultado[rindex - 1].fInit.getTime()) /
        (60 * 60 * 1000);

      // Actualizamos las horas acumuladas

      if (resultado[rindex - 1].state !== -1) {
        horasPorMes[resultado[rindex - 1].state][resultado[rindex - 1].month] +=
          resultado[rindex - 1].hours;
      }
      // console.log(horasPorMes);
      rindex++;
    }
  }
  // Filtra donde state sea -1
  return horasPorMes;
}

export function cumulatedMonthly(arr, maxHours = 220) {
  // declara un array con 6 arrays dentro, uno para cada estado, con valores iniciales de 0
  let horasPorMes = new Array(6).fill(0).map(() => new Array(12).fill(0));
  let resultado = [];
  let rindex = 0;
  // Declaramos el primer valor de resultado
  resultado[rindex] = {
    fInit: new Date(arr[0].timestamp),
    fEnd: new Date(arr[0].timestamp),
    state: arr[0].state,
    hours: 0,
    month: new Date(arr[0].timestamp).getMonth(),
  };
  rindex++;

  let array1 = new Array(12);
  let array2 = new Array(12);
  let array3 = new Array(12);

  for (let i = 1; i < arr.length; i++) {
    // if (arr[i].state == -1) {
    //   continue; // Ignorar intervalos con state igual a -1
    // }
    if (arr[i].state !== arr[i - 1].state) {
      // Cada que hay un cambio declaramos el nuevo item
      resultado[rindex] = {
        fInit: new Date(arr[i].timestamp),
        fEnd: new Date(arr[i].timestamp),
        state: arr[i].state,
        hours: 0,
        month: new Date(arr[i].timestamp).getMonth(),
      };

      // Y con ello actualizamos el item anterior
      resultado[rindex - 1].fEnd = new Date(arr[i].timestamp);
      resultado[rindex - 1].hours =
        (resultado[rindex - 1].fEnd.getTime() -
          resultado[rindex - 1].fInit.getTime()) /
        (60 * 60 * 1000);

      // Actualizamos las horas acumuladas
      if (resultado[rindex - 1].state !== -1) {
        horasPorMes[resultado[rindex - 1].state][resultado[rindex - 1].month] +=
          resultado[rindex - 1].hours;
      }

      // console.log(horasPorMes);
      rindex++;
    }
  }
  // Sum the three last arrays on array1 and get the percent with respect to maxHours elementwise
  array1 = horasPorMes[3].map((x, i) => {
    return (100 * (x + horasPorMes[4][i] + horasPorMes[5][i])) / maxHours;
  });

  // console.log(horasPorMes);
  // Array2 is the last array and get the percent with respect to maxHours elementwise
  array2 = horasPorMes[5].map((x) => (100 * x) / maxHours);

  // array3 is the division of array2 / array1 elementwise
  array3 = array2.map((x, i) => (100 * x) / array1[i]);

  // return the three arrays
  return [array1, array2, array3];
}

export function cumulatedStateHours(arr, state) {
  // declara un array con 6 arrays dentro, uno para cada estado, con valores iniciales de 0
  let horasPorMes = new Array(6).fill(0).map(() => new Array(12).fill(0));
  let resultado = [];
  let rindex = 0;
  // Declaramos el primer valor de resultado
  resultado[rindex] = {
    fInit: new Date(arr[0].timestamp),
    fEnd: new Date(arr[0].timestamp),
    state: arr[0].state,
    hours: 0,
    month: new Date(arr[0].timestamp).getMonth(),
  };
  rindex++;

  let array1 = new Array(12);

  for (let i = 1; i < arr.length; i++) {
    // if (arr[i].state == -1) {
    //   continue; // Ignorar intervalos con state igual a -1
    // }
    if (arr[i].state !== arr[i - 1].state) {
      // Cada que hay un cambio declaramos el nuevo item
      resultado[rindex] = {
        fInit: new Date(arr[i].timestamp),
        fEnd: new Date(arr[i].timestamp),
        state: arr[i].state,
        hours: 0,
        month: new Date(arr[i].timestamp).getMonth(),
      };

      // Y con ello actualizamos el item anterior
      resultado[rindex - 1].fEnd = new Date(arr[i].timestamp);
      resultado[rindex - 1].hours =
        (resultado[rindex - 1].fEnd.getTime() -
          resultado[rindex - 1].fInit.getTime()) /
        (60 * 60 * 1000);

      // Actualizamos las horas acumuladas
      if (resultado[rindex - 1].state !== -1) {
        horasPorMes[resultado[rindex - 1].state][resultado[rindex - 1].month] +=
          resultado[rindex - 1].hours;
      }

      console.log(horasPorMes);
      rindex++;
    }
  }

  // Obtenemos el inoperativo
  array1 = horasPorMes[state];

  // return the three arrays
  return array1;
}

export function countCorrectiveMaintenance(arr) {
  return arr;
}
