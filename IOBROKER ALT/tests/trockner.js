createState("Trockner.ON", function () {
});
createState("Trockner.wait", function () {
});
createState("Trockner.power_temp", function () {
});
createState("Trockner.power_ts", function () {
});
createState("Trockner.power", function () {
});
createState("Trockner.power_year", function () {
});
createState("Trockner.fertig", function () {
});
createState("Trockner.quit", function () {
});
//Variable setzen
on({id: 'tuya.0.4530056124a1600b5822.5'/*cur power*/, change: "ne"}, function(obj) {                   // Leistung ändert sich
    //Variable setzen
    var timeout;
    var standby_power = 15;                                                                             //Leistung die überschritten werden muss
    var on_power = 15;                                                                                   //Leistung bei der auf on geschaltet wird
    var wan = getState('javascript.0.Trockner.ON'/*Trockner ON*/).val;
    var warten = getState('javascript.0.Trockner.wait'/*Trockner wait*/).val;
    var actual_power = getState('tuya.0.4530056124a1600b5822.5'/*cur power*/).val; 
    setState('javascript.0.Trockner.power_temp'/*Trockner power temp*/, actual_power, true);           
    if(wan != true && on_power > actual_power){                                                           //wenn Leistung über Grenzwert dann Waschmaschine auf Ein schalten  
        setState('javascript.0.Trockner.ON'/*Trockner ON*/,true , true);
        setState('javascript.0.Trockner.wait'/*Trockner wait*/,false, true);
        setState('javascript.0.Trockner.power_temp'/*Trockner power temp*/, actual_power, true);
        setState('javascript.0.Trockner.fertig'/*Trockner fertig*/,false , true);
    } 
    else if(warten == true && actual_power > on_power && wan == true){                                                     //wenn Waschmaschine wartet und leistung höher als Grenzwert dann warten ausschalten
        (function () {if (timeout) {clearTimeout(timeout); timeout = null;}})();
        setState('javascript.0.Trockner.wait'/*Trockner wait*/,false, true);
        setState('javascript.0.Trockner.power_temp'/*Trockner power temp*/, actual_power, true);
    }      
    else if(wan == true && warten != true && actual_power < standby_power){                                 //wenn Waschmaschine an und Leistung unter Grenzwert dann Waschmaschine in warten. Nach zeit auf aus
        setState('javascript.0.Trockner.wait'/*Trockner wait*/,true, true);
        setState('javascript.0.Trockner.power_temp'/*Trockner power temp*/, actual_power, true);
        timeout = setTimeout(async function () {
            setState('javascript.0.Trockner.ON'/*Trockner ON*/,false, true);
            setState('javascript.0.Trockner.fertig'/*Trockner fertig*/,true, true);
            setState('javascript.0.Trockner.wait'/*Trockner wait*/,false, true);
        }, 1200000);                
    }     
});
on({id: 'javascript.0.Trockner.quit'/*Trockner quit*/, change: "ne"}, function(obj){
if(getState('javascript.0.Trockner.fertig'/*Trockner fertig*/).val == true && getState('javascript.0.Trockner.quit'/*Trockner quit*/).val == true){
    setState('javascript.0.Trockner.fertig'/*Trockner fertig*/,false, true);
    setState('javascript.0.Trockner.quit'/*Trockner quit*/,false, true);
}
});
on({id: 'javascript.0.Trockner.ON'/*Trockner ON*/, change: "ne"}, function(obj){
    if(getState('javascript.0.Trockner.ON'/*Trockner ON*/).val == true){
        sendTo("telegram.0", "send",{text: ('Der Trockner läuft jetzt!'),disable_notification: true});
    }
    else {
        sendTo("telegram.0", "send",{text: ('Der Trockner ist fertig!'),disable_notification: true});
    }
});
