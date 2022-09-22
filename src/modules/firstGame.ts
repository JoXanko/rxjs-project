import { filter, fromEvent, map, timer, zip } from "rxjs";
import { startSecondGame as startSecondGame } from "./secondGame";

let firstGameTimerValue: number;
let blue: string = "#4788c9"; //1861b5
let yellow: string = "#f7ec52"; //f7e436
let red: string = "#c94747"; //db2e3c
let green: string = "#49c947"; //2dd424
let white: string = "#ffffff";
let leftSidePercentage: number = 40;
let greenCirclesPixels: number = 50;
let blueCirclesPixels: number = 150;
let yellowCirclesPixels: number = 350;
let locIcoWidth: number = 40;
let oneSecToMs: number = 1000;

export function startFirstGame(
  pageLeftSide: any,
  pageRightSide: any,
  nickName: string
) {
  var keyPosition = [
    (Math.random() * pageRightSide.offsetWidth) | 0,
    (Math.random() * pageRightSide.offsetHeight) | 0,
  ];
  if (keyPosition[0] < (pageRightSide.offsetWidth / 100) * leftSidePercentage)
    keyPosition[0] =
      ((pageRightSide.offsetWidth / 100) * leftSidePercentage +
        keyPosition[0]) |
      0;

  console.log(keyPosition);
  let nickLabel = document.createElement("label");
  nickLabel.className = "nickDisplay";
  nickLabel.style.marginLeft = "0px";
  nickLabel.style.marginTop = "20px";
  nickLabel.innerHTML = "Vaš nick name: " + nickName;
  pageLeftSide.appendChild(nickLabel);
  /////   dugme
  var keyButtonToFind = document.createElement("input");
  keyButtonToFind.type = "image";
  keyButtonToFind.id = "keyButton";
  keyButtonToFind.src = "../src/assets/key.png";
  keyButtonToFind.style.position = "absolute";
  keyButtonToFind.style.left = keyPosition[0].toString() + "px";
  keyButtonToFind.style.top = keyPosition[1].toString() + "px";
  keyButtonToFind.style.display = "none";
  pageRightSide.appendChild(keyButtonToFind);
  /////   dugme

  /////   katancic
  var lockIcon = document.createElement("img");
  lockIcon.src = "../src/assets/padlock.png";
  lockIcon.width = locIcoWidth;
  lockIcon.style.paddingBottom = "10px";
  /////   katancic

  /////   circles
  var circles = document.createElement("div");
  circles.className = "circles";
  pageLeftSide.appendChild(circles);

  var redCircle = document.createElement("div");
  redCircle.className = "circle";
  redCircle.style.backgroundColor = "white";
  circles.appendChild(redCircle);

  var yellowCircle = document.createElement("div");
  yellowCircle.className = "circle";
  yellowCircle.style.backgroundColor = "white";
  circles.appendChild(yellowCircle);

  var blueCircle = document.createElement("div");
  blueCircle.className = "circle";
  blueCircle.style.backgroundColor = "white";
  circles.appendChild(blueCircle);
  /////   circles

  /////   pomeranje misa
  const combineMouseXYPosition$ = (eventName: string) =>
    fromEvent(document, eventName).pipe(
      map((e: MouseEvent) => ({ x: e.clientX, y: e.clientY })),
      filter(
        (x) => x.x >= (pageRightSide.offsetWidth / 100) * leftSidePercentage
      )
    );

  let mouseMove$ = zip(combineMouseXYPosition$("mousemove")).subscribe((e) => {
    var pointerPosition = e;

    //console.log(pointerPosition);
    if (
      pointerPosition[0].x > keyPosition[0] - greenCirclesPixels &&
      pointerPosition[0].x < keyPosition[0] + greenCirclesPixels &&
      pointerPosition[0].y > keyPosition[1] - greenCirclesPixels &&
      pointerPosition[0].y < keyPosition[1] + greenCirclesPixels
    ) {
      keyButtonToFind.style.display = "inline";
      redCircle.style.backgroundColor = green;
      yellowCircle.style.backgroundColor = green;
      blueCircle.style.backgroundColor = green;
    } else if (
      pointerPosition[0].x > keyPosition[0] - blueCirclesPixels &&
      pointerPosition[0].x < keyPosition[0] + blueCirclesPixels &&
      pointerPosition[0].y > keyPosition[1] - blueCirclesPixels &&
      pointerPosition[0].y < keyPosition[1] + blueCirclesPixels
    ) {
      blueCircle.style.backgroundColor = blue;
      yellowCircle.style.backgroundColor = yellow;
      redCircle.style.backgroundColor = red;
      keyButtonToFind.style.display = "none";
    } else if (
      pointerPosition[0].x > keyPosition[0] - yellowCirclesPixels &&
      pointerPosition[0].x < keyPosition[0] + yellowCirclesPixels &&
      pointerPosition[0].y > keyPosition[1] - yellowCirclesPixels &&
      pointerPosition[0].y < keyPosition[1] + yellowCirclesPixels
    ) {
      yellowCircle.style.backgroundColor = yellow;
      blueCircle.style.backgroundColor = white;
      redCircle.style.backgroundColor = red;
      keyButtonToFind.style.display = "none";
    } else {
      redCircle.style.backgroundColor = red;
      yellowCircle.style.backgroundColor = white;
      blueCircle.style.backgroundColor = white;
      keyButtonToFind.style.display = "none";
    }
  });
  /////   pomeranje misa

  let firstGameTimer$ = timer(0, 10).subscribe((n) => {
    (timerValueShow.innerHTML = convertIntoTime(n)), (firstGameTimerValue = n);
  });

  var firstGameDiv = document.createElement("div");
  pageLeftSide.appendChild(firstGameDiv);

  var timerValueShow = document.createElement("label");
  timerValueShow.id = "timer";
  firstGameDiv.appendChild(lockIcon);
  firstGameDiv.appendChild(timerValueShow);
  firstGameDiv.className = "leftSideScoresDiv";
  keyButtonToFind.addEventListener("click", function () {
    mouseMove$.unsubscribe();
    circles.style.display = "none";
    keyButtonToFind.style.display = "none";
    lockIcon.src = "../src/assets/padlockOpen.png";
    firstGameTimer$.unsubscribe();
    /*dugmeVidjena.style.display = "inline";
        dugmeNova.style.display = "inline";
        prikazanaRec.style.display = 'inline';*/

    startSecondGame(pageLeftSide, pageRightSide, nickName, firstGameTimerValue);
  });

  function convertIntoTime(vreme: number) {
    var minutes: any = Math.floor(vreme / (6 * oneSecToMs));
    var seconds: any = Math.floor((vreme - minutes * 6 * oneSecToMs) / 100);
    var mseconds: any = vreme - minutes * 6 * oneSecToMs - seconds * 100;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (mseconds < 10) {
      mseconds = "0" + mseconds;
    }
    return minutes + ":" + seconds + "." + mseconds;
  }
}
