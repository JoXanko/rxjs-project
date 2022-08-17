import { interval } from "rxjs";

export function pokreniTrecuIgru(leviDeoStrane:any,desniDeoStrane:any,nickName:string,vremePrveIgre:number,drugaIgraSkor:number) {


    var divTrecaIgra = document.createElement("div");
    divTrecaIgra.className = "divLeveStraneIgraca";
    leviDeoStrane.appendChild(divTrecaIgra);

    var unosBrojeva = document.createElement("input");
    desniDeoStrane.appendChild(unosBrojeva);

    /*var brojZivota = document.createElement("label");
    brojZivota.innerHTML = '3';
    brojZivota.className = 'skorDrugeIgre';
    divTrecaIgra.appendChild(brojZivota);*/
    /////   srca
    var srce1 = document.createElement("img");
    srce1.src = "../src/assets/heart.png"
    srce1.width = 40;
    srce1.style.paddingBottom = '10px'
    divTrecaIgra.appendChild(srce1);

    var srce2 = document.createElement("img");
    srce2.src = "../src/assets/heart.png"
    srce2.width = 40;
    srce2.style.paddingBottom = '10px'
    divTrecaIgra.appendChild(srce2);

    var srce3 = document.createElement("img");
    srce3.src = "../src/assets/heart.png"
    srce3.width = 40;
    srce3.style.paddingBottom = '10px'
    divTrecaIgra.appendChild(srce3);

    var zivoti: number = 3;
    var z: boolean = true;
    /////   srca

    interval(1500).pipe(
        //(zivoti>0)
    )

}