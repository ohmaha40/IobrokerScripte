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
    nische1_2:{
        schalter: "0_userdata.0.Vis.Bad.spiegel",
        leuchte: "hue.0.Hue_ambiance_spot_1.on",
        leuchte2: "hue.0.Hue_ambiance_spot_2.on",
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
on({id: licht.bwm.bewegung, val: true}, async function (){
    clearTimeout(timeout_deckenlicht);
    if (getState(licht.deckenlicht.schalter).val == false && getState(licht.bwm.lux).val < 35) {
    setState(licht.deckenlicht.schalter, true);
    } 
});
//Deckenlicht automatisch ausschalten wenn über bewegungsmelder angeschaltet
on({id: licht.bwm.bewegung, val: false}, async function (){
    if (getState(licht.deckenlicht.schalter).val == true) {
        timeout_deckenlicht = setTimeout(async function (){
            setState(licht.deckenlicht.schalter, false);
        }, 600000);
    }
});
//Dusche  
on({id: licht.dusche.schalter, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    setState(licht.dusche.leuchte, val);
});
//Spiegelschrank
on({id: licht.spiegel.schalter, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    setState(licht.spiegel.leuchte, val);
});
//Nische
on({id: licht.nische1_2.schalter, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    setState(licht.nische1_2.leuchte, val);
    setState(licht.nische1_2.leuchte2, val);
});

//Alle Lichter im Bad Ausschalten nach Uhrzeit
schedule('{"time":{"exactTime":true,"start":"07:15"},"period":{"days":1}}', async function () {
    setState(licht.deckenlicht.schalter, false);
    setState(licht.dusche.leuchte, false);
    setState(licht.spiegel.leuchte, false);
    setState(licht.nische1_2.leuchte, false);
    setState(licht.nische1_2.leuchte2, false);
});