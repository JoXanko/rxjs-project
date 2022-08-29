import { combineLatest, concatMap, delay, finalize, from, fromEvent, mapTo, of, scan, startWith, tap, timer } from "rxjs";
import { pokreniTrecuIgru } from "../modules/trecaIgra";
import { Rec } from "../modules/Rec";
var drugaIgraSkor;
var brojTacnihVidjene = 0;
var brojTacnihNove = 0;
/////klasa rec
/////klasa rec
var reci = [];
fetch('http://localhost:3000/reci')
    .then(function (response) { return response.json(); })
    .then(function (response) { return response.forEach(function (e) {
    reci.push(new Rec(e.id, e.rec));
}); });
export function pokreniDruguIgru(pageRightSide, desniDeoStrane, nickName, vremePrveIgre) {
    var prikazanaRec = document.createElement("label");
    prikazanaRec.className = 'labelaZaReci';
    //prikazanaRec.style.display = 'none';
    prikazanaRec.innerHTML = 'Druga igra pocinje ubrzo';
    desniDeoStrane.appendChild(prikazanaRec);
    var progressBarDiv = document.createElement("div");
    progressBarDiv.style.display = 'none';
    progressBarDiv.id = 'progressBarDiv';
    desniDeoStrane.appendChild(progressBarDiv);
    var dugmiciDiv = document.createElement("div");
    dugmiciDiv.style.display = 'none';
    desniDeoStrane.appendChild(dugmiciDiv);
    var dugmeVidjena = document.createElement("button");
    dugmeVidjena.innerHTML = "Vidjena";
    dugmeVidjena.className = 'dugmeZaRec';
    dugmeVidjena.id = 'vidjena';
    dugmeVidjena.disabled = true;
    //dugmeVidjena.style.display = "none";
    dugmiciDiv.appendChild(dugmeVidjena);
    var dugmeNova = document.createElement("button");
    dugmeNova.innerHTML = "Nova";
    dugmeNova.className = 'dugmeZaRec';
    dugmeNova.id = 'nova';
    dugmeNova.disabled = true;
    //dugmeNova.style.display = "none";
    dugmiciDiv.appendChild(dugmeNova);
    var divDrugaIgra = document.createElement("div");
    divDrugaIgra.id = 'drugaIgraDivId';
    pageRightSide.appendChild(divDrugaIgra);
    var skorDrugeIgre = document.createElement("label");
    skorDrugeIgre.className = 'divLeveStraneIgraca';
    skorDrugeIgre.id = 'skorDrugeIgre';
    skorDrugeIgre.innerHTML = 'Broj pogodaka';
    divDrugaIgra.appendChild(skorDrugeIgre);
    var vidjene = document.createElement("label");
    vidjene.className = 'divLeveStraneIgraca';
    vidjene.style.fontSize = '25px';
    vidjene.id = 'vidjene';
    vidjene.innerHTML = 'Broj pogodaka';
    divDrugaIgra.appendChild(vidjene);
    var nove = document.createElement("label");
    nove.className = 'divLeveStraneIgraca';
    nove.style.fontSize = '25px';
    nove.id = 'nove';
    nove.innerHTML = 'Broj pogodaka';
    divDrugaIgra.appendChild(nove);
    var brojac = 0;
    var izmesaneReci = [];
    var dosadasnjeReci = [];
    var pogodak = 0;
    var recProvera;
    var i = 0;
    while (i < 12) {
        izmesaneReci[i] = reci[Math.random() * 20 | 0];
        i++;
    }
    i = 0;
    while (i < 3) {
        /*var pozicija1 = Math.random() * 12 | 0;
        var pozicija2 = Math.random() * 12 | 0;
        if (pozicija1 == pozicija2) { }
        if (Math.abs(pozicija1 - pozicija2) == 1)
            pozicija2 = Math.random() * 12 | 0*/
        izmesaneReci[Math.random() * 12 | 0] = izmesaneReci[Math.random() * 12 | 0];
        i++;
    }
    console.log(izmesaneReci);
    var timerPocetka = timer(0, 1000).subscribe(function (n) { prikazanaRec.innerHTML = 'Druga igra počinje za: ' + (3 - n).toString() + ' sekundi'; });
    var igra = from(izmesaneReci).pipe(concatMap(function (item) { return of(item).pipe(delay(2500), tap(function () { return timerPocetka.unsubscribe(); })); }), //2500 kad se ne testira vise!!!!!!!!!!!!!!!!!!!!!!!
    finalize(function () {
        progressBarDiv.style.display = 'none';
        dugmiciDiv.style.display = 'none';
        prikazanaRec.innerHTML = '';
        brojanjePogadjanja.unsubscribe();
        igra.unsubscribe();
        pokreniTrecuIgru(pageRightSide, desniDeoStrane, nickName, vremePrveIgre, drugaIgraSkor);
    })).subscribe(function (timedItem) {
        progressBarDiv.style.display = 'inline';
        dugmiciDiv.style.display = 'inline';
        bar.set(0); //progress bar reset
        prikazanaRec.innerHTML = timedItem.rec;
        dosadasnjeReci[brojac] = timedItem;
        brojac++;
        recProvera = false;
        for (var i = 0; i < dosadasnjeReci.length - 1; i++) {
            if (dosadasnjeReci[i] == timedItem)
                recProvera = true;
        }
        dugmeVidjena.disabled = false;
        dugmeNova.disabled = false;
        bar.animate(1.0);
        drugaIgraSkor = pogodak;
    });
    dugmeNova.addEventListener("click", function () {
        if (!recProvera) {
            pogodak++;
            brojTacnihNove++;
        }
        skorDrugeIgre.innerHTML = 'Broj pogodaka: ' + pogodak.toString();
        dugmeVidjena.disabled = true;
        dugmeNova.disabled = true;
    });
    dugmeVidjena.addEventListener("click", function () {
        if (recProvera) {
            pogodak++;
            brojTacnihVidjene++;
        }
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
    var addOneClick$ = function (id) {
        return fromEvent(document.getElementById(id), 'click').pipe(
        // map every click to 1
        mapTo(1), 
        // keep a running total
        scan(function (acc, curr) { return acc + curr; }, 0), startWith(0));
    };
    var brojanjePogadjanja = combineLatest(addOneClick$('nova'), addOneClick$('vidjena')).subscribe(function (_a) {
        var nova = _a[0], vidjena = _a[1];
        vidjene.innerHTML = 'Viđene: od ' + vidjena + ' pokušaja, ' + brojTacnihVidjene + ' je tačnih'; //vidjena
        nove.innerHTML = 'Nove: od ' + nova + ' pokušaja, ' + brojTacnihNove + ' je tačnih'; //nova
        //skorDrugeIgre.innerHTML = nova + vidjena;
    });
    var ProgressBar = require('progressbar.js');
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
        step: function (state, bar) {
            bar.path.setAttribute('stroke', state.color);
        }
    });
}
//# sourceMappingURL=drugaIgra.js.map