import { fromEvent, timer, zip } from 'rxjs';
import { map } from 'rxjs/operators';

var pano = document.body;
pano.style.height = '100vh';
var panoo = document.createElement("div");
panoo.style.position = 'relative'
pano.appendChild(panoo);

var trazenoDugme = [(Math.random() * panoo.clientWidth) | 0, (Math.random() * panoo.clientHeight) | 0];
console.log(trazenoDugme);

var dugme = document.createElement("button");
dugme.style.position = 'absolute';
dugme.style.left = trazenoDugme[0].toString() + 'px';
dugme.style.top = trazenoDugme[1].toString() + 'px';
dugme.style.display = "none";
dugme.innerHTML = "Pokreni Igru";
panoo.appendChild(dugme);

const documentEvent = (eventName: string) =>
    fromEvent(document, eventName).pipe(
        map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY }))
    );


let pomeranjeMisa = zip(documentEvent('mousemove')).subscribe(e => {
    //console.log(JSON.stringify(e))
    var pozicijaMisa = e;

    if ((pozicijaMisa[0].x > trazenoDugme[0] - 50 && pozicijaMisa[0].x < trazenoDugme[0] + 50)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 50 && pozicijaMisa[0].y < trazenoDugme[1] + 50)){
        dugme.style.display = "inline";
        pano.style.backgroundColor = 'green';
    }

    else if ((pozicijaMisa[0].x > trazenoDugme[0] - 150 && pozicijaMisa[0].x < trazenoDugme[0] + 150)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 150 && pozicijaMisa[0].y < trazenoDugme[1] + 150)) {
        pano.style.backgroundColor = 'blue';
        dugme.style.display = "none";
    }

    else if ((pozicijaMisa[0].x > trazenoDugme[0] - 350 && pozicijaMisa[0].x < trazenoDugme[0] + 350)
        && (pozicijaMisa[0].y > trazenoDugme[1] - 350 && pozicijaMisa[0].y < trazenoDugme[1] + 350)) {
        pano.style.backgroundColor = 'yellow';
        dugme.style.display = "none";
    }

    else { pano.style.backgroundColor = 'red'; dugme.style.display = "none"; }
}
);

let timerPrveIgre=timer(0, 1000).subscribe(n => prikazTimera.innerHTML = n.toString());

var prikazTimera = document.createElement("label");
prikazTimera.innerHTML = "Start";
pano.appendChild(prikazTimera);
dugme.addEventListener("click", function () {
    pomeranjeMisa.unsubscribe();
    pano.style.backgroundColor = 'white';
    dugme.style.display = "none";
});