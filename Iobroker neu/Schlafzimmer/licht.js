"use strict"
const licht = {
    deckenlicht:{
        schalter: "0_userdata.0.Vis.Schlafzimmer.deckenlicht",
        leuchte: "zigbee.0.000b57fffed354b1.state",
        helligkeit: "zigbee.0.000b57fffed354b1.brightness",
        rückmeldung: "",
        zeiten:{
            einschaltzeit: "18:00",
            ausschaltzeit: "",
            timer: "",
        }
    },
    taster:{
        tast:"zigbee.0.000b57fffed2983c.toggle",
        heller: "zigbee.0.000b57fffed2983c.up_button",
        dunkler: "zigbee.0.000b57fffed2983c.down_button",
    }
};
on({id: licht.taster.tast, val: true}, async function (){
    getState(licht.deckenlicht.schalter, function (err, state) { 
        setState(licht.deckenlicht.schalter, state ? !state.val : true);
    });
});
on({id: licht.deckenlicht.schalter, change: "ne"}, async function (obj){
    let val = obj.state.val;
    setState(licht.deckenlicht.leuchte, val);
});
on({id: licht.taster.heller, val: true}, async function (obj){
    let val = obj.state.val;
    setState(licht.deckenlicht.helligkeit, (getState(licht.deckenlicht.helligkeit).val + 10));
});
on({id: licht.taster.dunkler, val: true}, async function (obj){
    let val = obj.state.val;
    setState(licht.deckenlicht.helligkeit, (getState(licht.deckenlicht.helligkeit).val - 10));
});
