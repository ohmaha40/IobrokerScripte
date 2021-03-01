"use strict"

on ({id: '0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder', change: "ne"}, function () {
    if (getState("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder").val && (getState("alias.0.Badezimmer.Lichtlevel_Bad.ACTUAL").val > 40 || getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu").val == true)) {
        setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",true);
    }else if(getState("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder").val == false) {
        setState("alias.0.Badezimmer.Deckenlicht_Bad.SET",false);
        setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",false);
    }
});
