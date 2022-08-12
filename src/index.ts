import { fromEvent, timer, zip } from 'rxjs';
import { map } from 'rxjs/operators';

var celaStrana = document.body;
celaStrana.style.height = '98vh';
celaStrana.id = "celaStrana";

var leviDeoStrane = document.createElement("div");
leviDeoStrane.id = 'leviDeoStrane';
celaStrana.appendChild(leviDeoStrane);

var desniDeoStrane = document.createElement("div");
desniDeoStrane.id = 'desniDeoStrane';
celaStrana.appendChild(desniDeoStrane);

var trazenoDugme = [(Math.random() * desniDeoStrane.clientWidth) | 0, (Math.random() * desniDeoStrane.clientHeight) | 0];
if (trazenoDugme[0] < ((desniDeoStrane.clientWidth / 100) * 40)) trazenoDugme[0] = (desniDeoStrane.clientWidth / 100) * 40 + trazenoDugme[0];

console.log(trazenoDugme);

/////   dugme
var dugmeKljuc = document.createElement("input");
dugmeKljuc.type='image';
dugmeKljuc.id='dugmeKljuc'
dugmeKljuc.src="/Images/key.png"
dugmeKljuc.style.position = 'absolute';
dugmeKljuc.style.left = trazenoDugme[0].toString() + 'px';
dugmeKljuc.style.top = trazenoDugme[1].toString() + 'px';
dugmeKljuc.style.display = "none";
dugmeKljuc.innerHTML = "Pokreni Igru";
desniDeoStrane.appendChild(dugmeKljuc);
/////   dugme

/////   katancic
var katanac=document.createElement("img");
katanac.src="/Images/padlock.png"
katanac.width=40;
katanac.style.paddingBottom='10px'
/////   katancic

/////   krugovi
var krugovi = document.createElement("div");
krugovi.className = "krugovi";
leviDeoStrane.appendChild(krugovi);

var kruzicCrveni = document.createElement("div");
kruzicCrveni.className = "krug";
krugovi.appendChild(kruzicCrveni);

var kruzicZuti = document.createElement("div");
kruzicZuti.className = "krug";
krugovi.appendChild(kruzicZuti);

var kruzicPlavi = document.createElement("div");
kruzicPlavi.className = "krug";
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


let timerPrveIgre = timer(0, 1000).subscribe(n => prikazTimera.innerHTML = prebaciUVreme(n));

var divVremena = document.createElement("div");
leviDeoStrane.appendChild(divVremena);

var prikazTimera = document.createElement("label");
prikazTimera.id = "timer";
divVremena.appendChild(katanac);
divVremena.appendChild(prikazTimera);
divVremena.id = "divVremena";
dugmeKljuc.addEventListener("click", function () {
    pomeranjeMisa.unsubscribe();
    krugovi.style.display = 'none';
    dugmeKljuc.style.display = "none";
    katanac.src="/Images/padlockOpen.png"
    timerPrveIgre.unsubscribe();
});

function prebaciUVreme(vreme: number) {
    var hours: any = Math.floor(vreme / 3600);
    var minutes: any = Math.floor((vreme - (hours * 3600)) / 60);
    var seconds: any = vreme - (hours * 3600) - (minutes * 60);
    var msec: any = vreme - (hours * 3600) - (minutes * 60) - (seconds * 100);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}