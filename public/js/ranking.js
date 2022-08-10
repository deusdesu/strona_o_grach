
r_snake();
r_czasowe("saper");
r_czasowe("sudoku")
function r_czasowe(nazwa){
	const il = localStorage.getItem(nazwa+"_ilosc");
	let najmniejszy = [];
	najmniejszy[0] = "nr_wyniku";
	najmniejszy[1] = 99999999999;//najwieksza wartosc
	let wynik_aktualny;
	tab_pokazanych = [];
	let il_pokazanych = 0;
	while (il_pokazanych != il){
		for(let i = 0;i<il;i++){
			//console.log("spr: "+nazwa+i);
			wynik_aktualny = parseInt(JSON.parse(localStorage.getItem(nazwa+i)).lp);
			//console.log("spr: "+wynik_aktualny);
			if((najmniejszy[1] > wynik_aktualny) && nie_byl_pokazany(tab_pokazanych,i)){
				najmniejszy[0] = i;
				najmniejszy[1] = JSON.parse(localStorage.getItem(nazwa+i)).lp;
				//console.log("spelniony");
			}
			//docID("r_snake_l").innerHTML +=  
		}
		//console.log(nazwa+najmniejszy[0]);
		docID("r_"+nazwa+"_l").innerHTML += "<p>"+JSON.parse(localStorage.getItem(nazwa+najmniejszy[0])).login+"</p>";
		docID("r_"+nazwa+"_w").innerHTML += "<p><b>"+daj_wynik(JSON.parse(localStorage.getItem(nazwa+najmniejszy[0])).lp)+"</p></b>";
		tab_pokazanych[il_pokazanych] = najmniejszy[0];
		il_pokazanych++;
		najmniejszy[1] = 99999999999;//reset
	}
}
function daj_wynik(liczba){
	liczba=liczba.toString();
	let l = liczba.length-1;
	let str = '';
	let co_2 = false;
	console.log(liczba);
	if(liczba > 99999){
		str = liczba[0]+liczba[1]+":"+liczba[2]+liczba[3]+":"+liczba[4]+liczba[5];
	}else if(liczba > 9999){
		str = liczba[0]+":"+liczba[1]+liczba[2]+":"+liczba[3]+liczba[4];
	}else if(liczba > 999){
		str = liczba[0]+liczba[1]+":"+liczba[2]+liczba[3];
	}else if(liczba > 99){
		str =liczba[0]+":"+liczba[1]+liczba[2];
	}else if(liczba > 9){
		str =liczba[0]+liczba[1];
	}else{
		str =liczba[0];
	}
	return str;
}
function r_snake(){
	//pokazuje 5 najlepszych wyników
	const il_snake = localStorage.getItem("snake_ilosc");
	//console.log(il_snake);
	let najwiekszy = [];
	najwiekszy[0] = "nr_wyniku";
	najwiekszy[1] = 0;//najwieksza wartosc
	let wynik_aktualny;
	tab_pokazanych = [];
	let il_pokazanych = 0;
	while (il_pokazanych != il_snake){
		//okreslanie najwiekszego wyniku
		for(let i = 0;i<il_snake;i++){
			//console.log(najwiekszy +"<"+ parseInt(JSON.parse(localStorage.getItem("snake"+i)).lp))
			wynik_aktualny = parseInt(JSON.parse(localStorage.getItem("snake"+i)).lp);
			if((najwiekszy[1] < wynik_aktualny) && nie_byl_pokazany(tab_pokazanych,i)){
				najwiekszy[0] = i;
				najwiekszy[1] = JSON.parse(localStorage.getItem("snake"+i)).lp;
				//console.log("spelniony");
			}
			//docID("r_snake_l").innerHTML +=  
		}
		//wpisywanie
		docID("r_snake_l").innerHTML += "<p>"+JSON.parse(localStorage.getItem("snake"+najwiekszy[0])).login+"</p>";
		docID("r_snake_w").innerHTML += "<p><b>"+JSON.parse(localStorage.getItem("snake"+najwiekszy[0])).lp+"</p></b>";
		
		//console.log("wpisano: "+najwiekszy[0]);
		tab_pokazanych[il_pokazanych] = najwiekszy[0];
		il_pokazanych++;
		najwiekszy[1] = 0;//reset

		//console.log("zwiekszono");
	}	
}
function nie_byl_pokazany(tab,szukane){
	for(let i = 0;i<tab.length;i++){
		if(tab[i] == szukane){
			return false;
		}
	}
	return true;
}
function docID(id) {
    return document.getElementById(id);
}