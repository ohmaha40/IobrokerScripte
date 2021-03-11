"use strict"
// createState("beleuchtung.wohnzimmer.baum_leuchte.Startzeit", function () { });
// createState("beleuchtung.wohnzimmer.baum_leuchte.Endzeit", function () { });
// createState("beleuchtung.wohnzimmer.baum_leuchte.Dauer", function () { });
// createState("beleuchtung.wohnzimmer.baum_leuchte.gesamt_Dauer", function () { });
const beleuchtung = {
    funktionen_allgemein: {
        start(geraet_s, obj) {         // String für Gerät übergeben und anschalte true ausschalten false
            let geraet;
            let an;
            let time;
            switch (geraet_s) {
                case "nische_1":
                    geraet = beleuchtung.badezimmer.nische_1;
                    an = false;
                    time = true;
                    //console.log("Debug_Message: Nische_1");
                    break;
                case "nische_2":
                    geraet = beleuchtung.badezimmer.nische_2;
                    an = false;
                    time = false;
                    //console.log("Debug_Message: Nische_2");
                    break;
                case "dusche":
                    geraet = beleuchtung.badezimmer.dusche;
                    an = true;
                    time = true;
                    break;
                case "decke":
                    geraet = beleuchtung.badezimmer.decke;
                    an = true;
                    time = true;
                    break;
                case "spiegelschrank":
                    geraet = beleuchtung.badezimmer.spiegelschrank;
                    an = true;
                    time = true;
                    break;
                case "wohnzimmer_stehlampe_groß":
                    geraet = beleuchtung.wohnzimmer.stehlampe_groß;
                    an = false;
                    time = true;
                    break;
                case "baum_lampe":
                    geraet = beleuchtung.wohnzimmer.baum_lampe;
                    an = true;
                    time = true;
                    break;
                case "schlafzimmer_decke":
                    geraet = beleuchtung.schlafzimmer.schlafzimmer_decke;
                    an = false;
                    time = true;
                    break;
            }
            if (obj && getState(geraet.licht + geraet.on).val == false) {
                this.einschalten(new Date(), geraet, an, time);
                //console.log(`Debug_Message: zu einschalten obj ${obj}. Sollte true sein`);
            } else {
                this.auschalten(new Date(), geraet, time);
                //console.log(`Debug_Message: zu einschalten obj ${obj}. Sollte false sein`);
            }
        },
        beleuchtungNachZeit(akt_zeit) {
            const h = [
                [40, 40, 50, 50, 50, 60, 70, 70, 70, 80, 80, 80, 90, 90, 100, 100, 100, 90, 90, 80, 70, 60, 50, 40], //Level
                [2200, 2200, 2200, 2200, 2200, 2300, 2600, 2600, 2600, 2900, 3500, 4100, 4500, 5000, 5300, 5300, 5300, 5000, 4100, 3500, 2900, 2300, 2200, 2200]   //farbe
            ];
            let beleuchtungNachZeit_array = [h[0][h.length - (h.length - akt_zeit.getHours())], h[1][h.length - (h.length - akt_zeit.getHours())]];
            return beleuchtungNachZeit_array;
        },
        einschalten(startzeit, geraet, on, time_setzen) {       // Startzeit übergeben, gerät übergeben, on == false gibt an das farbe und level übergeben wird, ob die zeit gesetzt werden soll(bei mehreen lampen)
            if (on) {
                setState(geraet.licht + geraet.on, true);
                if (time_setzen) {
                    setState(geraet.start_t, startzeit);
                }
            } else {
                setState(geraet.licht + geraet.level, this.beleuchtungNachZeit(startzeit)[0]);
                setState(geraet.licht + geraet.ct, this.beleuchtungNachZeit(startzeit)[1]);
                if (time_setzen) {
                    setState(geraet.start_t, startzeit);
                }
            }
        },
        auschalten(endzeit, geraet, zeit_setzen) {              // Startzeit übergeben, gerät übergeben, ob die zeit gesetzt werden soll(bei mehreen lampen)
            //console.log(`Debug_Message: ausschalten Geräte: ${geraet}.`);
            setState(geraet.licht + geraet.on, false);
            if (zeit_setzen) {
                setState(geraet.ende_t, endzeit);
                setTimeout(function () {
                    beleuchtung.funktionen_allgemein.zeit_berechnen(geraet);
                }, 2000);
            }
        },
        zeit_berechnen(geraet) {
            setState(geraet.dauer_t, this.dauer(getState(geraet.start_t).val, getState(geraet.ende_t).val));
            setState(geraet.dauer_t_gesamt, this.gesamtLaufzeitTage(getState(geraet.dauer_t_gesamt).val, this.dauer(getState(geraet.start_t).val, getState(geraet.ende_t).val)));
        },
        dauer(startzeit, endzeit) {
            let laufzeit = new Date(endzeit).getTime() - new Date(startzeit).getTime();
            return laufzeit;
        },
        gesamtLaufzeitTage(state, laufzeit) {
            let gesamtlaufzeit_tage = state + Math.round((((laufzeit / 1000) / 60) / 60));
            return gesamtlaufzeit_tage;
        },
        bewegung(obj, geraet, dauer) {
            let timeout_bewegung;
            //console.log(`Debug_Message: bewegung obj: ${obj}.`);
            if (obj) {
                setState(geraet.vis, true);
                //console.log(`Debug_Message: timeout gestoppt: ${timeout_bewegung}.`);
                (function () { if (timeout_bewegung) { clearTimeout(timeout_bewegung); timeout_bewegung = null; } })();
                //console.log(`Debug_Message: bewegung timeout: ${timeout_bewegung}.`);
                //console.log(`Debug_Message: timeout läuft: ${timeout_bewegung}.`);
                timeout_bewegung = setTimeout(function () {
                    //console.log(`Debug_Message: bewegung timeout: ${timeout_bewegung}.`);
                    setState(geraet.vis, false);
                }, dauer);
            }
        }
    },
    badezimmer: {
        //schalter und bedingungen 
        bewegungsmelder: {
            level: "zigbee.0.00158d000447eae2.illuminance",
            motion: "zigbee.0.00158d000447eae2.occupancy",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder",
            timeout_bad: 300000
        },
        rolladen_zu: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu",
        //Leuchten Nische
        nische_1: {
            licht: "hue.0.Badezimmer_Nische", //.level .ct . on
            level: ".level",
            ct: ".ct",
            on: ".on",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",
            start_t: "javascript.0.beleuchtung.bad.nische.Startzeit",
            ende_t: "javascript.0.beleuchtung.bad.nische.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.nische.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.nische.gesamt_Dauer",
            leistung: 5
        },
        nische_2: {
            licht: "hue.0.Badezimmer_Nische_vorne", //.level .ct . on
            level: ".level",
            ct: ".ct",
            on: ".on",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Nische",
            start_t: "javascript.0.beleuchtung.bad.nische.Startzeit",
            ende_t: "javascript.0.beleuchtung.bad.nische.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.nische.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.nische.gesamt_Dauer",
            leistung: 5
        },
        dusche: {
            licht: "shelly.0.SHSW-1#BCDDC276F298#1.Relay0", //.on
            level: "",
            ct: "",
            on: ".Switch",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Dusche",
            start_t: "javascript.0.beleuchtung.bad.dusche.Startzeit",
            ende_t: "javascript.0.beleuchtung.bad.dusche.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.dusche.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.dusche.gesamt_Dauer",
            leistung: 15
        },
        decke: {
            licht: "sonoff.0.Schalter_Badlicht", //.on
            level: "",
            ct: "",
            on: ".POWER",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Decke",
            start_t: "javascript.0.beleuchtung.bad.decke.Startzeit",
            ende_t: "javascript.0.beleuchtung.bad.decke.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.decke.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.decke.gesamt_Dauer",
            leistung: 15
        },
        spiegelschrank: {
            licht: "shelly.0.SHSW-1#A4CF12F47D41#1.Relay0", //.on
            level: "",
            ct: "",
            on: ".Switch",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Licht_Spiegel",
            start_t: "javascript.0.beleuchtung.bad.spiegel.Startzeit",
            ende_t: "javascript.0.beleuchtung.bad.spiegel.Endzeit",
            dauer_t: "javascript.0.beleuchtung.bad.spiegel.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.bad.spiegel.gesamt_Dauer",
            leistung: 15
        }
    },
    wohnzimmer: {
        stehlampe_groß: {
            licht: "zigbee.0.d0cf5efffec44341", //.level .ct . on
            level: ".brightness",
            ct: ".colortemp",
            on: ".state",
            vis: "0_userdata.0.Beleuchtung.Wohnzimmer.Stehleuchte_groß",
            start_t: "javascript.0.beleuchtung.wohnzimmer.stehlampe_groß.Startzeit",
            ende_t: "javascript.0.beleuchtung.wohnzimmer.stehlampe_groß.Endzeit",
            dauer_t: "javascript.0.beleuchtung.wohnzimmer.stehlampe_groß.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.wohnzimmer.stehlampe_groß.gesamt_Dauer",
            leistung: 5
        },
        baum_lampe: {
            licht: "tuya.0.4530056170039f4b2dfc", //. on
            level: "",
            ct: "",
            on: ".1",
            vis: "0_userdata.0.Beleuchtung.Wohnzimmer.Baum_leuchte",
            start_t: "javascript.0.beleuchtung.wohnzimmer.baum_leuchte.Startzeit",
            ende_t: "javascript.0.beleuchtung.wohnzimmer.baum_leuchte.Endzeit",
            dauer_t: "javascript.0.beleuchtung.wohnzimmer.baum_leuchte.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.wohnzimmer.baum_leuchte.gesamt_Dauer",
            leistung: 5
        }
    },
    schlafzimmer: {
        schlafzimmer_decke: {
            licht: "zigbee.0.000b57fffed354b1", //.level .ct . on
            level: ".brightness",
            ct: ".colortemp",
            on: ".state",
            vis: "0_userdata.0.Beleuchtung.Schlafzimmer_Main.Deckenlicht",
            start_t: "javascript.0.beleuchtung.schlafzimmer.decke.Startzeit",
            ende_t: "javascript.0.beleuchtung.schlafzimmer.decke.Endzeit",
            dauer_t: "javascript.0.beleuchtung.schlafzimmer.decke.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.schlafzimmer.decke.gesamt_Dauer",
            leistung: 5
        }
    },
    flur: {
    }
};

