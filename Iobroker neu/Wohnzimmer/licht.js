"use strict"
const licht = {
    stehlampe:{
        schalter: "0_userdata.0.Vis.Wohnzimmer.stehlampe_groß",
        leuchte: "zigbee.0.d0cf5efffec44341.state",
        rückmeldung: "",
        test: getAstroDate("sunsetStart", undefined, 0),
    }
};
on({id: licht.stehlampe.schalter, change: "ne"}, async function (obj){
    let val = obj.state.val;
    setState(licht.stehlampe.leuchte, val);
});
schedule('{"time":{"exactTime":true,"start":"17:00"},"period":{"days":1}}', async function () {
    setState(licht.stehlampe.schalter, true);
});
schedule('{"time":{"exactTime":true,"start":"22:15"},"period":{"days":1}}', async function () {
    setState(licht.stehlampe.schalter, false);
});