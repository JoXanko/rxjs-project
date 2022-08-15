import { from, fromEvent, Observable, of, timer, zip } from 'rxjs';
import { concatMap, defaultIfEmpty, delay, finalize, map, timeout } from 'rxjs/operators';

var celaStrana = document.body;
celaStrana.style.height = '98vh';
celaStrana.id = "celaStrana";

var leviDeoStrane = document.createElement("div");
leviDeoStrane.id = 'leviDeoStrane';
celaStrana.appendChild(leviDeoStrane);

var desniDeoStrane = document.createElement("div");
desniDeoStrane.id = 'desniDeoStrane';
celaStrana.appendChild(desniDeoStrane);

var trazenoDugme = [(Math.random() * desniDeoStrane.offsetWidth) | 0, (Math.random() * desniDeoStrane.offsetHeight) | 0];
if (trazenoDugme[0] < ((desniDeoStrane.offsetWidth / 100) * 40))
    trazenoDugme[0] = ((desniDeoStrane.offsetWidth / 100) * 40 + trazenoDugme[0]) | 0;

console.log(trazenoDugme);

/////   dugme
var dugmeKljuc = document.createElement("input");
dugmeKljuc.type = 'image';
dugmeKljuc.id = 'dugmeKljuc'
dugmeKljuc.src = "/Images/key.png"
dugmeKljuc.style.position = 'absolute';
dugmeKljuc.style.left = trazenoDugme[0].toString() + 'px';
dugmeKljuc.style.top = trazenoDugme[1].toString() + 'px';
dugmeKljuc.style.display = "none";
dugmeKljuc.innerHTML = "Pokreni Igru";
desniDeoStrane.appendChild(dugmeKljuc);
/////   dugme

/////   katancic
var katanac = document.createElement("img");
katanac.src = "/Images/padlock.png"
katanac.width = 40;
katanac.style.paddingBottom = '10px'
/////   katancic

/////   krugovi
var krugovi = document.createElement("div");
krugovi.className = "krugovi";
leviDeoStrane.appendChild(krugovi);

var kruzicCrveni = document.createElement("div");
kruzicCrveni.className = "krug";
kruzicCrveni.style.backgroundColor = 'white';
krugovi.appendChild(kruzicCrveni);

var kruzicZuti = document.createElement("div");
kruzicZuti.className = "krug";
kruzicZuti.style.backgroundColor = 'white';
krugovi.appendChild(kruzicZuti);

var kruzicPlavi = document.createElement("div");
kruzicPlavi.className = "krug";
kruzicPlavi.style.backgroundColor = 'white';
krugovi.appendChild(kruzicPlavi);
/////   krugovi

/////   pomeranje misa
const documentEvent = (eventName: string) =>
    fromEvent(document, eventName).pipe(
        map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
    );

let pomeranjeMisa = zip(documentEvent('mousemove')).subscribe(e => {
    var pozicijaMisa = e;

    if ((pozicijaMisa[0].x > trazenoDugme[0] - 50 && pozicijaMisa[0].x < trazenoDugme[0] + 50)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 50 && pozicijaMisa[0].y < trazenoDugme[1] + 50)) {
        dugmeKljuc.style.display = "inline";
        kruzicCrveni.style.backgroundColor = "#2dd424";//green
        kruzicZuti.style.backgroundColor = "#2dd424";
        kruzicPlavi.style.backgroundColor = "#2dd424";
    }

    else if ((pozicijaMisa[0].x > trazenoDugme[0] - 150 && pozicijaMisa[0].x < trazenoDugme[0] + 150)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 150 && pozicijaMisa[0].y < trazenoDugme[1] + 150)) {
        kruzicPlavi.style.backgroundColor = "#1861b5";//blue
        kruzicZuti.style.backgroundColor = "#f7e436";//yellow
        kruzicCrveni.style.backgroundColor = "#db2e3c";//red
        dugmeKljuc.style.display = "none";
    }

    else if ((pozicijaMisa[0].x > trazenoDugme[0] - 350 && pozicijaMisa[0].x < trazenoDugme[0] + 350)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 350 && pozicijaMisa[0].y < trazenoDugme[1] + 350)) {
        kruzicZuti.style.backgroundColor = "#f7e436";
        kruzicPlavi.style.backgroundColor = "white";
        kruzicCrveni.style.backgroundColor = "#db2e3c";
        dugmeKljuc.style.display = "none";
    }

    else {
        kruzicCrveni.style.backgroundColor = "#db2e3c";
        kruzicZuti.style.backgroundColor = "white";
        kruzicPlavi.style.backgroundColor = "white";
        dugmeKljuc.style.display = "none";
    }
}
);
/////   pomeranje misa


