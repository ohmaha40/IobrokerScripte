"use strict"

on({id: '0_userdata.0.beleuchtung.Leuchte_Balkon', change: "ne"}, function () {
    if ( getstate("0_userdata.0.beleuchtung.Leuchte_Balkon").val == true ) {
        setState("hue.0.Balkon.level"/*Balkon.level*/, getState("0_userdata.0.Beleuchtung.Helligkeit_nach_Zeit").val); 
    } else {
        setState("hue.0.Balkon.level"/*Balkon.Level*/, 0);
    }
});