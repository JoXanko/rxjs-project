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
    korisnik = new Korisnik(nickName, vremePrveIgre, drugaIgraSkor, skorTreceIgre, new Date().toJSON());
    //upisiUBazu();
    //citajIzBaze();

    var listaKorisnika: Korisnik[] = [];
    fetch(`http://localhost:3000/korisnici`).then(p =>
        p.json().then(korisnici =>
            korisnici.forEach((k: Korisnik) => {
                var r = new Korisnik(k.nickName, k.prvaIgraTimer, k.drugaIgraSkor, k.trecaIgraSkor, k.datum);
                listaKorisnika.push(r);
            })
        )
    )

    const korisnici = fromFetch('http://localhost:3000/korisnici').pipe(switchMap(response => {
        if (response.ok) {
            return response.json();
        }
    }));

    korisnici.pipe(map(items=>items.filter((k:Korisnik)=>k.prvaIgraTimer>1000))).subscribe({next: result => console.log(result)});
}