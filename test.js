"use strict"
let h = [[40,40,50,50,50,60,70,70,70,80,80,80,90,90,100,100,100,90,90,80,70,60,50,40],[2200,2200,2200,2200,2200,2300,2600,2600,2600,2900,3500,4100,4500,5000,5300,5300,5300,5000,4100,3500,2900,2300,2200,2200]];
let helligkeit_aktuell = h[0][h.length - (h.length - (new Date().getHours()))];
let farbe_aktuell = h[1][h.length - (h.length - (new Date().getHours()))];

console.log(helligkeit_aktuell);
console.log(farbe_aktuell);