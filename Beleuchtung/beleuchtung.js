"use strict"
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
            bewegungsmelder: true,
            sonder_1: true,
            sonder_2: true,
            level: "zigbee.0.00158d000447eae2.illuminance",
            motion: "zigbee.0.00158d000447eae2.occupancy",
            vis: "0_userdata.0.Beleuchtung.Badezimmer.Bewegungsmelder",
            timeout: 100000,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
            luminanz: 40

        },
        //Leuchten Nische
        nische_1: {
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu"),
            sonder_2: true,
            hellig_farbe_setzen: true,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
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
            bewegungsmelder: false,
            time_setzen: false,
            sonder_1: getState("0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu"),
            sonder_2: true,
            hellig_farbe_setzen: true,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
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
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: true,
            sonder_2: true,
            hellig_farbe_setzen: false,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
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
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: true,
            sonder_2: true,
            hellig_farbe_setzen: false,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
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
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: true,
            sonder_2: true,
            hellig_farbe_setzen: false,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
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
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: true,
            sonder_2: true,
            hellig_farbe_setzen: true,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
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
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: true,
            sonder_2: true,
            hellig_farbe_setzen: false,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
            licht: "tuya.0.4530056170039f4b2dfc", //. on tuya.0.4530056170039f4b2dfc
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
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: true,
            sonder_2: true,
            hellig_farbe_setzen: true,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
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
            bewegungsmelder: true,
            sonder_1: true,
            sonder_2: true,
            level: "zigbee.0.001788010328723c.illuminance",
            motion: "zigbee.0.001788010328723c.occupancy",
            vis: "0_userdata.0.Beleuchtung.Flur.Bewegungsmelder",
            timeout: 10000,
            schedule: [
                true /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
            luminanz: 40
        },
        flurlicht: {
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: true,
            sonder_2: true,
            hellig_farbe_setzen: false,
            schedule: [
                false /* beachten?*/,
                17 /* stunde start*/,
                30 /* min start*/,
                8 /* stunde ende*/,
                0 /* min ende*/
            ],
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
    },
    time_schedule(ziel) {
        schedule({ hour: ziel.schedule[1], minute: ziel.schedule[2] }, async function () {
            ziel.sonder_2 = true;
        });
        schedule({ hour: ziel.schedule[3], minute: ziel.schedule[4] }, async function () {
            ziel.sonder_2 = false;
        });
    },
};
function beleuchtung(objekt, lampe, bwm) {
    let timeout_bewegung;
    if (bwm) {
        if (objekt.bewegungsmelder.schedule[0]) {
            leuchten.time_schedule(objekt.bewegungsmelder);
        }
        on({ id: objekt.bewegungsmelder.motion, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            funktionen_allgemein.bewegung(val);
        });
        on({ id: objekt.bewegungsmelder.vis, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            if (val == false || (getState(objekt.bewegungsmelder.level).val < objekt.bewegungsmelder.luminanz && objekt.bewegungsmelder.sonder_1 && objekt.bewegungsmelder.sonder_2)) {
                setState(lampe.vis, val);
            }
        });
        on({ id: lampe.vis, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            funktionen_allgemein.start(val);

        });
    } else {
        on({ id: lampe.vis, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            if (lampe.sonder_1 && lampe.sonder_2) {
                funktionen_allgemein.start(val);
            }
        });
    }
    const funktionen_allgemein = {
        start(obj) {         // String für Gerät übergeben und anschalte true ausschalten false
            if (obj && getState(lampe.licht + lampe.on).val == false) {
                this.einschalten(new Date());
                this.aktual_farbe();
            } else {
                this.auschalten(new Date());
            }
        },
        beleuchtungNachZeit(akt_zeit) {
            const h = [
                [40, 40, 50, 50, 50, 60, 70, 70, 70, 80, 80, 80, 90, 90, 100, 100, 100, 90, 90, 80, 70, 60, 50, 40], //Level
                [2200, 2200, 2200, 2200, 2200, 2300, 2600, 2600, 2600, 2900, 3500, 3600, 3700, 4000, 4000, 4100, 4100, 3700, 2600, 2300, 2300, 2300, 2200, 2200]   //farbe
            ];
            let beleuchtungNachZeit_array = [h[0][h.length - (h.length - akt_zeit.getHours())], h[1][h.length - (h.length - akt_zeit.getHours())]];
            return beleuchtungNachZeit_array;
        },
        einschalten(startzeit) {       // Startzeit übergeben, gerät übergeben, on == false gibt an das farbe und level übergeben wird, ob die zeit gesetzt werden soll(bei mehreen lampen)
            if (lampe.hellig_farbe_setzen) {
                setState(lampe.licht + lampe.level, this.beleuchtungNachZeit(startzeit)[0]);
                setState(lampe.licht + lampe.ct, this.beleuchtungNachZeit(startzeit)[1]);
                if (lampe.time_setzen) {
                    setState(lampe.start_t, startzeit);
                }
            } else {
                setState(lampe.licht + lampe.on, true);
                if (lampe.time_setzen) {
                    setState(lampe.start_t, startzeit);
                }
            }
        },
        auschalten(endzeit) {              // Startzeit übergeben, gerät übergeben, ob die zeit gesetzt werden soll(bei mehreen lampen)
            setState(lampe.licht + lampe.on, false);
            if (lampe.time_setzen) {
                setState(lampe.ende_t, endzeit);
                setTimeout(function () {
                    funktionen_allgemein.zeit_berechnen();
                }, 2000);
            }
        },
        zeit_berechnen() {
            setState(lampe.dauer_t, this.dauer(getState(lampe.start_t).val, getState(lampe.ende_t).val));
            setState(lampe.dauer_t_gesamt, this.gesamtLaufzeitTage(getState(lampe.dauer_t_gesamt).val, this.dauer(getState(lampe.start_t).val, getState(lampe.ende_t).val)));
        },
        dauer(startzeit, endzeit) {
            let laufzeit = new Date(endzeit).getTime() - new Date(startzeit).getTime();
            return laufzeit;
        },
        gesamtLaufzeitTage(state, laufzeit) {
            let gesamtlaufzeit_tage = state + Math.round((((laufzeit / 1000) / 60) / 60));
            return gesamtlaufzeit_tage;
        },
        bewegung(obj) {
            if (obj) {
                setState(objekt.bewegungsmelder.vis, true);
                (function () {
                    if (timeout_bewegung) {
                        clearTimeout(timeout_bewegung);
                        timeout_bewegung = null;
                    }
                })();
            } else {
                timeout_bewegung = setTimeout(async function () {
                    setState(objekt.bewegungsmelder.vis, false);
                }, objekt.bewegungsmelder.timeout);
            }
        },
        aktual_farbe() {
            schedule('{"time":{"start":"00:00","end":"23:59","mode":"hours","interval":1},"period":{"days":1}}', async function () {
                if (lampe.hellig_farbe_setzen) {
                    setState(lampe.licht + lampe.level, this.beleuchtungNachZeit(new Date())[0]);
                    setState(lampe.licht + lampe.ct, this.beleuchtungNachZeit(new Date())[1]);
                }
            });
        }
    }
}


//Aufrufe Bad
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.nische_1, true); //raum angeben, lampepfad angeben, bvm
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.nische_2, false); //raum angeben, lampepfad angeben, bvm
new beleuchtung(leuchten.flur, leuchten.flur.flurlicht, true); //raum angeben, lampepfad angeben, bvm
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.dusche, false); //raum angeben, lampepfad angeben, bvm
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.decke, false); //raum angeben, lampepfad angeben, bvm
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.spiegelschrank, false); //raum angeben, lampepfad angeben, bvm
new beleuchtung(leuchten.wohnzimmer, leuchten.wohnzimmer.stehlampe_groß, false); //raum angeben, lampepfad angeben, bvm
new beleuchtung(leuchten.wohnzimmer, leuchten.wohnzimmer.baum_lampe, false); //raum angeben, lampepfad angeben, bvm
new beleuchtung(leuchten.schlafzimmer, leuchten.schlafzimmer.schlafzimmer_decke, false); //raum angeben, lampepfad angeben, bvm
