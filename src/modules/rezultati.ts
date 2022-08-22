import { filter, from, map, switchMap } from "rxjs";
import { Korisnik } from "../modules/Korisnik"
import { fromFetch } from 'rxjs/fetch';

var korisnik: Korisnik;

async function upisiUBazu() {
    const response = await fetch('http://localhost:3000/korisnici', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(korisnik)
    })
    return response.json()
}

export function prikaziSkorTabelu(leviDeoStrane: any, desniDeoStrane: any, nickName: string, vremePrveIgre: number, drugaIgraSkor: number, skorTreceIgre: number) {
    korisnik = new Korisnik(nickName, vremePrveIgre, drugaIgraSkor, skorTreceIgre, new Date().toLocaleString());

    //upisiUBazu();
    /*fetch('http://localhost:3000/korisnici', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(korisnik)
    }).catch(err=>console.log(err));*/

    console.log(korisnik);
    const korisnici = fromFetch('http://localhost:3000/korisnici').pipe(switchMap(response => {
        if (response.ok) {
            return response.json();
        }
    }));

    korisnici.pipe(map(items => items.filter((k: Korisnik) => k.prvaIgraTimer >= korisnik.prvaIgraTimer))).subscribe({
        next: result => { napraviTabelu(result, desniDeoStrane, 1) }
    });

    korisnici.pipe(map(items => items.filter((k: Korisnik) => k.drugaIgraSkor <= korisnik.drugaIgraSkor))).subscribe({
        next: result => { napraviTabelu(result, desniDeoStrane, 2) }
    });

    korisnici.pipe(map(items => items.filter((k: Korisnik) => k.trecaIgraSkor >= korisnik.trecaIgraSkor))).subscribe({
        next: result => { napraviTabelu(result, desniDeoStrane, 3) }
    });

}

function napraviTabelu(nizKorisnika: Korisnik[], desniDeoStrane: any, sort: number) {
    var opisTabele = document.createElement("label");
    opisTabele.style.fontSize = "20px"
    desniDeoStrane.appendChild(opisTabele);

    var tabela = document.createElement("table");
    desniDeoStrane.appendChild(tabela);

    var tabelaRedZaglavlje = document.createElement("tr");
    tabela.appendChild(tabelaRedZaglavlje);

    var tabelaZaglavljeNick = document.createElement("th");
    tabelaZaglavljeNick.innerHTML = 'Nick Name';
    tabelaRedZaglavlje.appendChild(tabelaZaglavljeNick);

    var tabelaZaglavljeTimer = document.createElement("th");
    tabelaZaglavljeTimer.innerHTML = 'Vreme prve igre';
    tabelaRedZaglavlje.appendChild(tabelaZaglavljeTimer);

    var tabelaZaglavljeSkor2 = document.createElement("th");
    tabelaZaglavljeSkor2.innerHTML = 'Skor druge igre';
    tabelaRedZaglavlje.appendChild(tabelaZaglavljeSkor2);

    var tabelaZaglavljeSkor3 = document.createElement("th");
    tabelaZaglavljeSkor3.innerHTML = 'Skor treće igre';
    tabelaRedZaglavlje.appendChild(tabelaZaglavljeSkor3);

    var tabelaZaglavljeDatum = document.createElement("th");
    tabelaZaglavljeDatum.innerHTML = 'Datum igranja';
    tabelaRedZaglavlje.appendChild(tabelaZaglavljeDatum);

    if (sort == 1) {
        nizKorisnika.sort((a, b) => b.prvaIgraTimer - a.prvaIgraTimer);
        opisTabele.innerHTML = 'Tabela za prikaz igrača sortiranih po prvoj igri'
    }
    else if (sort == 2) {
        nizKorisnika.sort((a, b) => b.drugaIgraSkor - a.drugaIgraSkor);
        opisTabele.innerHTML = 'Tabela za prikaz igrača sortiranih po drugoj igri'
    } else {
        nizKorisnika.sort((a, b) => b.trecaIgraSkor - a.trecaIgraSkor);
        opisTabele.innerHTML = 'Tabela za prikaz igrača sortiranih po trećoj igri'
    }
    nizKorisnika.slice(-5).forEach((kor: Korisnik) => {
        var tabelaRed = document.createElement("tr");
        tabela.appendChild(tabelaRed);

        var nickPodatak = document.createElement("td");
        nickPodatak.innerHTML = kor.nickName;
        tabelaRed.appendChild(nickPodatak);

        var timerPodatak = document.createElement("td");
        timerPodatak.innerHTML = prebaciUVreme(kor.prvaIgraTimer);
        tabelaRed.appendChild(timerPodatak);

        var drugaIgraSkorPodatak = document.createElement("td");
        drugaIgraSkorPodatak.innerHTML = kor.drugaIgraSkor.toString();
        tabelaRed.appendChild(drugaIgraSkorPodatak);

        var trecaIgraSkorPodatak = document.createElement("td");
        trecaIgraSkorPodatak.innerHTML = kor.trecaIgraSkor.toString();
        tabelaRed.appendChild(trecaIgraSkorPodatak);

        var datumPodatak = document.createElement("td");
        datumPodatak.innerHTML = kor.datum;
        tabelaRed.appendChild(datumPodatak);
    });
}

function prebaciUVreme(vreme: number) {
    var minuti: any = Math.floor(vreme / 6000);
    var sekunde: any = Math.floor((vreme - (minuti * 6000)) / 100);
    var milisekunde: any = vreme - (minuti * 6000) - (sekunde * 100);

    if (minuti < 10) { minuti = "0" + minuti; }
    if (sekunde < 10) { sekunde = "0" + sekunde; }
    if (milisekunde < 10) { milisekunde = "0" + milisekunde; }
    return minuti + ':' + sekunde + '.' + milisekunde;
}