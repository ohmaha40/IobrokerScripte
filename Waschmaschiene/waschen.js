const wasch = {
    waschmaschine: {
        standby_leistung: 15,
        ein_leistung: 15,
        maschine_an: "javascript.0.Waschmaschine.ON",
        maschine_fertig: "javascript.0.Waschmaschine.fertig",
        maschine_warten: "javascript.0.Waschmaschine.wait",
        maschine_leistung_speicher: "javascript.0.Waschmaschine.power_temp",
        aktuelle_leistung: "tuya.0.4530056170039f47f244.5",
        timout_warten: 1200000,
        telegram_text: "Die Waschmaschine"

    },
    trockner: {
        standby_leistung: 15,
        ein_leistung: 15,
        maschine_an: "javascript.0.Trockner.ON",
        maschine_fertig: "javascript.0.Trockner.fertig",
        maschine_warten: "javascript.0.Trockner.wait",
        maschine_leistung_speicher: "javascript.0.Trockner.power_temp",
        aktuelle_leistung: "tuya.0.4530056124a1600b5822.5",
        timout_warten: 1200000,
        telegram_text: "Die Trockner"
    }
};

function waschen(objekt) {
    let timeout;
    on({id: objekt.aktuelle_leistung, change: "ne"}, function(obj) {
        if (objekt.maschine_an != true && objekt.ein_leistung > obj){
            waschen.waschen_start();
        } else if(objekt.maschine_warten ===true && obj > objekt.ein_leistung && objekt.maschine_an === true){
            waschen.waschen_warten_abbrechen();
        } else if (objekt.maschine_an === true && objekt.maschine_warten != true && obj < objekt.standby_leistung){
            waschen.waschen_warten();
        }
    })
    const waschen = {
        waschen_start() {
            setState(objekt.maschine_an, true, true);
            setState(objekt.maschine_warten, false, true);
            setState(objekt.maschine_leistung_speicher, objekt.aktuelle_leistung, true);
            setState(objekt.maschine_fertig, false, true);
            this.telegram_senden(true);
        },
        waschen_warten() {
            setState(objekt.maschine_warten, true, true);
            setState(objekt.maschine_leistung_speicher, objekt.aktuelle_leistung, true);
            timeout = setTimeout(async function () {
                setState(objekt.maschine_an, false, true);
                setState(objekt.maschine_fertig, true, true);
                setState(objekt.maschine_warten, false, true);
                waschen.telegram_senden(false);
            }, objekt.timout_warten);
        },
        waschen_warten_abbrechen() {
            (function () { if (timeout) { clearTimeout(timeout); timeout = null; } })();
            setState(objekt.maschine_warten, false, true);
            setState(objekt.maschine_leistung_speicher, objekt.aktuelle_leistung, true);
        },
        telegram_senden(start/*true = start, false = fertig*/) {
            if (start) {
                sendTo("telegram.0", "send", { text: (`${objekt.telegram_text} läuft jetzt`), disable_notification: true });
            } else {
                sendTo("telegram.0", "send", { text: (`${objekt.telegram_text} ist fertig`), disable_notification: true });
            }
        }
    }
}
new waschen(wasch.waschmaschine);
new waschen(wasch.trockner);