import { interval, tap, delay, timer } from "rxjs";
import { showScoreBoard as showScoreBoard } from "./resultsScoreBoard";

export function startThirdGame(pageLeftSide: any, pageRightSide: any, nickName: string, firstGameTimerValue: number, secondGameScoreValue: number) {
    var lives: number = 4;
    var shownNumber: string = 'a';
    var numberLength: number = 0;
    var thirdGameScoreValue: number = 0;
    var delayBetweenWords: number = 8000;// NA 8000 STAVI POSLE TESTIRANJA
    var scoreChanged: boolean = false;

    var thirdGameDiv = document.createElement("div");
    thirdGameDiv.className = "leftSideScoresDiv";
    pageLeftSide.appendChild(thirdGameDiv);

    var displayNumber = document.createElement("label");
    //prikazBroja.innerHTML = 'Igra uskoro počinje';
    displayNumber.className = 'numbersAndWords';
    pageRightSide.appendChild(displayNumber);

    let progressBarDiv = document.createElement("div");
    progressBarDiv.id = 'progressBarDiv';
    pageRightSide.appendChild(progressBarDiv);

    var inputForEnteringNumber = document.createElement("input");
    inputForEnteringNumber.disabled = true;
    inputForEnteringNumber.type = 'number';
    inputForEnteringNumber.className = 'styledInput';
    inputForEnteringNumber.style.width = '25rem';
    pageRightSide.appendChild(inputForEnteringNumber);

    var displayScore = document.createElement("label");
    //brojZivota.innerHTML = 'Preostalo zivota ';
    //brojZivota.className = 'leftSideScoresDiv';
    displayScore.style.display = 'block';
    displayScore.style.fontSize = '32px';
    //brojZivota.className = 'skorDrugeIgre';
    pageLeftSide.appendChild(displayScore);

    /////   srca
    var heart1 = document.createElement("img");
    heart1.src = "../src/assets/heart.png"
    heart1.id = 'heart1';
    heart1.width = 50;
    thirdGameDiv.appendChild(heart1);

    var heart2 = document.createElement("img");
    heart2.src = "../src/assets/heart.png"
    heart2.id = 'heart2';
    heart2.width = 50;
    thirdGameDiv.appendChild(heart2);

    var heart3 = document.createElement("img");
    heart3.src = "../src/assets/heart.png"
    heart3.id = 'heart3';
    heart3.width = 50;
    thirdGameDiv.appendChild(heart3);
    /////   srca
    
    let beforeGameTimer$ = timer(0, 1000).subscribe(n => { displayNumber.innerHTML = 'Treća igra počinje za: ' + ((delayBetweenWords / 1000) - n).toString() + ' sekundi'; });

    let thirdGame$ = interval(delayBetweenWords).pipe(tap(() => {
        beforeGameTimer$.unsubscribe()
        if (inputForEnteringNumber.value != shownNumber && !scoreChanged) {
            if (lives != 4) {
                brokeHeart();
            }
            else lives--;
        }
        else if (!scoreChanged) displayScore.innerHTML = 'Broj pogodaka: ' + (++thirdGameScoreValue).toString();

        scoreChanged = false;
        if (numberLength % 5 == 0) delayBetweenWords += delayBetweenWords / 2
        bar.animate(1.0);
        inputForEnteringNumber.value = '';
        numberLength++;
        findNextRandomNumber();
        console.log(shownNumber);
        displayNumber.innerHTML = shownNumber;
        inputForEnteringNumber.disabled = true;
    }),
        delay(delayBetweenWords / 2),
        tap(() => {
            bar.animate(0.0);
            displayNumber.innerHTML = 'Unesite broj';
            inputForEnteringNumber.disabled = false;
            inputForEnteringNumber.focus();
        }))
        .subscribe();

    inputForEnteringNumber.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            if (inputForEnteringNumber.value != shownNumber) {
                //unosBrojeva.classList.toggle("shakeAnimacija");
                brokeHeart();
            }
            else {
                displayScore.innerHTML = 'Broj pogodaka: ' + (++thirdGameScoreValue).toString();
            }
            scoreChanged = true;
            inputForEnteringNumber.disabled = true;
            displayNumber.innerHTML = 'Sačekajte sledeći broj';
        }

    })

    function brokeHeart() {
        var heartToBeBroken: any = document.getElementById('heart' + lives);
        lives--;
        heartToBeBroken.src = '../src/assets/heartBroken.png';
        if (lives == 0) {
            thirdGame$.unsubscribe();
            displayNumber.style.display = 'none'
            progressBarDiv.style.display = 'none'
            inputForEnteringNumber.style.display = 'none'
            showScoreBoard(pageLeftSide, pageRightSide, nickName, firstGameTimerValue, secondGameScoreValue, thirdGameScoreValue);
        }
    }
    function findNextRandomNumber() {
        shownNumber = '';
        for (var i: number = 0; i < numberLength; i++) {
            shownNumber += Math.random() * (10) | 0;
        }
    }
    var ProgressBar = require('progressbar.js')
    var line = new ProgressBar.Line('#progressBarDiv');
    var bar = new ProgressBar.Line(progressBarDiv, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: delayBetweenWords / 2,
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