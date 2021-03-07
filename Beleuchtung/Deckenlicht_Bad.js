"use strict"
createState("beleuchtung.bad.nische.Startzeit", function () {});
createState("beleuchtung.bad.nische.Endzeit", function () {});
createState("beleuchtung.bad.nische.Dauer", function () {});
createState("beleuchtung.bad.nische.gesamt_Dauer", function () {});
const badezimmer = {
    //schalter und bedingungen 
    bewegungsmelder: "0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder",
    licht_level: "zigbee.0.00158d000447eae2.illuminance",
    rolladen_zu: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu",

    //Leuchten
    l_nische_1: "hue.0.Badezimmer_Nische", //.level .ct . on
    l_nische_2: "hue.0.Badezimmer_Nische_vorne", //.level .ct . on
    leuchten_vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",
    leuchten_start: "javascript.0.beleuchtung.bad.nische.Startzeit",
    leuchten_ende: "javascript.0.beleuchtung.bad.nische.Endzeit",
    leuchten_dauer: "javascript.0.beleuchtung.bad.nische.Dauer",
    leuchten_gdauer: "javascript.0.beleuchtung.bad.nische.gesamt_Dauer",
    watt_nische_1: 5,
    watt_nische_2: 5,

    // Methoden
    nische_einschalten(startzeit) {
        setState(this.l_nische_1 + ".level", beleuchtungNachZeit(startzeit)[0]);
        setState(this.l_nische_2 + ".level", beleuchtungNachZeit(startzeit)[0]);
        setState(this.l_nische_1 + ".ct", beleuchtungNachZeit(startzeit)[1]);
        setState(this.l_nische_2 + ".ct", beleuchtungNachZeit(startzeit)[1]);
        setState(this.leuchten_vis, true);
        setState(this.leuchten_start, startzeit);
    },
    nische_auschalten(endzeit) {
        setState(this.l_nische_1 + ".on", false);
        setState(this.l_nische_2 + ".on", false);
        setState(this.leuchten_vis, false);
        setState(this.leuchten_ende, endzeit);
    },
    zeit_berechnen() {
        setState(this.leuchten_dauer, dauer(getState(this.leuchten_start).val, getState(this.leuchten_ende).val));
        setState(this.leuchten_gdauer, gesamtLaufzeitTage(getState(this.leuchten_gdauer).val, dauer(getState(this.leuchten_start).val, getState(this.leuchten_ende).val)));
    }
};
on ({id: new RegExp(badezimmer.bewegungsmelder + "|" + badezimmer.leuchten_vis), change: "ne"}, async function (obj) {
    if (obj.state.val && (getState(badezimmer.licht_level).val < 40 || getState(badezimmer.rolladen_zu).val == true)){
        badezimmer.nische_einschalten(new Date());
    } else {
        badezimmer.nische_auschalten(new Date());
        setTimeout(function() {
        badezimmer.zeit_berechnen();
        },2000);
    }
});