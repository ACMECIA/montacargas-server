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

// export function getStateInformation(arr) {
//   let resultado = [];
//   let rindex = 0;

//   // Declaramos el primer valor de resultado
//   resultado[rindex] = {
//     fInit: new Date(arr[0].timestamp),
//     fEnd: new Date(arr[0].timestamp),
//     state: arr[0].gstate,
//     hours: 0,
//     month: monthNames[new Date(arr[0].timestamp).getMonth()],
//   };
//   rindex++;

//   for (let i = 1; i < arr.length; i++) {
//     // if (arr[i].gstate == -1) {
//     //   continue; // Ignorar intervalos con gstate igual a -1
//     // }
//     if (arr[i].gstate !== arr[i - 1].gstate) {
//       // Cada que hay un cambio declaramos el nuevo item

//       resultado[rindex] = {
//         fInit: new Date(arr[i].timestamp),
//         fEnd: new Date(arr[i].timestamp),
//         state: arr[i].gstate,
//         hours: 0,
//         month: monthNames[new Date(arr[i].timestamp).getMonth()],
//       };

//       // Y con ello actualizamos el item anterior
//       resultado[rindex - 1].fEnd = new Date(arr[i].timestamp);
//       resultado[rindex - 1].hours =
//         (resultado[rindex - 1].fEnd.getTime() -
//           resultado[rindex - 1].fInit.getTime()) /
//         (60 * 60 * 1000);

//       rindex++;
//     }
//   }

//   // Itera en resultado y elimina donde haya gstate === -1
//   resultado = resultado.filter((item) => item.state !== -1);
//   return resultado;
// }

