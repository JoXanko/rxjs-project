import { pokreniPrvuIgru } from '../src/modules/prvaIgra';
import { pokreniTrecuIgru } from '../src/modules/trecaIgra';
import { pokreniDruguIgru } from '../src/modules/drugaIgra';

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
pocetak();

function pocetak() {
    var pocetniPrikaz = document.createElement("div");
    pocetniPrikaz.id = 'pocetniPrikaz';
    celaStrana.appendChild(pocetniPrikaz);

    var nickDiv = document.createElement('div');
    pocetniPrikaz.appendChild(nickDiv);

    var igriceOpis = document.createElement('div');
    igriceOpis.style.display = 'none';
    pocetniPrikaz.appendChild(igriceOpis);

    var prikaziDivOpisa = document.createElement('label');
    prikaziDivOpisa.innerHTML = 'Prikaži uputstva za igre';
    prikaziDivOpisa.className = 'labeleNaPocetku';
    prikaziDivOpisa.onclick = (e) => {
        prikaziDivOpisa.style.display = 'none';
        igriceOpis.style.display = 'block';
        pocetniPrikaz.style.width = '50%';
    }
    pocetniPrikaz.appendChild(prikaziDivOpisa);

    var labelaNickName = document.createElement("label");
    labelaNickName.className = 'labeleNaPocetku';
    labelaNickName.innerHTML = 'Nick name: ';
    labelaNickName.style.marginRight = '15px'
    nickDiv.appendChild(labelaNickName);

    var nickNameInput = document.createElement("input");
    nickNameInput.placeholder = 'Unesite nick';
    nickNameInput.style.letterSpacing = '0';
    nickNameInput.className = 'nickInput';
    nickDiv.appendChild(nickNameInput);
    //nickNameInput.focus();

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
    opisTreceIgre.innerHTML = '3. U trećoj igri imate 3 života, i igra traje dokle god imate barem jedan preostao život. Oni su predstavljeni slicicom srca sa leve strane, i svakim pogrešnim unosom gubite po jedan život. Do 5 brojeva imate po 4 sekundi da zapamtite i po 4 sekundi da odgovorite, a posle toga se vreme produžava za po jednu sekundu na svakih 5 dodatnih brojeva.';
    igriceOpis.appendChild(opisTreceIgre);

    var opisIgara = document.createElement("label");
    opisIgara.innerHTML = 'Klikom na dugme "Pokreni" počeće prva igra, tako da budite spremni!';
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
            pokreniPrvuIgru(leviDeoStrane, desniDeoStrane, nickName);            
            //pokreniDruguIgru(leviDeoStrane,desniDeoStrane,'bla',5);
            //pokreniTrecuIgru(leviDeoStrane, desniDeoStrane, 'Teodor', 1002, 10);
        }
        else
            nickNameInput.classList.toggle("shakeAnimacija");
    }

    nickNameInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter")
            buttonPokreniIgre.click();
    })
}