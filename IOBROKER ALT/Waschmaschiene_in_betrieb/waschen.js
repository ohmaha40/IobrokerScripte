const wasch = {
    waschmaschine: {
        standby_leistung: 15,
        ein_leistung: 15,
        maschine_an: "javascript.0.Waschmaschine.ON",
        maschine_fertig: "javascript.0.Waschmaschine.fertig",
        maschine_warten: "javascript.0.Waschmaschine.wait",
        maschine_leistung_speicher: "javascript.0.Waschmaschine.power_temp",
        maschine_quit: "javascript.0.Waschmaschine.quit",
        maschine_verbraucht: "javascript.0.Waschmaschine.verbrauch",
        maschine_zeitstempel: "javascript.0.Waschmaschine.zeitstempel",
        maschine_letzter_lauf_verbrauch: "javascript.0.Waschmaschine.letzter_verbrauch",
        maschine_gesamt_verbrauch: "javascript.0.Waschmaschine.gesamt_verbrauch",
        aktuelle_leistung: "tuya.0.4530056170039f47f244.5",
        timout_warten: 600000,
        telegram_text: "Die Waschmaschine"

    },
    trockner: {
        standby_leistung: 15,
        ein_leistung: 150,
        maschine_an: "javascript.0.Trockner.ON",
        maschine_fertig: "javascript.0.Trockner.fertig",
        maschine_warten: "javascript.0.Trockner.wait",
        maschine_leistung_speicher: "javascript.0.Trockner.power_temp",
        maschine_quit: "javascript.0.Trockner.quit",
        maschine_verbraucht: "javascript.0.Trockner.verbrauch",
        maschine_zeitstempel: "javascript.0.Trockner.zeitstempel",
        maschine_letzter_lauf_verbrauch: "javascript.0.Trockner.letzter_verbrauch",
        maschine_gesamt_verbrauch: "javascript.0.Trockner.gesamt_verbrauch",
        aktuelle_leistung: "tuya.0.4530056124a1600b5822.5",
        timout_warten: 240000,
        telegram_text: "Die Trockner"
    }
};

function waschen(objekt) {
    let timeout;
    on({id: objekt.aktuelle_leistung, change: "ne"}, function(obj) {
        if (getState(objekt.maschine_an).val != true && objekt.ein_leistung < obj.state.val){
            wasche.waschen_start();
        } else if(getState(objekt.maschine_warten).val ===true && obj.state.val > objekt.ein_leistung && getState(objekt.maschine_an).val === true){
            wasche.waschen_warten_abbrechen();
        } else if (getState(objekt.maschine_an).val === true && getState(objekt.maschine_warten).val != true && obj.state.val < objekt.standby_leistung){
            wasche.waschen_warten();
        }
        wasche.waschen_verbrauch(getState(objekt.maschine_an).val);
    })
    on({id: objekt.maschine_quit, change: "ne"}, function() {
        wasche.waschen_quit();
    })
    const wasche = {
        waschen_start() {
            setState(objekt.maschine_an, true, true);
            setState(objekt.maschine_zeitstempel, new Date().getTime(), true);
            setState(objekt.maschine_warten, false, true);
            setState(objekt.maschine_leistung_speicher, getState(objekt.aktuelle_leistung).val, true);
            setState(objekt.maschine_fertig, false, true);
            setState(objekt.maschine_verbraucht, 0, true);
            this.telegram_senden(true);
        },
        waschen_warten() {
            setState(objekt.maschine_warten, true, true);
            setState(objekt.maschine_leistung_speicher, getState(objekt.aktuelle_leistung).val, true);
            timeout = setTimeout(async function () {
                setState(objekt.maschine_an, false, true);
                setState(objekt.maschine_fertig, true, true);
                setState(objekt.maschine_warten, false, true);
                wasche.waschen_verbrauch(false, true);
                wasche.telegram_senden(false);
            }, objekt.timout_warten);
        },
        waschen_warten_abbrechen() {
            (function () { if (timeout) { clearTimeout(timeout); timeout = null; } })();
            setState(objekt.maschine_warten, false, true);
            setState(objekt.maschine_leistung_speicher, getState(objekt.aktuelle_leistung).val, true);
        },
        waschen_quit() {
            if(getState(objekt.maschine_fertig).val === true && getState(objekt.maschine_quit).val === true){
                setState(objekt.maschine_fertig, false, true);
                setState(objekt.maschine_quit, false, true);
            }
        },
        waschen_verbrauch(an, aus) {
            if(an){
            let zwischenzeit = (new Date().getTime() - getState(objekt.maschine_zeitstempel).val);
            setState(objekt.maschine_verbraucht, (getState(objekt.maschine_verbraucht).val + ((zwischenzeit / 1000) * getState(objekt.maschine_leistung_speicher).val) / 3600), true);
            setState(objekt.maschine_zeitstempel, new Date().getTime(), true);
            setState(objekt.maschine_leistung_speicher, getState(objekt.aktuelle_leistung).val, true);
            } 
            if (aus) {
                setState(objekt.maschine_letzter_lauf_verbrauch, getState(objekt.maschine_verbraucht).val, true);
                setState(objekt.maschine_verbraucht, 0, true);
                setState(objekt.maschine_gesamt_verbrauch, getState(objekt.maschine_gesamt_verbrauch).val += getState(objekt.maschine_letzter_lauf_verbrauch).val, true);
            }
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