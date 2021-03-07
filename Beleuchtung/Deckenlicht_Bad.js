"use strict"
createState("beleuchtung.bad.nische.Startzeit", function () {});
createState("beleuchtung.bad.nische.Endzeit", function () {});
createState("beleuchtung.bad.nische.Dauer", function () {});
createState("beleuchtung.bad.nische.gesamt_Dauer", function () {});
let startzeit;
let endzeit;
let h = [
            [40,40,50,50,50,60,70,70,70,80,80,80,90,90,100,100,100,90,90,80,70,60,50,40], //Level
            [2200,2200,2200,2200,2200,2300,2600,2600,2600,2900,3500,4100,4500,5000,5300,5300,5300,5000,4100,3500,2900,2300,2200,2200]   //farbe
        ];
on ({id: new RegExp("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder" + "|" + "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische"), change: "ne"}, async function (obj) {
    if (obj.state.val && (getState("alias.0.Badezimmer.Lichtlevel_Bad.ACTUAL").val < 40 || getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu").val == true)){
        setState("hue.0.Badezimmer_Nische.level", h[0][h.length - (h.length - (new Date().getHours()))]);
        setState("hue.0.Badezimmer_Nische_vorne.level", h[0][h.length - (h.length - (new Date().getHours()))]);
        setState("hue.0.Badezimmer_Nische.ct", h[1][h.length - (h.length - (new Date().getHours()))]);
        setState("hue.0.Badezimmer_Nische_vorne.ct", h[1][h.length - (h.length - (new Date().getHours()))]);
        setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", true);
        startzeit = new Date();
        setState("javascript.0.beleuchtung.bad.nische.Startzeit", startzeit);
    } else {
        setState("hue.0.Badezimmer_Nische.on", false);
        setState("hue.0.Badezimmer_Nische_vorne.on", false);
        setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", false);
        endzeit = new Date();
        setState("javascript.0.beleuchtung.bad.nische.Endzeit", endzeit);
        let dauer = endzeit.getTime() - startzeit.getTime();
        setState("javascript.0.beleuchtung.bad.nische.Dauer", dauer);
        setState("javascript.0.beleuchtung.bad.nische.gesamt_Dauer", getState("javascript.0.beleuchtung.bad.nische.gesamt_Dauer").val + Math.round((((dauer /1000) /60) /60)));
    }
});




// "use strict"
// createState("Startzeit", function () {});
// createState("Endzeit", function () {});
// createState("Dauer", function () {});
// createState("gesamt Dauer", function () {});
// let h = [
//             [40,40,50,50,50,60,70,70,70,80,80,80,90,90,100,100,100,90,90,80,70,60,50,40], //Level
//             [2200,2200,2200,2200,2200,2300,2600,2600,2600,2900,3500,4100,4500,5000,5300,5300,5300,5000,4100,3500,2900,2300,2200,2200]   //farbe
//         ];
// on ({id: new RegExp("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder" + "|" + "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische"), change: "ne"}, async function (obj) {
//     if (obj.state.val && (getState("alias.0.Badezimmer.Lichtlevel_Bad.ACTUAL").val < 40 || getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu").val == true)){
//         setState("hue.0.Badezimmer_Nische.level", h[0][h.length - (h.length - (new Date().getHours()))]);
//         setState("hue.0.Badezimmer_Nische_vorne.level", h[0][h.length - (h.length - (new Date().getHours()))]);
//         setState("hue.0.Badezimmer_Nische.ct", h[1][h.length - (h.length - (new Date().getHours()))]);
//         setState("hue.0.Badezimmer_Nische_vorne.ct", h[1][h.length - (h.length - (new Date().getHours()))]);
//         setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", true);
//         setState("javascript.0.Startzeit", Date.now());
//     } else {
//         setState("hue.0.Badezimmer_Nische.on", false);
//         setState("hue.0.Badezimmer_Nische_vorne.on", false);
//         setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", false);
//         setState("javascript.0.Endzeit", Date.now());
//     }
// });


// alter Version

// "use strict"
// let h = [
//             [40,40,50,50,50,60,70,70,70,80,80,80,90,90,100,100,100,90,90,80,70,60,50,40], //Level
//             [2200,2200,2200,2200,2200,2300,2600,2600,2600,2900,3500,4100,4500,5000,5300,5300,5300,5000,4100,3500,2900,2300,2200,2200]   //farbe
//         ];
// on ({id: new RegExp("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder" + "|" + "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische"), change: "ne"}, async function (obj) {
//     if (obj.state.val && (getState("alias.0.Badezimmer.Lichtlevel_Bad.ACTUAL").val < 40 || getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu").val == true)){
//         setState("hue.0.Badezimmer_Nische.level", h[0][h.length - (h.length - (new Date().getHours()))]);
//         setState("hue.0.Badezimmer_Nische_vorne.level", h[0][h.length - (h.length - (new Date().getHours()))]);
//         setState("hue.0.Badezimmer_Nische.ct", h[1][h.length - (h.length - (new Date().getHours()))]);
//         setState("hue.0.Badezimmer_Nische_vorne.ct", h[1][h.length - (h.length - (new Date().getHours()))]);
//         setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", true);
//     } else {
//         setState("hue.0.Badezimmer_Nische.on", false);
//         setState("hue.0.Badezimmer_Nische_vorne.on", false);
//         setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", false);
//     }
// });