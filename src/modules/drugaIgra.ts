import { combineLatest, concatMap, delay, finalize, from, fromEvent, mapTo, of, scan, startWith } from "rxjs";
import { pokreniTrecuIgru } from "../modules/trecaIgra"
import { Rec } from "../modules/rec"

let drugaIgraSkor: number;
/////klasa rec

/////klasa rec

var reci: Rec[] = [];
fetch('http://localhost:3000/reci')
    .then(response => response.json())
    .then(response => response.forEach((e: Rec) => {
        reci.push(new Rec(e.id, e.rec));
    }));


export function pokreniDruguIgru(leviDeoStrane: any, desniDeoStrane: any, nickName: string, vremePrveIgre: number) {
    let prikazanaRec = document.createElement("label")
    prikazanaRec.id = 'labelaZaReci';
    //prikazanaRec.style.display = 'none';
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
    dugmeVidjena.id = 'vidjena';
    dugmeVidjena.disabled = true;
    //dugmeVidjena.style.display = "none";
    dugmiciDiv.appendChild(dugmeVidjena);

    let dugmeNova = document.createElement("button");
    dugmeNova.innerHTML = "Nova";
    dugmeNova.className = 'dugmeZaRec'
    dugmeNova.id = 'nova';
    dugmeNova.disabled = true;
    //dugmeNova.style.display = "none";
    dugmiciDiv.appendChild(dugmeNova);



    var divDrugaIgra = document.createElement("div");
    leviDeoStrane.appendChild(divDrugaIgra);
    var skorDrugeIgre = document.createElement("label");
    skorDrugeIgre.className = 'divLeveStraneIgraca';
    skorDrugeIgre.id = 'skorDrugeIgre';
    skorDrugeIgre.innerHTML = 'Broj pogodaka';
    //divDrugaIgra.appendChild(skorDrugeIgre);

    var vidjene = document.createElement("label");
    vidjene.className = 'divLeveStraneIgraca';
    vidjene.id='vidjene';
    vidjene.innerHTML = 'Broj pogodaka';
    divDrugaIgra.appendChild(vidjene);
    
    var nove = document.createElement("label");
    nove.className = 'divLeveStraneIgraca';
    nove.id='nove';
    nove.innerHTML = 'Broj pogodaka';
    divDrugaIgra.appendChild(nove);

    var brojac = 0;
    var izmesaneReci: Rec[] = [];
    const dosadasnjeReci: Rec[] = [];
    var pogodak: number = 0;
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
                pokreniTrecuIgru(leviDeoStrane, desniDeoStrane, nickName, vremePrveIgre, drugaIgraSkor);
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
        drugaIgraSkor = pogodak;
    });

    dugmeNova.addEventListener("click", function () {
        if (!recProvera)
            pogodak++;
        //skorDrugeIgre.innerHTML = 'Broj pogodaka: ' + pogodak.toString();
        dugmeVidjena.disabled = true;
        dugmeNova.disabled = true;
    });
    dugmeVidjena.addEventListener("click", function () {
        if (recProvera)
            pogodak++;
        //skorDrugeIgre.innerHTML = 'Broj pogodaka: ' + pogodak.toString();
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

    const addOneClick$ = (id: string) =>
        fromEvent(document.getElementById(id), 'click').pipe(
            // map every click to 1
            mapTo(1),
            // keep a running total
            scan((acc, curr) => acc + curr, 0),
            startWith(0)
        );

    combineLatest(addOneClick$('nova'), addOneClick$('vidjena')).subscribe(
        ([vidjena, nova]: any) => {
            vidjene.innerHTML = vidjena;//vidjena
            nove.innerHTML = nova;//nova
            skorDrugeIgre.innerHTML = nova + vidjena;
        }
    );

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