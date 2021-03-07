// // Funktion zur berechnung der Leistung
// function leistung(watt, dauer) {
//     //code
// }
// Laufzeit berechnen in ms
function dauer(startzeit, endzeit) {
    let laufzeit = new Date(endzeit).getTime() - new Date(startzeit).getTime();
    return laufzeit;
}
// gesamtlaufzeit umrechnen in Tage
function gesamtLaufzeitTage(state, laufzeit) {
    let gesamtlaufzeit_tage = state + Math.round((((laufzeit /1000) /60) /60));
    return gesamtlaufzeit_tage;
}


// beleuchtung nach zeit
function beleuchtungNachZeit(akt_zeit) {
    const h = [
        [40,40,50,50,50,60,70,70,70,80,80,80,90,90,100,100,100,90,90,80,70,60,50,40], //Level
     [2200,2200,2200,2200,2200,2300,2600,2600,2600,2900,3500,4100,4500,5000,5300,5300,5300,5000,4100,3500,2900,2300,2200,2200]   //farbe
    ];
    let level = h[0][h.length - (h.length - akt_zeit.getHours())];
    let farbe = h[1][h.length - (h.length - akt_zeit.getHours())]; 
    let beleuchtungNachZeit_array = [level , farbe];
    return beleuchtungNachZeit_array;
}