"use strict"
const licht = {
    deckenlicht:{
        schalter: "0_userdata.0.Vis.Bad.deckenlicht",
        leuchte: "sonoff.0.Schalter_Badlicht.POWER",
        rückmeldung: "",
    },
    dusche:{
        schalter: "0_userdata.0.Vis.Bad.dusche",
        leuchte: "shelly.0.SHSW-1#BCDDC276F298#1.Relay0.Switch",
        rückmeldung: "",
    },
    spiegel:{
        schalter: "0_userdata.0.Vis.Bad.spiegel",
        leuchte: "shelly.0.SHSW-1#A4CF12F47D41#1.Relay0.Switch",
        rückmeldung: "",
    },
    bwm:{
        bewegung: "zigbee.0.00158d000447eae2.occupancy",
        lux: "zigbee.0.00158d000447eae2.illuminance",
    }
};
let timeout_deckenlicht;
// Deckenlicht Schalten
on({id: licht.deckenlicht.schalter, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    setState(licht.deckenlicht.leuchte, val);
});
//Deckenlicht über bewegungsmelder Ein schalten
on({id: licht.bwm.bewegung, val: true}, async function (obj){
    let val = obj.state.val;
    if (getState(licht.deckenlicht.schalter).val == false && getState(licht.bwm.lux).val < 35) {
    setState(licht.deckenlicht.schalter, val);
    clearTimeout(timeout_deckenlicht);
    } 
});
//Deckenlicht automatisch ausschalten wenn über bewegungsmelder angeschaltet
on({id: licht.bwm.bewegung, val: false}, async function (obj){
    let val = obj.state.val;
    if (getState(licht.deckenlicht.schalter).val == true) {
        timeout_deckenlicht = setTimeout(async function (){
            setState(licht.deckenlicht.schalter, false);
        }, 600000);
    }
});  
on({id: licht.dusche.schalter, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    setState(licht.dusche.leuchte, val);
});

on({id: licht.spiegel.schalter, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    setState(licht.spiegel.leuchte, val);
});