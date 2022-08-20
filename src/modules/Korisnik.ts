export class Korisnik {
    nickName: string;
    prvaIgraTimer: number;
    drugaIgraSkor: number;
    trecaIgraSkor: number;
    datum:string;
    constructor(nickName: string, prvaIgraTimer: number, drugaIgraSkor: number, trecaIgraSkor: number, datum: string) {
        this.nickName = nickName;
        this.prvaIgraTimer = prvaIgraTimer;
        this.drugaIgraSkor = drugaIgraSkor;
        this.trecaIgraSkor = trecaIgraSkor;
        this.datum = datum;
    }
}