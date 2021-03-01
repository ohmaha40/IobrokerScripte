"use strict"

on ({id: '0_userdata.0.Beleuchtung.Wohnzimmer.Stehleuchte_groß', change: "ne"}, function () {
    if ( getState("0_userdata.0.Beleuchtung.Wohnzimmer.Stehleuchte_groß").val == true) {
        setState("zigbee.0.d0cf5efffec44341.brightness", getState("0_userdata.0.Beleuchtung.Helligkeit_nach_Zeit").val, true);
        setStateDelayed("zigbee.0.d0cf5efffec44341.state", true, 1000, false);
    } else {
        setState("zigbee.0.d0cf5efffec44341.state", false);
    }
});