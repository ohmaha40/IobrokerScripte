"use strict"
//Vaiablen setzen
const beleuchtung = {
    Badezimmer:{
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
                bewegung:"",
                lux:"",
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
