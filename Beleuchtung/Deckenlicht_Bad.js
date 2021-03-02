"use strict"
on ({id: bewegungsmelder, change: "ne"}, function () {
    let bewegungsmelder = "0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder";
    let rolladen_zu = "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu";
    let lichtlevel_bad = "alias.0.Badezimmer.Lichtlevel_Bad.ACTUAL";
    let nische_rechts = "hue.0.Badezimmer_Nische.on";
    let nische_links = "hue.0.Badezimmer_Nische_vorne.on";
    if (getState(bewegungsmelder).val && (getState(lichtlevel_bad).val > 40 || getState(rolladen_zu).val == true)){
        setState(nische_rechts, true);
        setState(nische_links, true);
    } else {
        setState(nische_rechts, false);
        setState(nische_links, false);
    }
});

// on ({id: '0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder', change: "ne"}, function () {
//     if (getState("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder").val && (getState("alias.0.Badezimmer.Lichtlevel_Bad.ACTUAL").val > 40 || getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu").val == true)) {
//         setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",true);
//     }else if(getState("0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder").val == false) {
//         setState("alias.0.Badezimmer.Deckenlicht_Bad.SET",false);
//         setState("0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",false);
//     }
// });
