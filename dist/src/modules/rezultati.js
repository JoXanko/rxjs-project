var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { map, switchMap } from "rxjs";
import { Korisnik } from "../modules/Korisnik";
import { fromFetch } from 'rxjs/fetch';
function upisiUBazu(kor) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/korisnici', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(kor)
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
export function prikaziSkorTabelu(pageRightSide, desniDeoStrane, nickName, vremePrveIgre, drugaIgraSkor, skorTreceIgre) {
    return __awaiter(this, void 0, void 0, function () {
        var korisnik, k, korisnici;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    korisnik = new Korisnik(nickName, vremePrveIgre, drugaIgraSkor, skorTreceIgre, new Date().toLocaleString());
                    return [4 /*yield*/, upisiUBazu(korisnik)];
                case 1:
                    k = _a.sent();
                    /*fetch('http://localhost:3000/korisnici', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(korisnik)
                    }).catch(err=>console.log(err));*/
                    console.log(korisnik);
                    korisnici = fromFetch('http://localhost:3000/korisnici').pipe(switchMap(function (response) {
                        if (response.ok) {
                            return response.json();
                        }
                    }));
                    korisnici.pipe(map(function (items) { return items.filter(function (k) { return k.prvaIgraTimer >= korisnik.prvaIgraTimer; }); })).subscribe({
                        next: function (result) { napraviTabelu(result, desniDeoStrane, 1); }
                    });
                    korisnici.pipe(map(function (items) { return items.filter(function (k) { return k.drugaIgraSkor <= korisnik.drugaIgraSkor; }); })).subscribe({
                        next: function (result) { napraviTabelu(result, desniDeoStrane, 2); }
                    });
                    korisnici.pipe(map(function (items) { return items.filter(function (k) { return k.trecaIgraSkor >= korisnik.trecaIgraSkor; }); })).subscribe({
                        next: function (result) { napraviTabelu(result, desniDeoStrane, 3); }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function napraviTabelu(nizKorisnika, desniDeoStrane, sort) {
    var opisTabele = document.createElement("label");
    opisTabele.style.fontSize = "20px";
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
        nizKorisnika.sort(function (a, b) { return b.prvaIgraTimer - a.prvaIgraTimer; });
        opisTabele.innerHTML = 'Tabela za prikaz igrača sortiranih po prvoj igri';
    }
    else if (sort == 2) {
        nizKorisnika.sort(function (a, b) { return b.drugaIgraSkor - a.drugaIgraSkor; });
        opisTabele.innerHTML = 'Tabela za prikaz igrača sortiranih po drugoj igri';
    }
    else {
        nizKorisnika.sort(function (a, b) { return b.trecaIgraSkor - a.trecaIgraSkor; });
        opisTabele.innerHTML = 'Tabela za prikaz igrača sortiranih po trećoj igri';
    }
    nizKorisnika.slice(-5).forEach(function (kor) {
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
function prebaciUVreme(vreme) {
    var minuti = Math.floor(vreme / 6000);
    var sekunde = Math.floor((vreme - (minuti * 6000)) / 100);
    var milisekunde = vreme - (minuti * 6000) - (sekunde * 100);
    if (minuti < 10) {
        minuti = "0" + minuti;
    }
    if (sekunde < 10) {
        sekunde = "0" + sekunde;
    }
    if (milisekunde < 10) {
        milisekunde = "0" + milisekunde;
    }
    return minuti + ':' + sekunde + '.' + milisekunde;
}
//# sourceMappingURL=rezultati.js.map