export function getStateInformation(arr) {
  let resultado = [];
  let rindex = 0;

  let vstate = [];
  // vstate tambien puede ser -1

  vstate[0] = arr[0].state > 1 ? 1 : 0;
  if (arr[0].state === -1) {
    vstate[0] = -1;
  }

  // Declaramos el primer valor de resultado
  resultado[rindex] = {
    fInit: new Date(arr[0].timestamp),
    fEnd: new Date(arr[0].timestamp),
    state: vstate[0],
    hours: 0,
    month: monthNames[new Date(arr[0].timestamp).getMonth()],
  };
  rindex++;

  for (let i = 1; i < arr.length; i++) {
    vstate[i] = arr[i].state > 1 ? 1 : 0;
    if (arr[i].state === -1) {
      vstate[i] = -1;
    }
    // if (arr[i].gstate == -1) {
    //   continue; // Ignorar intervalos con gstate igual a -1
    // }
    if (vstate[i] !== vstate[i - 1]) {
      // Cada que hay un cambio declaramos el nuevo item

      resultado[rindex] = {
        fInit: new Date(arr[i].timestamp),
        fEnd: new Date(arr[i].timestamp),
        state: vstate[i],
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

// export function cumulatedMonthly(arr, maxHours = 220) {
//   // declara un array con 7 arrays dentro, uno para cada estado, con valores iniciales de 0
//   // el 7 es para efectivo
//   let horasPorMes = new Array(7).fill(0).map(() => new Array(12).fill(0));
//   // let horasEfectivas = new Array(12).fill(0);
//   let resultado = [];
//   let rindex = 0;
//   let sumArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//   if (arr[0].carga >= 2 && arr[0].state >= 3) {
//     arr[0].state = 6;
//   }
//   // Declaramos el primer valor de resultado
//   resultado[rindex] = {
//     fInit: new Date(arr[0].timestamp),
//     fEnd: new Date(arr[0].timestamp),
//     state: arr[0].state,
//     hours: 0,
//     month: new Date(arr[0].timestamp).getMonth(),
//   };
//   rindex++;

//   let array1 = new Array(12);
//   let array2 = new Array(12);
//   let array3 = new Array(12);

//   for (let i = 1; i < arr.length; i++) {
//     // if (arr[i].state == -1) {
//     //   continue; // Ignorar intervalos con state igual a -1
//     // }
//     // Obtenemos el efectivo
//     if (arr[i].carga >= 2 && arr[i].state >= 3) {
//       arr[i].state = 6;
//     }
//     if (arr[i].state !== arr[i - 1].state) {
//       // Cada que hay un cambio declaramos el nuevo item
//       resultado[rindex] = {
//         fInit: new Date(arr[i].timestamp),
//         fEnd: new Date(arr[i].timestamp),
//         state: arr[i].state,
//         hours: 0,
//         month: new Date(arr[i].timestamp).getMonth(),
//       };

//       // Y con ello actualizamos el item anterior
//       resultado[rindex - 1].fEnd = new Date(arr[i].timestamp);
//       resultado[rindex - 1].hours =
//         (resultado[rindex - 1].fEnd.getTime() -
//           resultado[rindex - 1].fInit.getTime()) /
//         (60 * 60 * 1000);

//       // Actualizamos las horas acumuladas
//       if (resultado[rindex - 1].state !== -1) {
//         horasPorMes[resultado[rindex - 1].state][resultado[rindex - 1].month] +=
//           resultado[rindex - 1].hours;
//       }

//       // console.log(horasPorMes);
//       rindex++;
//     }
//   }
//   // Get the sum of hours of the 6 states

//   console.log(horasPorMes);
//   // sum the 6 arrays and get 1 12 array with the total hours per month
//   sumArray = horasPorMes[0].map((x, i) => {
//     return (
//       x +
//       horasPorMes[1][i] +
//       horasPorMes[2][i] +
//       horasPorMes[3][i] +
//       horasPorMes[4][i] +
//       horasPorMes[5][i]
//     );
//   });
//   // console.log(sumArray);

//   // Sum the three use state arrays and get the percent with respect to the sumArray elementwise
//   array1 = horasPorMes[3].map((x, i) => {
//     return (100 * (x + horasPorMes[4][i] + horasPorMes[5][i])) / sumArray[i];
//   });

//   // console.log(horasPorMes);
//   // Array2 is the last array and get the percent with respect to maxHours elementwise
//   array2 = horasPorMes[6].map((x, i) => (100 * x) / sumArray[i]);

//   // array3 is the division of array2 / array1 elementwise
//   array3 = array2.map((x, i) => (100 * x) / array1[i]);

//   // return the three arrays
//   return [array1, array2, array3];
// }

export function cumulatedMonthly(arr, maxHours = 220) {
  // declara un array con 7 arrays dentro, uno para cada estado, con valores iniciales de 0
  // el 7 es para efectivo
  let horasPorMes = new Array(7).fill(0).map(() => new Array(12).fill(0));
  // let horasEfectivas = new Array(12).fill(0);
  let resultado = [];
  let rindex = 0;

  let resultado2 = [];
  let rindex2 = 0;
  let sumArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (arr[0].carga >= 2 && arr[0].state >= 3) {
    arr[0]["efecstate"] = 6;
  } else {
    arr[0]["efecstate"] = 0;
  }
  // Declaramos el primer valor de resultado
  resultado[rindex] = {
    fInit: new Date(arr[0].timestamp),
    fEnd: new Date(arr[0].timestamp),
    state: arr[0].state,
    efecstate: arr[0]["efecstate"],
    hours: 0,
    month: new Date(arr[0].timestamp).getMonth(),
  };
  rindex++;

  resultado2[rindex2] = {
    fInit: new Date(arr[0].timestamp),
    fEnd: new Date(arr[0].timestamp),
    efecstate: arr[0]["efecstate"],
    hours: 0,
    month: new Date(arr[0].timestamp).getMonth(),
  };
  rindex2++;

  let array1 = new Array(12);
  let array2 = new Array(12);
  let array3 = new Array(12);

  for (let i = 1; i < arr.length; i++) {
    // if (arr[i].state == -1) {
    //   continue; // Ignorar intervalos con state igual a -1
    // }
    // Obtenemos el efectivo
    if (arr[i].carga >= 2 && arr[i].state >= 3) {
      arr[i]["efecstate"] = 6;
    } else {
      arr[i]["efecstate"] = 0;
    }
    if (arr[i].state !== arr[i - 1].state) {
      // Cada que hay un cambio declaramos el nuevo item
      resultado[rindex] = {
        fInit: new Date(arr[i].timestamp),
        fEnd: new Date(arr[i].timestamp),
        state: arr[i].state,
        efecstate: arr[i]["efecstate"],
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
  for (let i = 1; i < arr.length; i++) {
    // if (arr[i].state == -1) {
    //   continue; // Ignorar intervalos con state igual a -1
    // }
    // Obtenemos el efectivo
    if (arr[i].carga >= 2 && arr[i].state >= 3) {
      arr[i]["efecstate"] = 6;
    } else {
      arr[i]["efecstate"] = -1;
    }
    if (arr[i].efecstate !== arr[i - 1].efecstate) {
      // Cada que hay un cambio declaramos el nuevo item
      resultado2[rindex2] = {
        fInit: new Date(arr[i].timestamp),
        fEnd: new Date(arr[i].timestamp),
        efecstate: arr[i]["efecstate"],
        hours: 0,
        month: new Date(arr[i].timestamp).getMonth(),
      };

      // Y con ello actualizamos el item anterior
      resultado2[rindex2 - 1].fEnd = new Date(arr[i].timestamp);
      resultado2[rindex2 - 1].hours =
        (resultado2[rindex2 - 1].fEnd.getTime() -
          resultado2[rindex2 - 1].fInit.getTime()) /
        (60 * 60 * 1000);

      // Actualizamos las horas acumuladas
      if (resultado2[rindex2 - 1].efecstate !== -1) {
        horasPorMes[resultado2[rindex2 - 1].efecstate][
          resultado2[rindex2 - 1].month
        ] += resultado2[rindex2 - 1].hours;
      }

      // console.log(horasPorMes);
      rindex2++;
    }
  }
  // Get the sum of hours of the 6 states

  // console.log(horasPorMes);
  // sum the 6 arrays and get 1 12 array with the total hours per month
  sumArray = horasPorMes[0].map((x, i) => {
    return (
      x +
      horasPorMes[1][i] +
      horasPorMes[2][i] +
      horasPorMes[3][i] +
      horasPorMes[4][i] +
      horasPorMes[5][i]
    );
  });
  // console.log(sumArray);

  // Sum the three use state arrays and get the percent with respect to the sumArray elementwise
  array1 = horasPorMes[3].map((x, i) => {
    return (100 * (x + horasPorMes[4][i] + horasPorMes[5][i])) / sumArray[i];
  });

  // console.log(horasPorMes);
  // Array2 is the last array and get the percent with respect to maxHours elementwise
  array2 = horasPorMes[6].map((x, i) => (100 * x) / sumArray[i]);

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

      // console.log(horasPorMes);
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
