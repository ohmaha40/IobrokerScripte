"use strict"
//Vaiablen setzen
const beleuchtung = {
    Badezimmer:{
        Leuchten:{
            Deckenlampen:{
                vis_schalter: "0_userdata.0.Vis.Bad.deckenlicht",
                leuchtmittel: "sonoff.0.Schalter_Badlicht.POWER",
                rueckmeldung: "",
                Bedingungen:{
                    bedingung_1:"",
                    bedingung_2:"",
                    bedingung_3:"",
                    bedingung_4:"",
                },
                Zeiten:{
                    einschaltzeit:"11:00",
                    auschaltzeit:"08:00",
                    timerzeit_1:"600000",
                    timerzeit_2:"",
                }
            },
            Dusche:{
                vis_schalter: "",
                leuchtmittel: "",
                rueckmeldung: "",
                Bedingungen:{
                    bedingung_1:"",
                    bedingung_2:"",
                    bedingung_3:"",
                    bedingung_4:"",
                },
                Zeiten:{
                    einschaltzeit:"",
                    auschaltzeit:"",
                    timerzeit_1:"",
                    timerzeit_2:"",
                }
            },
            Spiegelschrank:{
                vis_schalter: "",
                leuchtmittel: "",
                rueckmeldung: "",
                Bedingungen:{
                    bedingung_1:"",
                    bedingung_2:"",
                    bedingung_3:"",
                    bedingung_4:"",
                },
                Zeiten:{
                    einschaltzeit:"",
                    auschaltzeit:"",
                    timerzeit_1:"",
                    timerzeit_2:"",
                }
            },
            Nische:{
                vis_schalter: "",
                leuchtmittel_1: "",
                leuchtmittel_2: "",
                rueckmeldung: "",
                Bedingungen:{
                    bedingung_1:"",
                    bedingung_2:"",
                    bedingung_3:"",
                    bedingung_4:"",
                },
                Zeiten:{
                    einschaltzeit:"",
                    auschaltzeit:"",
                    timerzeit_1:"",
                    timerzeit_2:"",
                }
            }
        },    
        Zubehoer:{
            Bewegungsmelder:{
                bewegung:"zigbee.0.001788010328723c.occupancy",
                lux:"zigbee.0.001788010328723c.illuminance",
            }
        }
    },
    Flur:{
        Leuchten:{
            Deckenlampen:{
                vis_schalter: "",
                leuchtmittel: "",
                rueckmeldung: "",
                Bedingungen:{
                    bedingung_1:"",
                    bedingung_2:"",
                    bedingung_3:"",
                    bedingung_4:"",
                },
                Zeiten:{
                    einschaltzeit:"",
                    auschaltzeit:"",
                    timerzeit_1:"",
                    timerzeit_2:"",
                }
            }
        },
        Zubehoer:{
            Bewegungsmelder:{
                bewegung:"",
                lux:"",
            }
        }
    },
    Schrank:{
        Leuchten:{
            Deckenlampen:{
                vis_schalter: "",
                leuchtmittel: "",
                rueckmeldung: "",
                Bedingungen:{
                    bedingung_1:"",
                    bedingung_2:"",
                    bedingung_3:"",
                    bedingung_4:"",
                },
                Zeiten:{
                    einschaltzeit:"",
                    auschaltzeit:"",
                    timerzeit_1:"",
                    timerzeit_2:"",
                }
            }
        },
        Zubehoer:{
            Bewegungsmelder:{
                bewegung:"",
                lux:"",
            }
        }
    }
};
//funktionen erstellen
function licht_einschalten(Leuchtmittel) {
    setState(Leuchtmittel, true);
}
function licht_ausschalten(Leuchtmittel) {
    setState(Leuchtmittel, false);
}
function timer(Leuchte) {
    let timeout_licht;
    if(compareTime(Leuchte.Zeiten.einschaltzeit, Leuchte.Zeiten.auschaltzeit, "between")){
        clearTimeout(timeout_licht);
        licht_einschalten(Leuchte.leuchtmittel);
        timeout_licht = setTimeout(async function (){
            licht_ausschalten(Leuchte.leuchtmittel);
        }, Leuchte.Zeiten.timerzeit_1);
    }
}

on({id: beleuchtung.Badezimmer.Zubehoer.Bewegungsmelder, val: true}, async function () {
    timer(beleuchtung.Badezimmer.Leuchten.Deckenlampen); 
});
   
