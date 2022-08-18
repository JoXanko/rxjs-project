import { unstable_getScrollbarSize } from "@mui/utils";
import { interval } from "rxjs";

export function pokreniTrecuIgru(leviDeoStrane:any,desniDeoStrane:any,nickName:string,vremePrveIgre:number,drugaIgraSkor:number) {  
    var zivoti: number = 3;
    var z: boolean = true;

    var divTrecaIgra = document.createElement("div");
    divTrecaIgra.className = "divLeveStraneIgraca";
    leviDeoStrane.appendChild(divTrecaIgra);

    var unosBrojeva = document.createElement("input");
    unosBrojeva.type='number';
    unosBrojeva.className='nickInput';
    desniDeoStrane.appendChild(unosBrojeva);

    var brojZivota = document.createElement("label");
    brojZivota.innerHTML = 'Preostalo zivota ';
    brojZivota.className = 'skorDrugeIgre';
    divTrecaIgra.appendChild(brojZivota);
    /////   srca
    var srce1 = document.createElement("img");
    srce1.src = "../src/assets/heart.png"
    srce1.width = 40;
    divTrecaIgra.appendChild(srce1);

    var srce2 = document.createElement("img");
    srce2.src = "../src/assets/heart.png"
    srce2.width = 40;
    divTrecaIgra.appendChild(srce2);

    var srce3 = document.createElement("img");
    srce3.src = "../src/assets/heart.png"
    srce3.width = 40;
    divTrecaIgra.appendChild(srce3);
    /////   srca

    interval(1500).pipe(
        
    )

}