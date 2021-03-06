/*
        Waschmaschinen Script
        Ein erkennen und anzeigen +  melden

        28.12.2020 Keller Christian
*/
createState("Waschmaschine.ON", function () {
});
createState("Waschmaschine.wait", function () {
});
createState("Waschmaschine.power_temp", function () {
});
createState("Waschmaschine.power_ts", function () {
});
createState("Waschmaschine.power", function () {
});
createState("Waschmaschine.power_year", function () {
});
createState("Waschmaschine.fertig", function () {
});
createState("Waschmaschine.quit", function () {
});
var timeout;
on({id: 'tuya.0.4530056170039f47f244.5'/*cur power*/, change: "ne"}, function(obj) {
//Variable setzen
    var standby_power = 15;                                                                             //Leistung die überschritten werden muss
    var on_power = 15;                                                                                   //Leistung bei der auf on geschaltet wird
    var wan = getState('javascript.0.Waschmaschine.ON'/*Waschmaschine ON*/).val;
    var warten = getState('javascript.0.Waschmaschine.wait'/*Waschmaschine wait*/).val;
    var actual_power = getState('tuya.0.4530056170039f47f244.5'/*cur power*/).val;//actuelle Leistung
    setState('javascript.0.Waschmaschine.power_temp'/*Waschmaschine power temp*/, actual_power, true);
    if(wan != true && on_power > actual_power){
        setState('javascript.0.Waschmaschine.ON'/*Waschmaschine ON*/,true , true);
        setState('javascript.0.Waschmaschine.wait'/*Waschmaschine wait*/,false, true);
        setState('javascript.0.Waschmaschine.power_temp'/*Waschmaschine power temp*/, actual_power, true);
        setState('javascript.0.Waschmaschine.fertig'/*Waschmaschine fertig*/,false , true);
    } 
    else if(warten == true && actual_power > on_power && wan == true){
        (function () {if (timeout) {clearTimeout(timeout); timeout = null;}})();
        setState('javascript.0.Waschmaschine.wait'/*Waschmaschine wait*/,false, true);
        setState('javascript.0.Waschmaschine.power_temp'/*Waschmaschine power temp*/, actual_power, true);
    }      
    else if(wan == true && warten != true && actual_power < standby_power){
        setState('javascript.0.Waschmaschine.wait'/*Waschmaschine wait*/,true, true);
        setState('javascript.0.Waschmaschine.power_temp'/*Waschmaschine power temp*/, actual_power, true);
        timeout = setTimeout(async function () {
            setState('javascript.0.Waschmaschine.ON'/*Waschmaschine ON*/,false, true);
            setState('javascript.0.Waschmaschine.fertig'/*Waschmaschine fertig*/,true, true);
            setState('javascript.0.Waschmaschine.wait'/*Waschmaschine wait*/,false, true);
        }, 1200000);                
    }     
});
on({id: 'javascript.0.Waschmaschine.quit'/*Waschmaschine quit*/, change: "ne"}, function(obj){
if(getState('javascript.0.Waschmaschine.fertig'/*Waschmaschine fertig*/).val == true && getState('javascript.0.Waschmaschine.quit'/*Waschmaschine quit*/).val == true){
    setState('javascript.0.Waschmaschine.fertig'/*Waschmaschine fertig*/,false, true);
    setState('javascript.0.Waschmaschine.quit'/*Waschmaschine quit*/,false, true);
}
});
on({id: 'javascript.0.Waschmaschine.ON'/*Waschmaschine ON*/, change: "ne"}, function(obj){
    if(getState('javascript.0.Waschmaschine.ON'/*Waschmaschine ON*/).val == true){
        sendTo("telegram.0", "send",{text: ('Die Waschmaschine läuft jetzt!'),disable_notification: true});
    }
    else {
        sendTo("telegram.0", "send",{text: ('Die Waschmaschine ist fertig!'),disable_notification: true});
    }
});

