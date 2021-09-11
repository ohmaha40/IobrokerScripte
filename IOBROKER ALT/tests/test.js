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
// let wert = 58983811;
// let wert2 = 13081924;
// let stunde = Math.round((((wert + wert2) / 1000) /60) /60);
// console.log(stunde);

// // let timer = setTimeout(async function (){console.log(timer)},2000);
// let a = new Date(0,0,0,17, 30, 0);
// console.log(a);

var standby_power, on_power, WON, wait, ts, actual_power, ts_temp, timeout;


createState("Waschmaschine.ON", function () {
});
createState("Waschmaschine.wait", function () {
});
createState("Waschmaschine.power_temp", function () {
});
createState("Waschmaschine.power_ts", function () {
});
createState("Waschmaschine.power", function () {
});
createState("Waschmaschine.power_year", function () {
});
on({id: "shelly.0.SHSW-PM#B1DE5C#1.Relay0.Power"/*Power*/, change: "ne"}, function (obj) {
  var value = obj.state.val;
  var oldValue = obj.oldState.val;
  standby_power = 3.5;
  // Wert, der beim Anschalten überschritten werden muss
  on_power = 10;
  WON = getState("javascript.0.Waschmaschine.ON").val;
  wait = getState("javascript.0.Waschmaschine.wait").val;
  ts = getState("shelly.0.SHSW-PM#B1DE5C#1.Relay0.Power").ts;
  actual_power = getState("shelly.0.SHSW-PM#B1DE5C#1.Relay0.Power").val;
  if (WON != true && actual_power > on_power) {
    // Waschmaschine ist jetzt angeschaltet
    setState("javascript.0.Waschmaschine.ON"/*Waschmaschine.ON*/, true, true);
    setState("javascript.0.Waschmaschine.wait"/*Waschmaschine.wait*/, false, true);
    setState("javascript.0.Waschmaschine.power_temp"/*Waschmaschine.power_temp*/, actual_power, true);
    setState("javascript.0.Waschmaschine.power_ts"/*Waschmaschine.power_ts*/, ts, true);
    setState("javascript.0.Waschmaschine.power"/*Waschmaschine.power*/, 0, true);
    console.log(('W1: anschalten' + String(actual_power)));
  } else if (wait == true && actual_power > on_power) {
    // an und power>onlimit
    console.log(('W:2 läuft und reset timer und twait ' + String(actual_power)));
    (function () {if (timeout) {clearTimeout(timeout); timeout = null;}})();
    setState("javascript.0.Waschmaschine.wait"/*Waschmaschine.wait*/, false, true);
  } else if (WON == true && wait != true && actual_power < standby_power) { // Leistung fällt auf Standby-Wert, Waschmaschine vielleicht fertig 
    setState("javascript.0.Waschmaschine.wait"/*Waschmaschine.wait*/, true, true); 
    console.log((['W3: Leistung Standby, starte Timer für Fertig-Meldung',actual_power,ts].join(''))); 
    timeout = setTimeout(function () { setState("javascript.0.Waschmaschine.ON"/*Waschmaschine.ON*/, false, true); 
    ts_temp = getState("javascript.0.Waschmaschine.power").val; 
    setState("javascript.0.Waschmaschine.power_year"/*Waschmaschine.power_year*/, (ts_temp + getState("javascript.0.Waschmaschine.power_year").val), true); }, 1200000); 
} else if (WON == true) { ts_temp = (new Date().getTime()) - getState("javascript.0.Waschmaschine.power_ts").val; 
    ts_temp = ts_temp / 1000; 
    ts_temp = ts_temp * getState("javascript.0.Waschmaschine.power_temp").val; 
    ts_temp = ts_temp / 3600; 
    setState("javascript.0.Waschmaschine.power_temp"/*Waschmaschine.power_temp*/, actual_power, true); 
    setState("javascript.0.Waschmaschine.power_ts"/*Waschmaschine.power_ts*/, ts, true); 
    setState("javascript.0.Waschmaschine.power"/*Waschmaschine.power*/, (ts_temp + getState("javascript.0.Waschmaschine.power").val), true); 
    console.log(('W4: Waschmaschine läuft' + String(getState("javascript.0.Waschmaschine.power").val))); } }); // Notifications werden auf Basis des Status Waschmaschine.ON versendet 
    on({id: "javascript.0.Waschmaschine.ON"/*Waschmaschine.ON*/, change: "ne"}, function (obj) { 
        var value = obj.state.val;
        var oldValue = obj.oldState.val; 
        if (getState("javascript.0.Waschmaschine.ON").val == false) { // Wechsel ON>OFF
    sendTo("pushover", "send", {
       message: (['Die Waschmaschine ist jetzt fertig!',' Verbrauch: ',Math.round(getState("javascript.0.Waschmaschine.power").val*10)/10].join('')),
       sound: ""
    });
  } else {
    // Wechsel ON>OFF
    sendTo("pushover", "send", {
       message: 'Die Waschmaschine läuft jetzt!',
       sound: ""
    });
  }
});