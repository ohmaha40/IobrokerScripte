"use strict";
// createState("0_userdata.0.Beleuchtung.Flur.Bewegungsmelder", function () { });
// createState("0_userdata.0.Beleuchtung.Flur.Deckenlicht", function () { });
// createState("beleuchtung.Flur.Startzeit", function () { });
// createState("beleuchtung.Flur.Endzeit", function () { });
// createState("beleuchtung.Flur.Dauer", function () { });
// createState("beleuchtung.Flur.gesamt_Dauer", function () { });
const leuchten = {
    badezimmer: {
        //schalter und bedingungen 
        bewegungsmelder: {
            level: "zigbee.0.00158d000447eae2.illuminance",
            motion: "zigbee.0.00158d000447eae2.occupancy",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder",
            timeout: 300000,
            timeout_text: "timeout_bad",
            schedule_start: "",
            schedule_ende: "",
            luminanz: 40

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
        bewegungsmelder: {
            level: "zigbee.0.001788010328723c.illuminance",
            motion: "zigbee.0.001788010328723c.occupancy",
            vis: "0_userdata.0.Beleuchtung.Flur.Bewegungsmelder",
            timeout: 60000,
            schedule_start: "17:30:00",
            schedule_ende: "08:00:00",
            luminanz: 40
        },
        flurlicht: {
            licht: "sonoff.0.Schalter_Flurlicht", //.on
            level: "",
            ct: "",
            on: ".POWER",
            vis: "0_userdata.0.Beleuchtung.Flur.Deckenlicht",
            start_t: "javascript.0.beleuchtung.Flur.Startzeit",
            ende_t: "javascript.0.beleuchtung.Flur.Endzeit",
            dauer_t: "javascript.0.beleuchtung.Flur.Dauer",
            dauer_t_gesamt: "javascript.0.beleuchtung.Flur.gesamt_Dauer",
            leistung: 5
        }
    }
};
function beleuchtung(objekt, lampe, leuchtmittel, bwm, sonder) {
    let timeout_bewegung;
    if (bwm) {
        on({ id: objekt.bewegungsmelder.motion, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            funktionen_allgemein.bewegung(val, objekt.bewegungsmelder, objekt.bewegungsmelder.timeout);
        });
        on({ id: objekt.bewegungsmelder.vis, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            if (val == false || getState(objekt.bewegungsmelder.level).val < objekt.bewegungsmelder.luminanz || sonder) {
                setState(lampe.vis, val);
            }
        });
        on({ id: lampe.vis, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            for (let i = 0; i < leuchtmittel.length; i++){
                funktionen_allgemein.start(leuchtmittel[i], val);
                }
        });
    } else {
        on({ id: lampe.vis, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            for (let i = 0; i < leuchtmittel.length; i++){
                funktionen_allgemein.start(leuchtmittel[i], val);
                }
        });
    }
    const funktionen_allgemein = {
        start(geraet_s, obj) {         // String für Gerät übergeben und anschalte true ausschalten false
            let geraet;
            let an;
            let time;
            switch (geraet_s) {
                case "nische_1":
                    geraet = objekt.nische_1;
                    an = false;
                    time = true;
                    break;
                case "nische_2":
                    geraet = objekt.nische_2;
                    an = false;
                    time = false;
                    break;
                case "dusche":
                    geraet = objekt.dusche;
                    an = true;
                    time = true;
                    break;
                case "decke":
                    geraet = objekt.decke;
                    an = true;
                    time = true;
                    break;
                case "spiegelschrank":
                    geraet = objekt.spiegelschrank;
                    an = true;
                    time = true;
                    break;
                case "wohnzimmer_stehlampe_groß":
                    geraet = objekt.stehlampe_groß;
                    an = false;
                    time = true;
                    break;
                case "baum_lampe":
                    geraet = objekt.baum_lampe;
                    an = true;
                    time = true;
                    break;
                case "schlafzimmer_decke":
                    geraet = objekt.schlafzimmer_decke;
                    an = false;
                    time = true;
                    break;
                case "flurlicht":
                    geraet = objekt.flurlicht;
                    an = true;
                    time = true;
                    break;
            }
            if (obj && getState(geraet.licht + geraet.on).val == false) {
                this.einschalten(new Date(), geraet, an, time);
            } else {
                this.auschalten(new Date(), geraet, time);
            }
        },
        beleuchtungNachZeit(akt_zeit) {
            const h = [
                [40, 40, 50, 50, 50, 60, 70, 70, 70, 80, 80, 80, 90, 90, 100, 100, 100, 90, 90, 80, 70, 60, 50, 40], //Level
                [2200, 2200, 2200, 2200, 2200, 2300, 2600, 2600, 2600, 2900, 3500, 4100, 4500, 5000, 5300, 5300, 5300, 5000, 4100, 2300, 2300, 2300, 2200, 2200]   //farbe
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
            setState(geraet.licht + geraet.on, false);
            if (zeit_setzen) {
                setState(geraet.ende_t, endzeit);
                setTimeout(function () {
                    funktionen_allgemein.zeit_berechnen(geraet);
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
            if (obj) {
                setState(geraet.vis, true);
                (function () {
                    if (timeout_bewegung) {
                        clearTimeout(timeout_bewegung);
                        timeout_bewegung = null;
                    }
                })();
                timeout_bewegung = setTimeout(async function () {
                    setState(geraet.vis, false);
                }, dauer);
            }
        }
    }
}


//Aufrufe Bad
let lampen_nische = ["nische_1", "nische_2"];
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.nische_1, lampen_nische, true, !getState(leuchten.badezimmer.rolladen_zu)); //raum angeben, lampepfad angeben, lampe text"string" true bedeutet mit bewegungsmelder, sonderbedingung1(falls keine dann falls)
let lampen_flurlicht = ["flurlicht"];
new beleuchtung(leuchten.flur, leuchten.flur.flurlicht, lampen_flurlicht, true, false); //raum angeben, lampepfad angeben, lampe text"string" true bedeutet mit bewegungsmelder
let lampen_dusche = ["dusche"];
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.dusche, lampen_dusche, false); //raum angeben, lampepfad angeben, lampe text"string" true bedeutet mit bewegungsmelder
let lampen_decke = ["decke"];
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.decke, lampen_decke, false); //raum angeben, lampepfad angeben, lampe text"string" true bedeutet mit bewegungsmelder
let lampen_spiegelschrank = ["spiegelschrank"];
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.spiegelschrank, lampen_spiegelschrank, false); //raum angeben, lampepfad angeben, lampe text"string" true bedeutet mit bewegungsmelder
let lampen_wohnzimmer_stehlampe_groß = ["wohnzimmer_stehlampe_groß"];
new beleuchtung(leuchten.wohnzimmer, leuchten.wohnzimmer.stehlampe_groß, lampen_wohnzimmer_stehlampe_groß, false); //raum angeben, lampepfad angeben, lampe text"string" true bedeutet mit bewegungsmelder
let lampen_wohnzimmer_baum_lampe = ["baum_lampe"];
new beleuchtung(leuchten.wohnzimmer, leuchten.wohnzimmer.baum_lampe, lampen_wohnzimmer_baum_lampe, false); //raum angeben, lampepfad angeben, lampe text"string" true bedeutet mit bewegungsmelder
let lampen_schlafzimmer_decke = ["schlafzimmer_decke"];
new beleuchtung(leuchten.schlafzimmer, leuchten.schlafzimmer.schlafzimmer_decke, lampen_schlafzimmer_decke, false); //raum angeben, lampepfad angeben, lampe text"string" true bedeutet mit bewegungsmelder
