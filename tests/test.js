"use strict";
// let h = [[40,40,50,50,50,60,70,70,70,80,80,80,90,90,100,100,100,90,90,80,70,60,50,40],[2200,2200,2200,2200,2200,2300,2600,2600,2600,2900,3500,4100,4500,5000,5300,5300,5300,5000,4100,3500,2900,2300,2200,2200]];
// let helligkeit_aktuell = h[0][h.length - (h.length - (new Date().getHours()))];
// let farbe_aktuell = h[1][h.length - (h.length - (new Date().getHours()))];

// console.log(helligkeit_aktuell);
// console.log(farbe_aktuell);

// <== für daten aus Influxdb lesen (Trockner, Waschmaschine) 
// let test_zeitstempel = new Date("2021-02-06T11:47:06.453Z");
// let datum = new Date();
// if (test_zeitstempel.getMonth() == datum.getMonth()) {
//     console.log("passt");
// } else {
//     console.log("passt nicht!");
// }
// console.log(datum.getMonth());
// console.log(datum.getMonth()-1);
// console.log(datum.getMonth()-2);
// console.log(datum.getMonth()-3);

// let end = new Date(Date.now()).toLocaleDateString("de-DE", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit"
// });
// console.log(end);
let wert = 58983811;
let wert2 = 13081924;
let stunde = Math.round((((wert + wert2) / 1000) /60) /60);
console.log(stunde);

let timer = setTimeout(async function (){console.log(timer)},2000);