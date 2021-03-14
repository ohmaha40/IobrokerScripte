"use strict";
const bewegungsmelder_flur = {
    level: "zigbee.0.001788010328723c.illuminance",
    motion: "zigbee.0.001788010328723c.occupancy",
    vis: "0_userdata.0.Beleuchtung.Flur.Bewegungsmelder",
    timeout_flur: 60000,
    schedule_start: "17:30:00",
    schedule_ende: "08:00:00"
}

on({ id: bewegungsmelder_flur.motion, change: "ne"}, async function(obj) {
    let val = obj.state.val;
    let timeout_bewegung;
    if (val) {
        setState(bewegungsmelder_flur.vis, true);
        clearTimeout(timeout_bewegung);
        timeout_bewegung = setTimeout(async function() {
            setState(bewegungsmelder_flur.vis, false);
        }, bewegungsmelder_flur.timeout_flur);
    }
});
