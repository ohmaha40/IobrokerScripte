"use strict"
const licht = {
    deckenlicht:{
        schalter: "0_userdata.0.Vis.Flur.deckenlicht",
        leuchte: "sonoff.0.Schalter_Flurlicht.POWER",
        rückmeldung: "",
    },
    /*bwm:{
        bewegung: "zigbee.0.001788010328723c.occupancy",
        lux: "zigbee.0.001788010328723c.illuminance",
    }*/
    bwm:{
        bewegung: "zigbee.0.00158d000447eae2.occupancy",
        lux: "zigbee.0.00158d000447eae2.illuminance",
    }
};
let timeout_deckenlicht;
on({id: licht.bwm.bewegung, val: true}, async function (){
    if (compareTime("16:00", "23:59", "between") || compareTime("00:00", "08:00", "between")) {
        console.log("zwischen den zwiten");
        clearTimeout(timeout_deckenlicht);
        if (getState(licht.deckenlicht.schalter).val == false) {
        setState(licht.deckenlicht.schalter, true);
        } 
    }
});
//Deckenlicht automatisch ausschalten wenn über bewegungsmelder angeschaltet
on({id: licht.bwm.bewegung, val: false}, async function (){
    if (getState(licht.deckenlicht.schalter).val == true && compareTime("16:00", "08:00", "between")) {
        timeout_deckenlicht = setTimeout(async function (){
            setState(licht.deckenlicht.schalter, false);
        }, 60000);
    }
});
on({id: licht.deckenlicht.schalter, change: "ne"}, async function (obj){
    let val = obj.state.val;
    setState(licht.deckenlicht.leuchte, val);
});