let timerPrveIgre = timer(0, 10).subscribe(n => prikazTimera.innerHTML = prebaciUVreme(n));

var divPrvaIgra = document.createElement("div");
leviDeoStrane.appendChild(divPrvaIgra);

var prikazTimera = document.createElement("label");
prikazTimera.id = "timer";
divPrvaIgra.appendChild(katanac);
divPrvaIgra.appendChild(prikazTimera);
divPrvaIgra.className = "divLeveStraneIgraca";
dugmeKljuc.addEventListener("click", function () {
    pomeranjeMisa.unsubscribe();
    krugovi.style.display = 'none';
    dugmeKljuc.style.display = "none";
    katanac.src = "/Images/padlockOpen.png"
    timerPrveIgre.unsubscribe();
    dugmeVidjena.style.display = "inline";
    dugmeNova.style.display = "inline";
    prikazanaRec.style.display = 'inline';

    pokreniDruguIgru();

});

function prebaciUVreme(vreme: number) {
    var minuti: any = Math.floor(vreme / 6000);
    var sekunde: any = Math.floor((vreme - (minuti * 6000)) / 100);
    var milisekunde: any = vreme - (minuti * 6000) - (sekunde * 100);

    if (minuti < 10) { minuti = "0" + minuti; }
    if (sekunde < 10) { sekunde = "0" + sekunde; }
    if (milisekunde < 10) { milisekunde = "0" + milisekunde; }
    return minuti + ':' + sekunde + '.' + milisekunde;
}
//////////////////////////////////// prva igra ////////////////////////////////////

//////////////////////////////////// druga igra ////////////////////////////////////
/////klasa rec
class Rec {
    id: number;
    rec: string;
    constructor(id: number, rec: string) {
        this.id = id;
        this.rec = rec;
    }
}
/////klasa rec

var reci: Rec[] = [];
fetch('http://localhost:3000/reci')
    .then(response => response.json())
    .then(response => response.forEach((e: Rec) => {
        reci.push(new Rec(e.id, e.rec));
    }));

let prikazanaRec = document.createElement("label")
prikazanaRec.id = 'labelaZaReci';
prikazanaRec.style.display = 'none';
prikazanaRec.innerHTML = 'Druga igra pocinje ubrzo'
desniDeoStrane.appendChild(prikazanaRec);

let progressBarDiv = document.createElement("div");
progressBarDiv.style.display = 'none';
progressBarDiv.id = 'progressBarDiv';
desniDeoStrane.appendChild(progressBarDiv);

let dugmiciDiv = document.createElement("div");
dugmiciDiv.style.display = 'none';
desniDeoStrane.appendChild(dugmiciDiv);

let dugmeVidjena = document.createElement("button");
dugmeVidjena.innerHTML = "Vidjena";
dugmeVidjena.className = 'dugmeZaRec'
dugmeVidjena.disabled = true;
dugmeVidjena.style.display = "none";
dugmiciDiv.appendChild(dugmeVidjena);

let dugmeNova = document.createElement("button");
dugmeNova.innerHTML = "Nova";
dugmeNova.className = 'dugmeZaRec'
dugmeNova.disabled = true;
dugmeNova.style.display = "none";
dugmiciDiv.appendChild(dugmeNova);



