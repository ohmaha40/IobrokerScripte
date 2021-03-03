"use strict"
on ({id: new RegExp("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder" + "|" + "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische"), change: "ne"}, async function (obj) {
    if (obj.state.val && (getState("alias.0.Badezimmer.Lichtlevel_Bad.ACTUAL").val > 40 || getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu").val == true)){
        setState("hue.0.Badezimmer_Nische.on", true);
        setState("hue.0.Badezimmer_Nische_vorne.on", true);
        setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", true);
    } else {
        setState("hue.0.Badezimmer_Nische.on", false);
        setState("hue.0.Badezimmer_Nische_vorne.on", false);
        setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische", false);
    }
});