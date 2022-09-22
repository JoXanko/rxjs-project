import {
  combineLatest,
  concatMap,
  delay,
  finalize,
  from,
  fromEvent,
  mapTo,
  of,
  scan,
  startWith,
  tap,
  timer,
} from "rxjs";
import { startThirdGame } from "./thirdGame";
import { Word } from "./Word";

let secondGameScoreValue: number;
let seenCorrect: number = 0;
let newCorrect: number = 0;

var words: Word[] = [];
fetch("http://localhost:3000/words")
  .then((response) => response.json())
  .then((response) =>
    response.forEach((e: Word) => {
      words.push(new Word(e.id, e.word));
    })
  );

export function startSecondGame(
  pageLeftSide: any,
  pageRightSide: any,
  nickName: string,
  firstGameTimerValue: number
) {
  var counter = 0;
  var randomizedWords: Word[] = [];
  const seenWordsArray: Word[] = [];
  var correct: number = 0;
  var isWordCorrectlyAnswered: boolean;
  var i = 0;
  var wordDuration: number = 2500;
  var additionalDelay: number = 500;
  var numberOfWords: number = 12;
  var minRecurrence: number = 3;
  var wordsFontSIze: string = "25px";
  var oneSecToMs: number = 1000;

  let displayWord = document.createElement("label");
  displayWord.className = "numbersAndWords";
  //prikazanaRec.style.display = 'none';
  displayWord.innerHTML = "Druga igra pocinje ubrzo";
  pageRightSide.appendChild(displayWord);

  let progressBarDiv = document.createElement("div");
  progressBarDiv.style.display = "none";
  progressBarDiv.id = "progressBarDiv";
  pageRightSide.appendChild(progressBarDiv);

  let buttonsDiv = document.createElement("div");
  buttonsDiv.style.display = "none";
  pageRightSide.appendChild(buttonsDiv);

  let seenButton = document.createElement("button");
  seenButton.innerHTML = "Vidjena";
  seenButton.className = "styledButton";
  seenButton.id = "seenWord";
  seenButton.disabled = true;
  //dugmeVidjena.style.display = "none";
  buttonsDiv.appendChild(seenButton);

  let newButton = document.createElement("button");
  newButton.innerHTML = "Nova";
  newButton.className = "styledButton";
  newButton.id = "newWord";
  newButton.disabled = true;
  //dugmeNova.style.display = "none";
  buttonsDiv.appendChild(newButton);

  var secondGameDiv = document.createElement("div");
  secondGameDiv.id = "leftSideScoresDiv"; //drugaIgraDivId
  pageLeftSide.appendChild(secondGameDiv);

  var secondGameScore = document.createElement("label");
  secondGameScore.className = "leftSideScoresDiv";
  secondGameScore.id = "skorDrugeIgre";
  secondGameScore.innerHTML = "Broj pogodaka";
  secondGameDiv.appendChild(secondGameScore);

  var seenWords = document.createElement("label");
  seenWords.className = "leftSideScoresDiv";
  seenWords.style.fontSize = wordsFontSIze;
  seenWords.id = "vidjene";
  seenWords.innerHTML = "Broj pogodaka";
  secondGameDiv.appendChild(seenWords);

  var newWords = document.createElement("label");
  newWords.className = "leftSideScoresDiv";
  newWords.style.fontSize = wordsFontSIze;
  newWords.id = "nove";
  newWords.innerHTML = "Broj pogodaka";
  secondGameDiv.appendChild(newWords);

  var triesCount = document.createElement("label");
  triesCount.className = "leftSideScoresDiv";
  triesCount.style.fontSize = wordsFontSIze;
  triesCount.id = "tries";
  triesCount.innerHTML = "Broj pogodaka";
  secondGameDiv.appendChild(triesCount);

  while (i < numberOfWords + 1) {
    randomizedWords[i] = words[(Math.random() * words.length) | 0];
    i++;
  }
  i = 0;

  while (i < minRecurrence) {
    /*var pozicija1 = Math.random() * 12 | 0;
        var pozicija2 = Math.random() * 12 | 0;
        if (pozicija1 == pozicija2) { }
        if (Math.abs(pozicija1 - pozicija2) == 1)
            pozicija2 = Math.random() * 12 | 0*/
    randomizedWords[(Math.random() * numberOfWords) | 0] =
      randomizedWords[(Math.random() * numberOfWords) | 0];
    i++;
  }
  //console.log(randomizedWords);

  let beforeGameTimer$ = timer(0, oneSecToMs).subscribe((n) => {
    displayWord.innerHTML =
      "Druga igra počinje za: " +
      ((wordDuration + additionalDelay) / oneSecToMs - n).toString() +
      " sekundi";
  });

  let game$ = from(randomizedWords)
    .pipe(
      concatMap((item) =>
        of(item).pipe(
          delay(wordDuration),
          tap(() => beforeGameTimer$.unsubscribe())
        )
      ), //2500 kad se ne testira vise!!!!!!!!!!!!!!!!!!!!!!!
      finalize(() => {
        progressBarDiv.style.display = "none";
        buttonsDiv.style.display = "none";
        displayWord.innerHTML = "";
        triesCounter$.unsubscribe();
        game$.unsubscribe();
        startThirdGame(
          pageLeftSide,
          pageRightSide,
          nickName,
          firstGameTimerValue,
          secondGameScoreValue
        );
      })
    )
    .subscribe((timedItem) => {
      progressBarDiv.style.display = "inline";
      buttonsDiv.style.display = "inline";
      bar.set(0); //progress bar reset
      displayWord.innerHTML = timedItem.word;
      seenWordsArray[counter] = timedItem;
      counter++;

      isWordCorrectlyAnswered = false;
      for (var i: number = 0; i < seenWordsArray.length - 1; i++) {
        if (seenWordsArray[i] == timedItem) isWordCorrectlyAnswered = true;
      }

      seenButton.disabled = false;
      newButton.disabled = false;
      bar.animate(1.0);
      secondGameScoreValue = correct;
    });

  newButton.addEventListener("click", function () {
    if (!isWordCorrectlyAnswered) {
      correct++;
      newCorrect++;
    }
    secondGameScore.innerHTML = "Broj pogodaka: " + correct.toString();
    seenButton.disabled = true;
    newButton.disabled = true;
  });
  seenButton.addEventListener("click", function () {
    if (isWordCorrectlyAnswered) {
      correct++;
      seenCorrect++;
    }
    secondGameScore.innerHTML = "Broj pogodaka: " + correct.toString();
    seenButton.disabled = true;
    newButton.disabled = true;
  });

  const addOneClick$ = (id: string) =>
    fromEvent(document.getElementById(id), "click").pipe(
      mapTo(1),
      scan((acc, curr) => acc + curr, 0),
      startWith(0)
    );

  let triesCounter$ = combineLatest(
    addOneClick$("newWord"),
    addOneClick$("seenWord")
  ).subscribe(([newWord, seenWord]: any) => {
    seenWords.innerHTML =
      "Viđene: od " + seenWord + " pokušaja, " + seenCorrect + " je tačnih"; //vidjena
    newWords.innerHTML =
      "Nove: od " + newWord + " pokušaja, " + newCorrect + " je tačnih"; //nova
    triesCount.innerHTML = "Ukupno pokušaja: " + (newWord + seenWord);
  });

  var ProgressBar = require("progressbar.js");
  var line = new ProgressBar.Line("#progressBarDiv");
  var bar = new ProgressBar.Line(progressBarDiv, {
    strokeWidth: 4,
    easing: "easeInOut",
    duration: wordDuration,
    color: "#7adbfa",
    trailColor: "#eee",
    trailWidth: 1,
    svgStyle: { width: "100%", height: "100%" },
    from: { color: "#6de6e6" },
    to: { color: "#209696" },
    step: (state: any, bar: any) => {
      bar.path.setAttribute("stroke", state.color);
    },
  });
}
