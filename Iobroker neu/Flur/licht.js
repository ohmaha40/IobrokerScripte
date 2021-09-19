"use strict"
const licht = {
    deckenlicht:{
        schalter: "0_userdata.0.Vis.Flur.deckenlicht",
        leuchte: "sonoff.0.Schalter_Flurlicht.POWER",
        rückmeldung: "",
        zeiten:{
            einschaltzeit: "17:00",
            ausschaltzeit: "08:00",
            timer: 10
        }
    },
    bwm:{
        bewegung: "zigbee.0.00158d000447eae2.occupancy",
        lux: "zigbee.0.00158d000447eae2.illuminance",
    }
};
let timeout_deckenlicht;
on({id: licht.bwm.bewegung, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    if (val && compareTime(licht.deckenlicht.zeiten.einschaltzeit, licht.deckenlicht.zeiten.ausschaltzeit, "between")) {
        clearTimeout(timeout_deckenlicht);
        if (!getState(licht.deckenlicht.schalter).val) {
            setState(licht.deckenlicht.schalter, true);
        }
    } else {
        timeout_deckenlicht = setTimeout(async function () {
            setState(licht.deckenlicht.schalter, false);
        }, licht.deckenlicht.zeiten.timer);
    }
});
on({id: licht.deckenlicht.schalter, change: "ne"}, async function (obj){
    let val = obj.state.val;
    setState(licht.deckenlicht.leuchte, val);
});
