"use strict"
const rolladen = {
    badezimmer: {
        steuerung_auto: "0_userdata.0.Rolladensteuerung.Rolladensteuerung_Auto",
        anzahl_fenster: 1,
        fenster_1: {
            faehrt_richtung_auf: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Fährt_auf",
            faehrt_richtung_zu: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Fährt_zu",
            stop: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_Stop",
            auffahren: "sonoff.0.Rolladen_Bad.POWER2",
            zufahren: "sonoff.0.Rolladen_Bad.POWER1",
            ist_auf: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Auf",
            ist_zu: "0_userdata.0.Rolladensteuerung.Rolladen_Bad.Rolladen_Bad_ist_Zu"
        },
    }
};
function rolladen_steuerung(objekt) {
    let timeout_auf;
    const rollo = {
        rolladen_auf_fahren() {
            for (let i = 0; i < objekt.anzahl_fenster; i++) {
                let fenster = objekt.fenster_ + i;
                if (getState(fenster.ist_zu).val === true && getState(fenster.ist_auf).val === false && (getState(fenster.faehrt_richtung_auf).val === false && getState(fenster.faehrt_richtung_zu).val === false)) {
                    timeout_auf = setTimeout(async function () {
                        setState(fenster.auffahren, true);
                    }, 30000);
                }
            }
        },
        rolladen_zu_fahren() {
            for (let i = 0; i < objekt.anzahl_fenster; i++) {
                let fenster = objekt.fenster_ + i;
                if (getState(fenster.ist_auf).val === true && getState(fenster.ist_zu).val === false && (getState(fenster.faehrt_richtung_auf).val === false && getState(fenster.faehrt_richtung_zu).val === false)) {
                    timeout_auf = setTimeout(async function () {
                        setState(fenster.zufahren, true);
                    }, 30000);
                }
            }
        },
        rolladen_stop_fahren() {
            
        }
    }
}


new rolladen_steuerung(rolladen.badezimmer);
