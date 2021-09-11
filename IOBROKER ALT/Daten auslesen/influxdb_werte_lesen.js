"use strict"
let start = new Date("2021-03-01 00:00:00");
let end = new Date("2021-03-03 00:00:00").getTime;
sendTo('influxdb.0', 'getHistory', {
    id: 'tuya.0.4530056170039f47f244.5',
    options: {
        start:      start,
        end:        end,
        aggregate: 'none'// or 'none' to get raw values 
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        if (result.result[i].val > 0 ) {
        console.log(result.result[i].val + ' ' + new Date(result.result[i].ts).toISOString());
        }
    }   
});