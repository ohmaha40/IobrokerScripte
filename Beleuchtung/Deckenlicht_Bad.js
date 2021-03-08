"use strict"
createState("beleuchtung.bad.spiegel.Startzeit", function () {});
createState("beleuchtung.bad.spiegel.Endzeit", function () {});
createState("beleuchtung.bad.spiegel.Dauer", function () {});
createState("beleuchtung.bad.spiegel.gesamt_Dauer", function () {});
const badezimmer = {
    //schalter und bedingungen 
    bewegungsmelder: {
        level: "zigbee.0.00158d000447eae2.illuminance",
        motion: "zigbee.0.00158d000447eae2.occupancy",
        vis: "0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder" 
        }, 
    rolladen_zu: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu",
    //Leuchten Nische
        nische_1: {
            licht:  "hue.0.Badezimmer_Nische", //.level .ct . on
            level: ".level",
            ct: ".ct",
            on: ".on",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",
            start_t: "javascript.0.beleuchtung.bad.nische.Startzeit",
            ende_t:  "javascript.0.beleuchtung.bad.nische.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.nische.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.nische.gesamt_Dauer",
            leistung: 5
                },
        nische_2: {
            licht:  "hue.0.Badezimmer_Nische_vorne", //.level .ct . on
            level: ".level",
            ct: ".ct",
            on: ".on",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",
            start_t: "javascript.0.beleuchtung.bad.nische.Startzeit",
            ende_t:  "javascript.0.beleuchtung.bad.nische.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.nische.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.nische.gesamt_Dauer",
            leistung: 5
                },
        dusche: {
            licht:  "shelly.0.SHSW-1#BCDDC276F298#1.Relay0", //.on
            level: "",
            ct: "",
            on: ".Switch",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Dusche",
            start_t: "javascript.0.beleuchtung.bad.dusche.Startzeit",
            ende_t:  "javascript.0.beleuchtung.bad.dusche.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.dusche.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.dusche.gesamt_Dauer",
            leistung: 15
                },
        decke: {
            licht:  "sonoff.0.Schalter_Badlicht", //.on
            level: "",
            ct: "",
            on: ".POWER",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Decke",
            start_t: "javascript.0.beleuchtung.bad.decke.Startzeit",
            ende_t:  "javascript.0.beleuchtung.bad.decke.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.decke.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.decke.gesamt_Dauer",
            leistung: 15
              },
        spiegelschrank: {
            licht:  "shelly.0.SHSW-1#A4CF12F47D41#1.Relay0", //.on
            level: "",
            ct: "",
            on: ".Switch",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Spiegel",
            start_t: "javascript.0.beleuchtung.bad.spiegel.Startzeit",
            ende_t:  "javascript.0.beleuchtung.bad.spiegel.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.spiegel.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.spiegel.gesamt_Dauer",
            leistung: 15
                },
    // leuchte Dusche
    // Methoden
     start(geraet_s, obj) {         // String für Gerät übergeben und anschalte true ausschalten false
        let geraet;
        let an;
        let time;
        switch (geraet_s){
            case "nische_1":
                geraet = this.nische_1;
                an = false;
                time = true;
                break;
            case "nische_2":
                geraet = this.nische_2;
                an = false;
                time = false;
                break;
            case "dusche":
                geraet = this.dusche;
                an = true;
                time = true;
                break;
            case "decke":
                geraet = this.decke;
                an = true;
                time = true;
                break;
            case "spiegelschrank":
                geraet = this.spiegelschrank;
                an = true;
                time = true;
                }
        if (obj && getState(geraet.licht + geraet.on).val == false) {
            this.einschalten(new Date(), geraet, an, time);
            } else {
                this.auschalten(new Date(), geraet, time);
            }
        },
    einschalten(startzeit, geraet, on, time_setzen) {       // Startzeit übergeben, gerät übergeben, on == false gibt an das farbe und level übergeben wird, ob die zeit gesetzt werden soll(bei mehreen lampen)
        if (on) {
            setState(geraet.licht + geraet.on, true);
            setState(geraet.vis, true);
            if (time_setzen) {
                setState(geraet.start_t, startzeit);
                }
        } else {
            setState(geraet.licht + geraet.level, beleuchtungNachZeit(startzeit)[0]);
            setState(geraet.licht + geraet.ct, beleuchtungNachZeit(startzeit)[1]);
            setState(geraet.vis, true);
            if (time_setzen) {
                setState(geraet.start_t, startzeit);
                }
            }
        },
    auschalten(endzeit, geraet, zeit_setzen) {              // Startzeit übergeben, gerät übergeben, ob die zeit gesetzt werden soll(bei mehreen lampen)
        setState(geraet.licht + geraet.on, false);
        setState(geraet.vis, false);
        if (zeit_setzen) {
            setState(geraet.ende_t, endzeit);
            setTimeout(function() {
                    badezimmer.zeit_berechnen(geraet);
                    },2000);
                }  
        },
    zeit_berechnen(geraet) {
        setState(geraet.dauer_t, dauer(getState(geraet.start_t).val, getState(geraet.ende_t).val));
        setState(geraet.dauer_t_gesamt, gesamtLaufzeitTage(getState(geraet.dauer_t_gesamt).val, dauer(getState(geraet.start_t).val, getState(geraet.ende_t).val)));
        },
    bewegung(obj) {
        if (obj) {
            setState(this.bewegungsmelder.vis, true);
            clearTimeout(tbwm);
            var tbwm = setTimeout(() => {
                setState(this.bewegungsmelder.vis, false);     
            }, 5 * 60000);
            }
        }
};
on({id: badezimmer.bewegungsmelder.motion, change: "ne"}, async function (obj) {
    badezimmer.bewegung(obj.state.val);
    });
on({id: badezimmer.bewegungsmelder.vis, change: "ne"}, async function (obj) {
    if (getState(badezimmer.bewegungsmelder.level).val < 40 || !getState(badezimmer.rolladen_zu)) {
    badezimmer.start("nische_1", obj.state.val);
    badezimmer.start("nische_2", obj.state.val);
        }
    });
on({id: badezimmer.nische_1.vis, change: "ne"}, async function (obj) {
    badezimmer.start("nische_1", obj.state.val);
    badezimmer.start("nische_2", obj.state.val);
    });
on({id: badezimmer.dusche.vis, change: "ne"}, async function (obj) {
    badezimmer.start("dusche", obj.state.val);
    });
on({id: badezimmer.decke.vis, change: "ne"}, async function (obj) {
    badezimmer.start("decke", obj.state.val);
    });
on({id: badezimmer.spiegelschrank.vis, change: "ne"}, async function (obj) {
    badezimmer.start("spiegelschrank", obj.state.val);
    });