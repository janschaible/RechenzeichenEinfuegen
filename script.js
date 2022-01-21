//parsen der elemmente von idex page
let neueZahlenreiheBtn = document.getElementById("neue-zahlenreihe");
let testBtn = document.getElementById("test")
let zahlenreiheEl = document.getElementById("zahlenreihe")

//speicher der aktuellen daten
let rechenzeichenAkt = [] //= [2, 4, 4, 3]
let nummernAkt = [] //= [12, 2, 1, 9, 4]
let ergebnissAkt //= ergebnissRechnen(nummernAkt, rechenzeichenAkt);

function neueGleichung() {
    resetAuswertung()
    nummernAkt = neueZahlen();
    rechenzeichenAkt = neueRechenzeichen(nummernAkt);
    ergebnissAkt = ergebnissRechnen(nummernAkt, rechenzeichenAkt)
    zahlenreiheZeigen(nummernAkt, ergebnissAkt)
}

//ergebnissRechnen rechnet das Ergebniss der gleichung in rechenzeichen und nummern aus
//und gibt dieses Ergebniss zurück
//1==plus 2==minus 3==geteilt 4==mal
function ergebnissRechnen(nummern, rechenzeichen) {
    if (nummern.length <= 0) {
        return
    }
    let zwischenErgebniss = [nummern[0]]
    let uebrigeRechenzeichen = []

    //mal und geteilt rechnen
    for (let i = 0; i < rechenzeichen.length; i++) {
        if (rechenzeichen[i] == 4) {
            zwischenErgebniss[zwischenErgebniss.length - 1] *= nummern[i + 1]
        } else if (rechenzeichen[i] == 3) {
            zwischenErgebniss[zwischenErgebniss.length - 1] /= nummern[i + 1]
        } else {
            uebrigeRechenzeichen.push(rechenzeichen[i])
            zwischenErgebniss.push(nummern[i + 1])
        }
    }
    //plus und minus rechnen
    ergebniss = zwischenErgebniss[0]
    for (let i = 0; i < uebrigeRechenzeichen.length; i++) {
        if (uebrigeRechenzeichen[i] == 1) {
            ergebniss += zwischenErgebniss[i + 1]
        } else if (uebrigeRechenzeichen[i] == 2) {
            ergebniss -= zwischenErgebniss[i + 1]
        }
    }
    return ergebniss
}

//gibt ein random generiertes array zurück mindestens 3 zeichen
//maximal 5 Werte von 1 bis 16 können enthlaten sein
function neueZahlen() {
    nummern = []
    ergebniss = 0
    let length = Math.floor(Math.random() * 3) + 3
    for (let i = 0; i < length; i++) {
        let num = Math.floor(Math.random() * 15) + 1
        nummern.push(num)
    }
    return nummern
}

//gibt anhand eines gegebenen nummern arrays eine mögliche kombination
//von rechenzeichen zurück wenn man diese rechenzeichen mit den gegebenen 
//Nummern verrechnet kommt immer ein positives ergebniss zwischen 1 und 
//150 herraus. Es besteht die möglichkeit dass mit einigen zahlen keine
//vernünftinge ergebnisse gefunden werden in so einem fall wird das 
//array nichts desto trotz zurückgegeben
//1==plus 2==minus 3==geteilt 4==mal
function neueRechenzeichen(nummern) {
    if (nummern.length <= 1) {
        return
    }
    let nummernErledigt = [nummern[0], nummern[1]]
    let rechenzeichen = []
    for (let i = 0; i < 300; i++) {
        zeichen = Math.round(Math.random() * 3) + 1
        let uebergabeZeichen = [...rechenzeichen]
        uebergabeZeichen.push(zeichen)
        let ergebniss = ergebnissRechnen(nummernErledigt, uebergabeZeichen)
        if (ergebniss % 1 == 0 && ergebniss > 1 && ergebniss < 150) {
            rechenzeichen.push(zeichen)
            nummernErledigt.push(nummern[nummernErledigt.length])
        }
        if (nummern.length - 1 == rechenzeichen.length) {
            return rechenzeichen;
        }
    }
}

//zeigt dem benutzer die nummern und das ergebniss an
//1==plus 2==minus 3==geteilt 4==mal
function zahlenreiheZeigen(nummern, ergebniss) {
    let zahlenEl = zahlenreiheEl.querySelectorAll('.zahl')
    for (let i = 0; i < zahlenEl.length; i++) {
        zahlenEl[4 - i].innerHTML = ""
        if (nummern.length - 1 - i >= 0) {
            zahlenEl[4 - i].innerHTML = nummern[nummern.length - 1 - i]
        }
    }
    document.getElementById('ergebniss').innerHTML = ergebniss
}

//überprüft auf richtigkeit der eingegebenen rechenzeichen
function check(rechenzeichen, nummern, ergebniss) {
    resetFarbe()
    let zeichenEl = zahlenreiheEl.querySelectorAll('.rechen-zeichen')
    let selected = []
    for (let i = 4 - rechenzeichen.length; i < zeichenEl.length; i++) {
        selected.push(zeichenEl[i].value)
    }
    let richtig = false
    if (ergebnissRechnen(nummern, selected) == ergebniss) {
        richtig = true
    }

    for (let i = 0; i < rechenzeichen.length; i++) {
        zeichenEl[3 - i].classList.remove("reset")
        if (richtig || zeichenEl[3 - i].value == rechenzeichen[rechenzeichen.length - 1 - i]) {
            zeichenEl[3 - i].classList.add("right")
        } else {
            zeichenEl[3 - i].classList.add("wrong")
            zeichenEl[3 - i].value = rechenzeichen[rechenzeichen.length - 1 - i]
        }
    }
}

//setzt alle rechenzeichen zurück
function resetAuswertung() {
    resetFarbe()
    let zeichenEl = zahlenreiheEl.querySelectorAll('.rechen-zeichen')
    for (let i = 0; i < zeichenEl.length; i++) {
        zeichenEl[i].value = 0
    }
}

//setzt die farbe wieder auf schwarz
function resetFarbe() {
    let zeichenEl = zahlenreiheEl.querySelectorAll('.rechen-zeichen')
    for (let i = 0; i < zeichenEl.length; i++) {
        zeichenEl[i].classList.remove("right")
        zeichenEl[i].classList.remove("wrong")
        zeichenEl[i].classList.add("reset")
    }
}

//eine neue Gleichung initialisieren
neueGleichung();
//zahlenreiheZeigen(nummernAkt, ergebnissAkt)

//eventlistener aktivieren
neueZahlenreiheBtn.addEventListener('click', neueGleichung)
testBtn.addEventListener('click', () => check(rechenzeichenAkt, nummernAkt, ergebnissAkt))
    //1==plus 2==minus 3==geteilt 4==mal
    //testBtn.addEventListener('click', () => check([4, 3, 2], [5, 7, 1, 9], 26))