import { interval,  tap,  delay } from "rxjs";

export function pokreniTrecuIgru(leviDeoStrane: any, desniDeoStrane: any, nickName: string, vremePrveIgre: number, drugaIgraSkor: number) {
    var zivoti: number = 3;
    var broj: string = '';
    var trenutnoBrojeva: number = 0;
    var skorTreceIgre: number = 0;
    var vreme: number = 8000;

    var divTrecaIgra = document.createElement("div");
    divTrecaIgra.className = "divLeveStraneIgraca";
    leviDeoStrane.appendChild(divTrecaIgra);

    var prikazBroja = document.createElement("label");
    prikazBroja.innerHTML = 'Igra uskoro počinje';
    prikazBroja.className = 'labelaZaReci';
    desniDeoStrane.appendChild(prikazBroja);

    let progressBarDiv = document.createElement("div");
    progressBarDiv.id = 'progressBarDiv';
    desniDeoStrane.appendChild(progressBarDiv);

    var unosBrojeva = document.createElement("input");
    unosBrojeva.disabled = true;
    unosBrojeva.type = 'number';
    unosBrojeva.className = 'nickInput';
    unosBrojeva.style.width = '25rem';
    desniDeoStrane.appendChild(unosBrojeva);

    var brojZivota = document.createElement("label");
    //brojZivota.innerHTML = 'Preostalo zivota ';
    //brojZivota.className = 'divLeveStraneIgraca';
    brojZivota.style.display = 'block';
    brojZivota.style.fontSize = '32px';
    //brojZivota.className = 'skorDrugeIgre';
    leviDeoStrane.appendChild(brojZivota);
    /////   srca
    var srce1 = document.createElement("img");
    srce1.src = "../src/assets/heart.png"
    srce1.id = 'srce1';
    srce1.width = 40;
    divTrecaIgra.appendChild(srce1);

    var srce2 = document.createElement("img");
    srce2.src = "../src/assets/heart.png"
    srce2.id = 'srce2';
    srce2.width = 40;
    divTrecaIgra.appendChild(srce2);

    var srce3 = document.createElement("img");
    srce3.src = "../src/assets/heart.png"
    srce3.id = 'srce3';
    srce3.width = 40;
    divTrecaIgra.appendChild(srce3);
    /////   srca

    var prikazSkora = document.createElement("label");
    divTrecaIgra.appendChild(prikazSkora);

    /*  let prviTimer=interval(1500);
    prviTimer.next
    let drugiTimer=interval(3000);*/


    let prviTimer = interval(vreme).pipe(tap(() => {
        if (trenutnoBrojeva % 5 == 0) vreme += vreme / 2
        bar.animate(1.0);
        unosBrojeva.value = '';
        trenutnoBrojeva++;
        napuniNiz();
        console.log(broj);
        prikazBroja.innerHTML = broj;
        unosBrojeva.disabled = true;
    }),
        delay(vreme / 2),
        tap(() => {
            bar.set(0.0);
            prikazBroja.innerHTML = 'Unesite broj';
            unosBrojeva.disabled = false;
            unosBrojeva.focus();
        }))
        .subscribe();

    /*let drugiTimer = interval(5000).pipe(tap(() => {
        //unosBrojeva.disabled = false;
        prikazBroja.innerHTML = 'Unesite broj';
        unosBrojeva.value = '';
        if (unosBrojeva.value == broj)
            skorTreceIgre++;
        else zivoti--;
        prikazSkora.innerHTML = 'Pogodjenih: ' + skorTreceIgre;
    }
    ));*/

    //merge(prviTimer, drugiTimer).subscribe();

    unosBrojeva.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            if (unosBrojeva.value != broj) {
                //unosBrojeva.classList.toggle("shakeAnimacija");
                var srceZaBrisanje: any = document.getElementById('srce' + zivoti);
                zivoti--;
                srceZaBrisanje.src = '../src/assets/heartBroken.png';
                if (zivoti == 0) {
                    prviTimer.unsubscribe();
                    prikazBroja.style.display = 'none'
                    progressBarDiv.style.display = 'none'
                    unosBrojeva.style.display = 'none'
                    upisiUBazu();
                    //prikaziSkorTabelu();                
                }
            }
            else
                brojZivota.innerHTML = 'Broj pogodaka: ' + (++skorTreceIgre).toString();
            unosBrojeva.disabled = true;
        }

    })

    function napuniNiz() {
        broj = '';
        for (var i: number = 0; i < trenutnoBrojeva; i++) {
            broj += Math.random() * (10) | 0;
        }
    }
    var ProgressBar = require('progressbar.js')
    var line = new ProgressBar.Line('#progressBarDiv');
    var bar = new ProgressBar.Line(progressBarDiv, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: vreme / 2,
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

function upisiUBazu() {
    /*var korisnik=new Korisnik(nickName,vremePrveIgre,drugaIgraSkor,5);
postData(korisnik);*/

    /*async function postData(data: Korisnik) {
        const response = await fetch('http://localhost:3000/korisnici', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }*/
}