//Aufrufe
on({ id: beleuchtung.badezimmer.bewegungsmelder.motion, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    //console.log(`Debug_Message: motion val: ${val}.`);
    beleuchtung.funktionen_allgemein.bewegung(val, beleuchtung.badezimmer.bewegungsmelder, beleuchtung.badezimmer.bewegungsmelder.timeout_bad);
});
on({ id: beleuchtung.badezimmer.bewegungsmelder.vis, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    //console.log(`Debug_Message: bewegungsmelder.vis val: ${val}.`);
    if (val == false || getState(beleuchtung.badezimmer.bewegungsmelder.level).val < 40 || !getState(beleuchtung.badezimmer.rolladen_zu)) {
        //console.log(`Debug_Message: timeout nach bewegungsmelder vis abgelaufen: ${val}.`);
        setState(beleuchtung.badezimmer.nische_1.vis, val);
    }
});
on({ id: beleuchtung.badezimmer.nische_1.vis, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    //console.log(`Debug_Message: nische on val: ${val}.`);
    beleuchtung.funktionen_allgemein.start("nische_1", val);
    beleuchtung.funktionen_allgemein.start("nische_2", val);
});
on({ id: beleuchtung.badezimmer.dusche.vis, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    beleuchtung.funktionen_allgemein.start("dusche", val);
});
on({ id: beleuchtung.badezimmer.decke.vis, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    beleuchtung.funktionen_allgemein.start("decke", val);
});
on({ id: beleuchtung.badezimmer.spiegelschrank.vis, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    beleuchtung.funktionen_allgemein.start("spiegelschrank", val);
});
on({ id: beleuchtung.wohnzimmer.stehlampe_groß.vis, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    beleuchtung.funktionen_allgemein.start("wohnzimmer_stehlampe_groß", val);
});
on({ id: beleuchtung.wohnzimmer.baum_lampe.vis, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    beleuchtung.funktionen_allgemein.start("baum_lampe", val);
});
on({ id: beleuchtung.schlafzimmer.schlafzimmer_decke.vis, change: "ne" }, async function (obj) {
    let val = obj.state.val;
    beleuchtung.funktionen_allgemein.start("schlafzimmer_decke", val);
});