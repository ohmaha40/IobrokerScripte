"use strict"
const licht = {
    deckenlicht:{
        schalter: "0_userdata.0.Vis.Bad.deckenlicht",
        leuchte: "sonoff.0.Schalter_Badlicht.POWER",
        rückmeldung: "",
        zeiten: {
            einschaltzeit: "",
            ausschaltzeit: "",
            timer: 300000,
        }
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
        schalter: "0_userdata.0.Vis.Bad.nische",
        leuchte: "hue.0.Hue_ambiance_spot_1.on",
        leuchte2: "hue.0.Hue_ambiance_spot_2.on",
        rückmeldung: "",
    },
    bwm:{
        bewegung: "zigbee.0.001788010328723c.occupancy",
        lux: "zigbee.0.001788010328723c.illuminance",
        bedingung_rolladen_zu: "0_userdata.0.Vis.Bad.Rolladen.ist_zu",
    }
};
let timeout_deckenlicht;
on({id: licht.deckenlicht.schalter, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    setState(licht.deckenlicht.leuchte, val);
});
on({id: licht.bwm.bewegung, change: "ne"}, async function (obj){
    let val = obj.state.val;
    if (val) {
        clearTimeout(timeout_deckenlicht);
        if(!getState(licht.deckenlicht.schalter).val && (getState(licht.bwm.lux).val < 35 || getState(licht.bwm.bedingung_rolladen_zu).val)) {
        setState(licht.deckenlicht.schalter, true);
        }
    }  else {
        if (getState(licht.deckenlicht.schalter).val) {
            timeout_deckenlicht = setTimeout(async function (){
                setState(licht.deckenlicht.schalter, false);
            }, licht.deckenlicht.zeiten.timer);
        }
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
on({id: licht.nische1_2.schalter, change: "ne"}, async function (obj) {
    let val = obj.state.val;
    setState(licht.nische1_2.leuchte, val);
    setState(licht.nische1_2.leuchte2, val);
});

schedule('{"time":{"exactTime":true,"start":"07:15"},"period":{"days":1}}', async function () {
    setState(licht.deckenlicht.schalter, false);
    setState(licht.dusche.leuchte, false);
    setState(licht.spiegel.leuchte, false);
    setState(licht.nische1_2.leuchte, false);
    setState(licht.nische1_2.leuchte2, false);
});