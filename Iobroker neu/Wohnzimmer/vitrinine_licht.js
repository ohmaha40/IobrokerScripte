"use strict"
const licht = {
    vitrine:{
        schalter: "0_userdata.0.Vis.Wohnzimmer.vitrine_licht",
        leuchte: "tuya.0.4530056170039f4b2dfc.1",
        rückmeldung: "",
        zeiten:{
            einschaltzeit: "05:00",
            ausschaltzeit: "22:00",
            timer: "",
        }
    }
};
on({id: licht.vitrine.schalter, change: "ne"}, async function (obj){
    let val = obj.state.val;
    setState(licht.vitrine.leuchte, val);
});
schedule('{"time":{"exactTime":true,"start":"05:00"},"period":{"days":1}}', async function () {
    setState(licht.vitrine.schalter, true);
});
schedule('{"time":{"exactTime":true,"start":"10:00"},"period":{"days":1}}', async function () {
    setState(licht.vitrine.schalter, false);
});
schedule('{"time":{"exactTime":true,"start":"16:00"},"period":{"days":1}}', async function () {
    setState(licht.vitrine.schalter, true);
});
schedule('{"time":{"exactTime":true,"start":"22:00"},"period":{"days":1}}', async function () {
    setState(licht.vitrine.schalter, false);
});
