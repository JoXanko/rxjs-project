import { map, switchMap } from "rxjs";
import { User } from "./User"
import { fromFetch } from 'rxjs/fetch';

var user: User;
var nextID: number;

async function upisiUBazu(u: User) {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(u)
    })
    return response.json()
}

export function showScoreBoard(pageLeftSide: any, pageRightSide: any, nickName: string, firstGameTimerValue: number, secondGameScoreValue: number, thirdGameScoreValue: number) {
    user = new User(nickName, firstGameTimerValue, secondGameScoreValue, 6, new Date().toLocaleString());

    upisiUBazu(user);
    //console.log(user);
    const users = fromFetch('http://localhost:3000/users').pipe(switchMap(response => {
        if (response.ok) {
            return response.json();
        }
    }));
    users.subscribe(x => nextID = x.length);

    users.pipe(map(items => items.filter((k: User) => k.firstGameTimerValue >= user.firstGameTimerValue))).subscribe({
        next: usersArray => { showTable(usersArray, pageRightSide, 1) }
    });

    users.pipe(map(items => items.filter((k: User) => k.secondGameScoreValue <= user.secondGameScoreValue))).subscribe({
        next: usersArray => { showTable(usersArray, pageRightSide, 2) }
    });

    users.pipe(map(items => items.filter((k: User) => k.thirdGameScoreValue <= user.thirdGameScoreValue))).subscribe({
        next: usersArray => { showTable(usersArray, pageRightSide, 3) }
    });

}

function showTable(usersArray: User[], rightPageSide: any, sort: number) {
    var tableDescription = document.createElement("label");
    tableDescription.style.fontSize = "20px"
    rightPageSide.appendChild(tableDescription);

    var table = document.createElement("table");
    rightPageSide.appendChild(table);

    var headerTableRow = document.createElement("tr");
    table.appendChild(headerTableRow);

    var headerNick = document.createElement("th");
    headerNick.innerHTML = 'Nick Name';
    headerTableRow.appendChild(headerNick);

    var headerFirstGameTimerValue = document.createElement("th");
    headerFirstGameTimerValue.innerHTML = 'Vreme prve igre';
    headerTableRow.appendChild(headerFirstGameTimerValue);

    var headerSecondGameScoreValue = document.createElement("th");
    headerSecondGameScoreValue.innerHTML = 'Skor druge igre';
    headerTableRow.appendChild(headerSecondGameScoreValue);

    var headerThirdGameScoreValue = document.createElement("th");
    headerThirdGameScoreValue.innerHTML = 'Skor treće igre';
    headerTableRow.appendChild(headerThirdGameScoreValue);

    var headerDatePlayed = document.createElement("th");
    headerDatePlayed.innerHTML = 'Datum igranja';
    headerTableRow.appendChild(headerDatePlayed);

    usersArray.reverse();

    if (sort == 1) {
        usersArray.sort((a, b) => a.firstGameTimerValue - b.firstGameTimerValue);
        tableDescription.innerHTML = 'Tabela za prikaz igrača sortiranih po prvoj igri'
    }
    else if (sort == 2) {
        usersArray.sort((a, b) => b.secondGameScoreValue - a.secondGameScoreValue);
        tableDescription.innerHTML = 'Tabela za prikaz igrača sortiranih po drugoj igri'
    } else {
        usersArray.sort((a, b) => b.thirdGameScoreValue - a.thirdGameScoreValue);
        tableDescription.innerHTML = 'Tabela za prikaz igrača sortiranih po trećoj igri'
    }

    usersArray.slice(0, 5).forEach((oneUser: User) => {
        var tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        if (oneUser.id == nextID + 1)
            tableRow.style.background = "#bae3db";

        var dataNickName = document.createElement("td");
        dataNickName.innerHTML = oneUser.nickName;
        tableRow.appendChild(dataNickName);

        var dataFirstGameTimerValue = document.createElement("td");
        dataFirstGameTimerValue.innerHTML = convertIntoTime(oneUser.firstGameTimerValue);
        tableRow.appendChild(dataFirstGameTimerValue);

        var dataSecondGameScoreValue = document.createElement("td");
        dataSecondGameScoreValue.innerHTML = oneUser.secondGameScoreValue.toString();
        tableRow.appendChild(dataSecondGameScoreValue);

        var dataThirdGameScoreValue = document.createElement("td");
        dataThirdGameScoreValue.innerHTML = oneUser.thirdGameScoreValue.toString();
        tableRow.appendChild(dataThirdGameScoreValue);

        var dataDatePlayed = document.createElement("td");
        dataDatePlayed.innerHTML = oneUser.datePlayed;
        tableRow.appendChild(dataDatePlayed);
    });
}

function convertIntoTime(vreme: number) {
    var minutes: any = Math.floor(vreme / 6000);
    var seconds: any = Math.floor((vreme - (minutes * 6000)) / 100);
    var mseconds: any = vreme - (minutes * 6000) - (seconds * 100);

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    if (mseconds < 10) { mseconds = "0" + mseconds; }
    return minutes + ':' + seconds + '.' + mseconds;
}