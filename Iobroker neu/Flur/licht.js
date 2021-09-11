"use strict"
const licht = {
    deckenlicht:{
        schalter: "0_userdata.0.Vis.Flur.deckenlicht",
        leuchte: "sonoff.0.Schalter_Flurlicht.POWER",
        rückmeldung: "",
    },
    bwm:{
        bewegung: "zigbee.0.001788010328723c.occupancy",
        lux: "zigbee.0.001788010328723c.illuminance",
    }
};
let timeout_deckenlicht;
on({id: licht.bwm.bewegung, val: true}, async function (){
    if (getState(licht.deckenlicht.schalter).val == false && getState(licht.bwm.lux).val < 10) {
    setState(licht.deckenlicht.schalter, true);
    clearTimeout(timeout_deckenlicht);
    } 
});
//Deckenlicht automatisch ausschalten wenn über bewegungsmelder angeschaltet
on({id: licht.bwm.bewegung, val: false}, async function (){
    if (getState(licht.deckenlicht.schalter).val == true) {
        timeout_deckenlicht = setTimeout(async function (){
            setState(licht.deckenlicht.schalter, false);
        }, 60000);
    }
});
on({id: licht.deckenlicht.schalter, change: "ne"}, async function (obj){
    let val = obj.state.val;
    setState(licht.deckenlicht.leuchte, val);
});