"use strict"
const licht = {
    deckenlicht:{
        schalter: "0_userdata.0.Vis.Schrank.deckenlicht",
        leuchte: "hue.0.Stehlampe_groß.on",
        rückmeldung: "",
        zeiten:{
            einschaltzeit: "18:00",
            ausschaltzeit: "08:00",
            timer: "",
        }
    }
};
on({id: licht.deckenlicht.schalter, change: "ne"}, async function (obj){
    let val = obj.state.val;
    setState(licht.deckenlicht.leuchte, val);
});
schedule('{"time":{"exactTime":true,"start":"18:00"},"period":{"days":1}}', async function () {
    setState(licht.deckenlicht.schalter, true);
});
schedule('{"time":{"exactTime":true,"start":"08:00"},"period":{"days":1}}', async function () {
    setState(licht.deckenlicht.schalter, false);
});