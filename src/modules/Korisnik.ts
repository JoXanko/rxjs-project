class Korisnik {
    nickName: string;
    prvaIgraTimer: number;
    drugaIgraSkor: number;
    trecaIgraSkor: number;
    constructor(nickName: string, prvaIgraTimer: number, drugaIgraSkor: number, trecaIgraSkor: number) {
        this.nickName = nickName;
        this.prvaIgraTimer = prvaIgraTimer;
        this.drugaIgraSkor = drugaIgraSkor;
        this.trecaIgraSkor = trecaIgraSkor;
    }
}