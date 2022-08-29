import { fromEvent, map, timer, zip } from "rxjs";
import { pokreniDruguIgru } from "../modules/drugaIgra";
var vremePrveIgre;
export function pokreniPrvuIgru(pageRightSide, desniDeoStrane, nickName) {
    var trazenoDugme = [(Math.random() * desniDeoStrane.offsetWidth) | 0, (Math.random() * desniDeoStrane.offsetHeight) | 0];
    if (trazenoDugme[0] < ((desniDeoStrane.offsetWidth / 100) * 40))
        trazenoDugme[0] = ((desniDeoStrane.offsetWidth / 100) * 40 + trazenoDugme[0]) | 0;
    console.log(trazenoDugme);
    var prikazNicka = document.createElement('label');
    prikazNicka.className = 'prikazNickaLabela';
    prikazNicka.style.marginLeft = '0px';
    prikazNicka.style.marginTop = '20px';
    prikazNicka.innerHTML = 'Vaš nick name: ' + nickName;
    pageRightSide.appendChild(prikazNicka);
    /////   dugme
    var dugmeKljuc = document.createElement("input");
    dugmeKljuc.type = 'image';
    dugmeKljuc.id = 'dugmeKljuc';
    dugmeKljuc.src = "../src/assets/key.png";
    dugmeKljuc.style.position = 'absolute';
    dugmeKljuc.style.left = trazenoDugme[0].toString() + 'px';
    dugmeKljuc.style.top = trazenoDugme[1].toString() + 'px';
    dugmeKljuc.style.display = "none";
    desniDeoStrane.appendChild(dugmeKljuc);
    /////   dugme
    /////   katancic
    var katanac = document.createElement("img");
    katanac.src = "../src/assets/padlock.png";
    katanac.width = 40;
    katanac.style.paddingBottom = '10px';
    /////   katancic
    /////   krugovi
    var krugovi = document.createElement("div");
    krugovi.className = "krugovi";
    pageRightSide.appendChild(krugovi);
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
    var documentEvent = function (eventName) {
        return fromEvent(document, eventName).pipe(map(function (e) { return ({ x: e.clientX, y: e.clientY }); }));
    };
    var pomeranjeMisa = zip(documentEvent('mousemove')).subscribe(function (e) {
        var pozicijaMisa = e;
        if ((pozicijaMisa[0].x > trazenoDugme[0] - 50 && pozicijaMisa[0].x < trazenoDugme[0] + 50)
            && (pozicijaMisa[0].y > trazenoDugme[1] - 50 && pozicijaMisa[0].y < trazenoDugme[1] + 50)) {
            dugmeKljuc.style.display = "inline";
            kruzicCrveni.style.backgroundColor = "#2dd424"; //green
            kruzicZuti.style.backgroundColor = "#2dd424";
            kruzicPlavi.style.backgroundColor = "#2dd424";
        }
        else if ((pozicijaMisa[0].x > trazenoDugme[0] - 150 && pozicijaMisa[0].x < trazenoDugme[0] + 150)
            && (pozicijaMisa[0].y > trazenoDugme[1] - 150 && pozicijaMisa[0].y < trazenoDugme[1] + 150)) {
            kruzicPlavi.style.backgroundColor = "#1861b5"; //blue
            kruzicZuti.style.backgroundColor = "#f7e436"; //yellow
            kruzicCrveni.style.backgroundColor = "#db2e3c"; //red
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
    });
    /////   pomeranje misa
    var timerPrveIgre = timer(0, 10).subscribe(function (n) { prikazTimera.innerHTML = prebaciUVreme(n), vremePrveIgre = n; });
    var divPrvaIgra = document.createElement("div");
    pageRightSide.appendChild(divPrvaIgra);
    var prikazTimera = document.createElement("label");
    prikazTimera.id = "timer";
    divPrvaIgra.appendChild(katanac);
    divPrvaIgra.appendChild(prikazTimera);
    divPrvaIgra.className = "divLeveStraneIgraca";
    dugmeKljuc.addEventListener("click", function () {
        pomeranjeMisa.unsubscribe();
        krugovi.style.display = 'none';
        dugmeKljuc.style.display = "none";
        katanac.src = "../src/assets/padlockOpen.png";
        timerPrveIgre.unsubscribe();
        /*dugmeVidjena.style.display = "inline";
        dugmeNova.style.display = "inline";
        prikazanaRec.style.display = 'inline';*/
        pokreniDruguIgru(pageRightSide, desniDeoStrane, nickName, vremePrveIgre);
    });
    function prebaciUVreme(vreme) {
        var minuti = Math.floor(vreme / 6000);
        var sekunde = Math.floor((vreme - (minuti * 6000)) / 100);
        var milisekunde = vreme - (minuti * 6000) - (sekunde * 100);
        if (minuti < 10) {
            minuti = "0" + minuti;
        }
        if (sekunde < 10) {
            sekunde = "0" + sekunde;
        }
        if (milisekunde < 10) {
            milisekunde = "0" + milisekunde;
        }
        return minuti + ':' + sekunde + '.' + milisekunde;
    }
}
//# sourceMappingURL=prvaIgra.js.map