function pokreniDruguIgru() {
    var divDrugaIgra = document.createElement("div");
    leviDeoStrane.appendChild(divDrugaIgra);
    var skorDrugeIgre = document.createElement("label");
    skorDrugeIgre.className = 'divLeveStraneIgraca';
    skorDrugeIgre.id='skorDrugeIgre';
    skorDrugeIgre.innerHTML = 'Broj pogodaka';
    divDrugaIgra.appendChild(skorDrugeIgre);

    var brojac = 0;
    var izmesaneReci: Rec[] = [];
    const dosadasnjeReci: Rec[] = [];
    var pogodak = 0;
    var recProvera: boolean;
    var i = 0;

    while (i < 12) {
        izmesaneReci[i] = reci[Math.random() * 20 | 0]
        i++;
    }
    i = 0
    while (i < 3) {
        /*var pozicija1 = Math.random() * 12 | 0;
        var pozicija2 = Math.random() * 12 | 0;
        if (pozicija1 == pozicija2) { }
        if (Math.abs(pozicija1 - pozicija2) == 1)
            pozicija2 = Math.random() * 12 | 0*/
        izmesaneReci[Math.random() * 12 | 0] = izmesaneReci[Math.random() * 12 | 0]
        i++;
    }
    console.log(izmesaneReci);

    from(izmesaneReci).pipe(
        concatMap(item => of(item).pipe(delay(500))),//2500 kad se ne testira vise!!!!!!!!!!!!!!!!!!!!!!!
        finalize(
            () => {
                progressBarDiv.style.display = 'none';
                dugmiciDiv.style.display = 'none';
                prikazanaRec.innerHTML = '';
                pokreniTrecuIgru();
            })
    ).subscribe(timedItem => {
        progressBarDiv.style.display = 'inline';
        dugmiciDiv.style.display = 'inline';
        bar.set(0);//progress bar reset
        prikazanaRec.innerHTML = timedItem.rec;
        dosadasnjeReci[brojac] = timedItem;
        brojac++;

        recProvera = false;
        for (var i: number = 0; i < dosadasnjeReci.length - 1; i++) {
            if (dosadasnjeReci[i] == timedItem)
                recProvera = true;
        }

        dugmeVidjena.disabled = false;
        dugmeNova.disabled = false;
        bar.animate(1.0);
    });

    dugmeNova.addEventListener("click", function () {
        if (!recProvera)
            pogodak++;
        skorDrugeIgre.innerHTML = 'Broj pogodaka: ' + pogodak.toString();
        dugmeVidjena.disabled = true;
        dugmeNova.disabled = true;
    });
    dugmeVidjena.addEventListener("click", function () {
        if (recProvera)
            pogodak++;
        skorDrugeIgre.innerHTML = 'Broj pogodaka: ' + pogodak.toString();
        dugmeVidjena.disabled = true;
        dugmeNova.disabled = true;
    });

    /*function provera(rec: Rec) {
        console.log(dosadasnjeReci);
        dosadasnjeReci.forEach(e => {
            if (e === rec) {
                console.log(e)
                console.log(rec)
                console.log(e == rec)
                return false
            }
        })
        return true;
    }*/

    

    var ProgressBar = require('progressbar.js')
    var line = new ProgressBar.Line('#progressBarDiv');
    var bar = new ProgressBar.Line(progressBarDiv, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 2500,
        color: '#7adbfa',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: { width: '100%', height: '100%' },
        from: { color: '#6de6e6' },
        to: { color: '#209696' },
        step: (state: any, bar: any) => {
            bar.path.setAttribute('stroke', state.color);
        }
    });
}
//////////////////////////////////// druga igra ////////////////////////////////////

//////////////////////////////////// treca igra ////////////////////////////////////
function pokreniTrecuIgru() {
    var divTrecaIgra = document.createElement("div");
    divTrecaIgra.className = "divLeveStraneIgraca";
    leviDeoStrane.appendChild(divTrecaIgra);

    /*var brojZivota = document.createElement("label");
    brojZivota.innerHTML = '3';
    brojZivota.className = 'skorDrugeIgre';
    divTrecaIgra.appendChild(brojZivota);*/
    /////   srca
    var srce1 = document.createElement("img");
    srce1.src = "/Images/heart.png"
    srce1.width = 40;
    srce1.style.paddingBottom = '10px'
    divTrecaIgra.appendChild(srce1);

    var srce2 = document.createElement("img");
    srce2.src = "/Images/heart.png"
    srce2.width = 40;
    srce2.style.paddingBottom = '10px'
    divTrecaIgra.appendChild(srce2);

    var srce3 = document.createElement("img");
    srce3.src = "/Images/heart.png"
    srce3.width = 40;
    srce3.style.paddingBottom = '10px'
    divTrecaIgra.appendChild(srce3);
    /////   srca
}
//////////////////////////////////// treca igra ////////////////////////////////////