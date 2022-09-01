import { startFirstGame } from './modules/firstGame';
import { startSecondGame } from './modules/secondGame';
import { startThirdGame } from './modules/thirdGame';

var wholePage = document.body;
wholePage.style.height = '98vh';
wholePage.id = "wholePage";

var pageLeftSide = document.createElement("div");
pageLeftSide.id = 'pageLeftSide';
pageLeftSide.style.display = 'none';
wholePage.appendChild(pageLeftSide);

var pageRightSide = document.createElement("div");
pageRightSide.id = 'pageRightSide';
pageRightSide.style.display = 'none';
wholePage.appendChild(pageRightSide);

let nickName: string;

var welcomeDiv = document.createElement("div");
welcomeDiv.id = 'welcomeDiv';
wholePage.appendChild(welcomeDiv);

var nickDiv = document.createElement('div');
welcomeDiv.appendChild(nickDiv);

var gamesDescription = document.createElement('div');
gamesDescription.style.display = 'none';
welcomeDiv.appendChild(gamesDescription);

var showGamesDesc = document.createElement('label');
showGamesDesc.innerHTML = 'Prikaži uputstva za igre';
showGamesDesc.className = 'gameDescLabels';
showGamesDesc.onclick = (e) => {
    showGamesDesc.style.display = 'none';
    gamesDescription.style.display = 'block';
    welcomeDiv.style.width = '50%';
}
welcomeDiv.appendChild(showGamesDesc);

var labelaNickName = document.createElement("label");
labelaNickName.className = 'gameDescLabels';
labelaNickName.innerHTML = 'Nick name: ';
labelaNickName.style.marginRight = '15px'
nickDiv.appendChild(labelaNickName);

var nickNameInput = document.createElement("input");
nickNameInput.placeholder = 'Unesite nick';
nickNameInput.style.letterSpacing = '0';
nickNameInput.className = 'styledInput';
nickDiv.appendChild(nickNameInput);
//nickNameInput.focus();

var firstGameDesc = document.createElement("label");
firstGameDesc.innerHTML = '1. Prilikom startovanja prve igre timer odmah počinje da odbrojava, tako da budite spremni. Potrebno je pronaći ključ na ekranu. Da biste to uspeli potrebno je koristiti krugove sa leve strane, koji pomeranjem miša pokazuju vašu udaljenost od ključa. Kada mu se dovoljno približite ključ će postati vidljiv, a potom je potrebno kliknuti na njega, čime će se timer pauzirati, katacan otključati i pokrenuti druga igra.';
firstGameDesc.className = 'gameDescLabels';
gamesDescription.appendChild(firstGameDesc);

var secondGameDesc = document.createElement("label");
secondGameDesc.className = 'gameDescLabels';
secondGameDesc.innerHTML = '2. U drugoj igri je potrebno pamtiti reči koje se prikazuju na ekranu. Za svaku reč imate 2.5 sekunde da odgovorite da li je ona već viđena ili nova. Kada utvrdite potrebno je kliknuti na dugme i time će se rezultat za tu igru povećati ili ostati nepromenjen ukoliko ste pogrešili. Biće vam prikazane 12 reči';
gamesDescription.appendChild(secondGameDesc);

var thirdGameDesc = document.createElement("label");
thirdGameDesc.className = 'gameDescLabels';
thirdGameDesc.innerHTML = '3. U trećoj igri imate 3 života, i igra traje dokle god imate barem jedan preostali život. Životi su predstavljeni sličicom srca sa leve strane, i svakim pogrešnim unosom gubite po jedan život. Do 5 brojeva imate po 4 sekundi da zapamtite i po 4 sekundi da odgovorite, a posle toga se vreme produžava za po polovinu prethodnog vremena na svakih 5 dodatnih brojeva.';
gamesDescription.appendChild(thirdGameDesc);

var warningBeforeStart = document.createElement("label");
warningBeforeStart.innerHTML = 'Klikom na dugme "Pokreni" počeće prva igra, tako da budite spremni!';
warningBeforeStart.className = 'gameDescLabels';
gamesDescription.appendChild(warningBeforeStart);

var startGamesButton = document.createElement("button");
startGamesButton.className = 'styledButton';
startGamesButton.innerHTML = 'Pokreni!';
welcomeDiv.appendChild(startGamesButton);


startGamesButton.onclick = (e) => {
    if (nickNameInput.value != '') {
        pageLeftSide.style.display = 'flex';
        pageRightSide.style.display = 'flex';
        welcomeDiv.style.display = 'none';
        nickName = nickNameInput.value.toString();
        startFirstGame(pageLeftSide, pageRightSide, nickName);
        //pokreniDruguIgru(leviDeoStrane,desniDeoStrane,'bla',5);
        //startThirdGame(pageLeftSide, pageRightSide, 'Luka', 1002, 10);
    }
    else {
        nickNameInput.classList.toggle("shakeAnimacija");
        nickNameInput.placeholder = 'Nick ne sme biti prazan'
    }
}

nickNameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter")
        startGamesButton.click();
})