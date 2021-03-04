"use strict"
let h = [40,40,50,50,50,60,70,70,70,80,80,80,90,90,100,100,100,90,90,80,70,60,50,40];
let f = [2200,2200,2200,2200,2200,2300,2600,2600,2600,2900,3500,4100,4500,5000,5300,5300,5300,5000,4100,3500,2900,2300,2200,2200];

on ({id: new RegExp("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder" + "|" + "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische"), change: "ne"}, async function (obj) {
    let helligkeit_aktuell = h[h.length - (h.length - (new Date().getHours()))];
    let farbe_aktuell = f[h.length - (h.length - (new Date().getHours()))];
    if (obj.state.val && (getState("alias.0.Badezimmer.Lichtlevel_Bad.ACTUAL").val > 40 || getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu").val == true)){
        setState("hue.0.Badezimmer_Nische.level", helligkeit_aktuell);
        setState("hue.0.Badezimmer_Nische_vorne.level", helligkeit_aktuell);
        setState("hue.0.Badezimmer_Nische.ct", farbe_aktuell);
        setState("hue.0.Badezimmer_Nische_vorne.ct", farbe_aktuell);
        setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", true);
    } else {
        setState("hue.0.Badezimmer_Nische.on", false);
        setState("hue.0.Badezimmer_Nische_vorne.on", false);
        setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", false);
    }
});



