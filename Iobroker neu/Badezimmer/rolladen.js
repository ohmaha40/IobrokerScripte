"use strict"
const Rolladen = {
    schalter_offnen: "0_userdata.0.Vis.Bad.Rolladen.schalter_offnen",
    schalter_schließen:"0_userdata.0.Vis.Bad.Rolladen.schalter_schließen",
    fahren_auf: "sonoff.0.Rolladen_Bad.POWER2",
    fahren_zu: "sonoff.0.Rolladen_Bad.POWER1",
    dauer_auf: 20000,
    dauer_zu: 20000,
    ist_auf: "0_userdata.0.Vis.Bad.Rolladen.ist_auf",
    ist_zu: "0_userdata.0.Vis.Bad.Rolladen.ist_zu"
};
//Funktion zum fahren
function rolladen_fahren(dauer,auf) {
    if (auf) {
        let timeout_offnen = setTimeout(async function (){
            console.log("Rolladen tiomout auf abgelaufen");
            setState(Rolladen.fahren_auf, false);
            clearTimeout(timeout_offnen);
            setState(Rolladen.ist_auf, true);
            setState(Rolladen.schalter_offnen, false);
        }, dauer);
        setState(Rolladen.fahren_auf, true);
        console.log("Rolladen fährt auf")
        setState(Rolladen.ist_zu, false);
    } else {
        let timeout_schließen = setTimeout(async function (){
            console.log("Rolladen tiomout zu abgelaufen");
            setState(Rolladen.fahren_zu, false);
            clearTimeout(timeout_schließen);
            setState(Rolladen.ist_zu, true);
            setState(Rolladen.schalter_schließen, false);
        }, dauer);
        setState(Rolladen.fahren_zu, true);
        console.log("Rolladen fährt zu")
        setState(Rolladen.ist_auf, false);
    }
}

//Trigger zum fahren
on({id: Rolladen.schalter_offnen, val: true}, async function () {
    rolladen_fahren(Rolladen.dauer_auf, true);
});
on({id: Rolladen.schalter_schließen, val: true}, async function () {
    rolladen_fahren(Rolladen.dauer_zu, false);
});
schedule({astro: "sunrise", shift: 0}, async function () {
    rolladen_fahren(Rolladen.dauer_zu, false);
});
schedule({astro: "sunset", shift: 0}, async function () {
    rolladen_fahren(Rolladen.dauer_auf, true);
});