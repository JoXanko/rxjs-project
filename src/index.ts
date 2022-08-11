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

console.log(trazenoDugme);

var dugme = document.createElement("button");
dugme.style.position = 'absolute';
dugme.style.left = trazenoDugme[0].toString() + 'px';
dugme.style.top = trazenoDugme[1].toString() + 'px';
dugme.style.display = "none";
dugme.innerHTML = "Pokreni Igru";
desniDeoStrane.appendChild(dugme);

const documentEvent = (eventName: string) =>
    fromEvent(document, eventName).pipe(
        map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
    );

/////   krugovi
var krugovi=document.createElement("div");
krugovi.className="krugovi";
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

let pomeranjeMisa = zip(documentEvent('mousemove')).subscribe(e => {
    var pozicijaMisa = e;

    if ((pozicijaMisa[0].x > trazenoDugme[0] - 50 && pozicijaMisa[0].x < trazenoDugme[0] + 50)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 50 && pozicijaMisa[0].y < trazenoDugme[1] + 50)) {
        dugme.style.display = "inline";
        kruzicCrveni.style.backgroundColor="#2dd424";//green
        kruzicZuti.style.backgroundColor="#2dd424";
        kruzicPlavi.style.backgroundColor="#2dd424";
    }

    else if ((pozicijaMisa[0].x > trazenoDugme[0] - 150 && pozicijaMisa[0].x < trazenoDugme[0] + 150)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 150 && pozicijaMisa[0].y < trazenoDugme[1] + 150)) {
        kruzicPlavi.style.backgroundColor = "#1861b5";//blue
        kruzicZuti.style.backgroundColor = "#f7e436";//yellow
        kruzicCrveni.style.backgroundColor="#db2e3c";//red
        dugme.style.display = "none";
    }

    else if ((pozicijaMisa[0].x > trazenoDugme[0] - 350 && pozicijaMisa[0].x < trazenoDugme[0] + 350)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 350 && pozicijaMisa[0].y < trazenoDugme[1] + 350)) {
        kruzicZuti.style.backgroundColor = "#f7e436";
        kruzicPlavi.style.backgroundColor="white";
        kruzicCrveni.style.backgroundColor="#db2e3c";
        dugme.style.display = "none";
    }

    else {
        kruzicCrveni.style.backgroundColor="#db2e3c";
        kruzicZuti.style.backgroundColor="white";
        kruzicPlavi.style.backgroundColor="white";
        dugme.style.display = "none";
    }
}
);

let timerPrveIgre = timer(0, 1000).subscribe(n => prikazTimera.innerHTML = prebaciUVreme(n));

var divVremena=document.createElement("div");
leviDeoStrane.appendChild(divVremena);

var prikazTimera = document.createElement("label");
prikazTimera.id = "timer";
divVremena.appendChild(prikazTimera);
divVremena.id="divVremena";
dugme.addEventListener("click", function () {
    pomeranjeMisa.unsubscribe();
    celaStrana.style.backgroundColor = 'white';
    dugme.style.display = "none";
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