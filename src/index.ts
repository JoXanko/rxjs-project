import {pokreniPrvuIgru}from '../src/modules/prvaIgra';
import {pokreniTrecuIgru}from '../src/modules/trecaIgra';

var celaStrana = document.body;
celaStrana.style.height = '98vh';
celaStrana.id = "celaStrana";

var leviDeoStrane = document.createElement("div");
leviDeoStrane.id = 'leviDeoStrane';
leviDeoStrane.style.display = 'none';
celaStrana.appendChild(leviDeoStrane);

var desniDeoStrane = document.createElement("div");
desniDeoStrane.id = 'desniDeoStrane';
desniDeoStrane.style.display = 'none';
celaStrana.appendChild(desniDeoStrane);

let nickName: string;
/*let vremePrveIgre: number;
let drugaIgraSkor: number;
let trecaIgraSkor: number;*/

pocetak();

function pocetak() {
    var pocetniPrikaz = document.createElement("div");
    pocetniPrikaz.id = 'pocetniPrikaz';
    celaStrana.appendChild(pocetniPrikaz);

    var nickDiv = document.createElement('div');
    pocetniPrikaz.appendChild(nickDiv);

    var igriceOpis = document.createElement('div');
    igriceOpis.style.display='none';
    pocetniPrikaz.appendChild(igriceOpis);

    var prikaziDivOpisa=document.createElement('label');
    prikaziDivOpisa.innerHTML='Prikaži uputstva za igre';    
    prikaziDivOpisa.className = 'labeleNaPocetku';
    prikaziDivOpisa.onclick=(e)=>{
        prikaziDivOpisa.style.display='none';
        igriceOpis.style.display='block';
        pocetniPrikaz.style.width='50%';
    }
    pocetniPrikaz.appendChild(prikaziDivOpisa);

    var labelaNickName = document.createElement("label");
    labelaNickName.className = 'labeleNaPocetku';
    labelaNickName.innerHTML = 'Nick name: ';
    labelaNickName.style.marginRight='15px'
    nickDiv.appendChild(labelaNickName);

    var nickNameInput = document.createElement("input");
    nickNameInput.placeholder='unesite nick';
    nickNameInput.className='nickInput';
    nickDiv.appendChild(nickNameInput);

    var opisPrveIgre = document.createElement("label");
    opisPrveIgre.innerHTML = '1. Prilikom startovanja prve igre timer odmah počinje da odbrojava, tako da budite spremni. Potrebno je pronaći ključ na ekranu. Da biste to uspeli potrebno je koristiti krugove sa leve strane koji pomeranjem miša pokazuju vašu udaljenost od ključa. Kada mu se dovoljno približite ključ će postati vidljiv, a potom je potrebno kliknuti na njega, čime će se timer pauzirati i pokrenuti druga igra.';
    opisPrveIgre.className = 'labeleNaPocetku';
    igriceOpis.appendChild(opisPrveIgre);

    var opisDrugeIgre = document.createElement("label");
    opisDrugeIgre.className = 'labeleNaPocetku';
    opisDrugeIgre.innerHTML = '2. U drugoj igri je potrebno pamtiti reči koje se prikazuju na ekranu, za svaku reč imate 2.5 sekundi da odgovorite da li je ona već viđena ili nova. Kada utvrdite potrebno je kliknuti na dugme i time će se rezultat za tu igru povećati ili ostati nepromenjen ukoliko ste pogrešili.';
    igriceOpis.appendChild(opisDrugeIgre);

    var opisTreceIgre = document.createElement("label");
    opisTreceIgre.className = 'labeleNaPocetku';
    opisTreceIgre.innerHTML = '3. U trecoj igri je potrebno pamtiti reči koje inje da odbrojava, tako da budite spremni. Potrebno je pronaći ključ na ekranu. Da biste to uspeli potre ona već viđena ili nova. Kada utvrdite potrebno je kliknuti na dugme i time će se rezultat za tu igru povećati ili ostati isti ukoliko ste pogrešili.';
    igriceOpis.appendChild(opisTreceIgre);

    var opisIgara = document.createElement("label");
    opisIgara.innerHTML = 'Klikom na dugme "pokreni igru" počeće prva igra, tako da budite spremni!';
    opisIgara.className = 'labeleNaPocetku';
    igriceOpis.appendChild(opisIgara);

    var buttonPokreniIgre = document.createElement("button");
    buttonPokreniIgre.className = 'dugmeZaRec';
    buttonPokreniIgre.innerHTML = 'Pokreni!';
    pocetniPrikaz.appendChild(buttonPokreniIgre);


    buttonPokreniIgre.onclick = (e) => {
        if (nickNameInput.value != '') {
            leviDeoStrane.style.display = 'flex';
            desniDeoStrane.style.display = 'flex';
            pocetniPrikaz.style.display = 'none';
            nickName = nickNameInput.value.toString();
                //pokreniPrvuIgru(leviDeoStrane,desniDeoStrane,nickName);
                pokreniTrecuIgru(leviDeoStrane,desniDeoStrane,'bla',5,5);
        }
        else{
            nickNameInput.classList.toggle("shakeAnimacija");
        }
            //alert("Morate uneti nick name kako biste pokrenuli igre");

    }
}

//////////////////////////////////// upis u bazu ////////////////////////////////////

/////BITNO!!!!!!!!!!!!!!!!!!!!!
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