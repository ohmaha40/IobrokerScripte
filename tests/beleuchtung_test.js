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
            timeout: 300000,
            timeout_text: "timeout_bad",
            schedule_start: "",
            schedule_ende: "",
            luminanz: 40

        },
        rolladen_zu: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu",
        //Leuchten Nische
        nische_1: {
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: !getState(leuchten.badezimmer.rolladen_zu),
            sonder_2: true,
            hellig_farbe_setzen: true,
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
            sonder_1: !getState(leuchten.badezimmer.rolladen_zu),
            sonder_2: true,
            hellig_farbe_setzen: true,
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
            bewegungsmelder: true,
            sonder_1: true,
            sonder_2: true,
            level: "zigbee.0.001788010328723c.illuminance",
            motion: "zigbee.0.001788010328723c.occupancy",
            vis: "0_userdata.0.Beleuchtung.Flur.Bewegungsmelder",
            timeout: 60000,
            schedule_start: "17:30:00",
            schedule_ende: "08:00:00",
            luminanz: 40
        },
        flurlicht: {
            bewegungsmelder: false,
            time_setzen: true,
            sonder_1: true,
            sonder_2: true,
            hellig_farbe_setzen: true,
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
function beleuchtung(objekt, lampe) {
    let timeout_bewegung;
    if (objekt.bewegungsmelder.bewegungsmelder) {
        on({ id: objekt.bewegungsmelder.motion, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            funktionen_allgemein.bewegung(val);
        });
        on({ id: objekt.bewegungsmelder.vis, change: "ne" }, async function (obj) {
            let val = obj.state.val;
            if (val == false || getState(objekt.bewegungsmelder.level).val < objekt.bewegungsmelder.luminanz || (lampe.sonder_1 && lampe.sonder_2)) {
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
            } else {
                this.auschalten(new Date());
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
        einschalten(startzeit) {       // Startzeit übergeben, gerät übergeben, on == false gibt an das farbe und level übergeben wird, ob die zeit gesetzt werden soll(bei mehreen lampen)
            if (lampe.hellig_farbe_setzen) {
                setState(lampe.licht + lampe.on, true);
                if (lampe.time_setzen) {
                    setState(lampe.start_t, startzeit);
                }
            } else {
                setState(lampe.licht + lampe.level, this.beleuchtungNachZeit(startzeit)[0]);
                setState(lampe.licht + lampe.ct, this.beleuchtungNachZeit(startzeit)[1]);
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
                setState(lampe.vis, true);
                (function () {
                    if (timeout_bewegung) {
                        clearTimeout(timeout_bewegung);
                        timeout_bewegung = null;
                    }
                })();
                timeout_bewegung = setTimeout(async function () {
                    setState(lampe.vis, false);
                }, objekt.bewegungsmelder.timeout);
            }
        }
    }
}


//Aufrufe Bad
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.nische_1); //raum angeben, lampepfad angeben
new beleuchtung(leuchten.flur, leuchten.flur.flurlicht); //raum angeben, lampepfad angeben
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.dusche); //raum angeben, lampepfad angeben
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.decke); //raum angeben, lampepfad angeben
new beleuchtung(leuchten.badezimmer, leuchten.badezimmer.spiegelschrank); //raum angeben, lampepfad angeben
new beleuchtung(leuchten.wohnzimmer, leuchten.wohnzimmer.stehlampe_groß); //raum angeben, lampepfad angeben
new beleuchtung(leuchten.wohnzimmer, leuchten.wohnzimmer.baum_lampe); //raum angeben, lampepfad angeben
new beleuchtung(leuchten.schlafzimmer, leuchten.schlafzimmer.schlafzimmer_decke); //raum angeben, lampepfad angeben
