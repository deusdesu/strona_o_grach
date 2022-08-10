const width_x= 16;
const height_y= 16;
// ------------------------------------------------------------
const ilosc_bomb = 40;
// ------------------------------------------------------------
let ilosc_flag = 0;
let czy_1_klikniecie = false;
let czy_1_klikniecie_stopera = false;
let klikniety_kafelek;
let nr_pomoc;
let stoper_stop = true;
//var ilosc_klikniec = 0;
let przegrana = false;
let time, wartosc_time;
const divs = document.getElementsByTagName("div");
// wpisuje defaultowe dane do diva po prawej stronie
docID("pole_sapera").oncontextmenu = pressRightClick;
docID("il_flag").innerHTML = "ilosc flag: ";
docID("stopper").innerHTML = "00:00:00";


if(!localStorage.getItem("saper_ilosc")){
	localStorage.setItem( "saper_ilosc",0 );
}
docID("od_nowa").addEventListener("click", function(){
			start();
		});


//start
start();

function start() {
    przegrana = false;
    czy_1_klikniecie = false;
    //ilosc_klikniec = 0;
    czy_1_klikniecie_stopera = false;
    ilosc_flag = 0;
    docID("il_flag").innerHTML = "ilosc flag: 0";
    //docID("il_bomb").innerHTML = "Ilosc bomb: ";
    stopper();
    stoper_stop = false;
    
    docID("il_bomb").innerHTML = "Ilosc bomb: " + ilosc_bomb; // pokazuje w menu po prawej stronie ile jest bomb


    obiekt = [width_x * height_y];
    tablica_bomb = [width_x * height_y];
    for (i = 0; i < width_x * height_y; i++) {
        tablica_bomb[i] = 0;
    }
    kafelek = ""; //po każdym kliknięciu zmienne kafelek resetuje się



    // wstawia kafelki
    for (i = 0; i < width_x * height_y; i++) {
        /*  wyznacz(i);*/
        if (i % width_x == 0) kafelek = kafelek + '<div style="clear:both;"></div>';
        kafelek = kafelek + '<div class="defa1" id=id' + i + '></div>'; /* sprawdz_nr_id_kliknietego_elementu('+i+') */
    }
    kafelek = kafelek + '<div style="clear:both;"></div>';
    docID("tu_wstaw_kafelki_sapera").innerHTML = kafelek;

    //  ustawia kafelki na środku szerokości, wartości nie stą statyczne, lecz pobierane ze style.css ( tak naprawdę to z elementów na stronie ale cii)
   
    //przyznaje każdemu kafelkowi click wyznacz_bomby()
    for (i = 0; i < width_x * height_y; i++) {
        //docID("id" + i).addEventListener("click", wyznacz_bomby);
        docID("id" + i).addEventListener("mousedown", wyznacz_bomby);
    }

    okresl_obiekty();
    //wyznacz_bomby(); // funkcja wywoływana dopiero po kliknięciu w dany kafelek
    //------------------------------------------------

    //------------------------------------------------
}

function okresl_obiekty() {
    for (i = 0; i < width_x * height_y; i++) {
        obiekt[i] = {
            stan: "default",
            bomba: 0,
            numer: 0
        };
    }
}

function wyznacz_bomby(event) {
    klikniety_kafelek = event.target.id.slice(2); //id kliknietego elementu
    klikniety_kafelek = klikniety_kafelek / 1;
    if (event.button == 0 && obiekt[klikniety_kafelek].stan != "flaga") {
        obiekt[klikniety_kafelek].stan = "klikniety";
		/*
        ilosc_klikniec++;
        docID("il_klikniec").innerHTML = "ilosc klikniec: " + ilosc_klikniec;
		*/
        docID("id" + klikniety_kafelek).style.backgroundColor = "#666";

        if (czy_1_klikniecie == false) {

            stoper_stop = true;
            var unikat;
            ilosc_powtorzen_w_petli = 0;
            max_liczb_wysolowana = (width_x * height_y) - 1;
            for (i = 0; i < ilosc_bomb; i++) {
                for (w = 0; w < 2;) {
                    unikat = Math.floor(Math.random() * width_x * height_y + 0);
                    if (tablica_bomb[unikat] == 0 && unikat != klikniety_kafelek && unikat != klikniety_kafelek - 1 && unikat != klikniety_kafelek - width_x - 1 && unikat != klikniety_kafelek - width_x && unikat != klikniety_kafelek - width_x + 1 && unikat != klikniety_kafelek + 1 && unikat != klikniety_kafelek + width_x - 1 && unikat != klikniety_kafelek + width_x && unikat != klikniety_kafelek + width_x + 1) {
                        tablica_bomb[unikat] = tablica_bomb[unikat] + 1;
                        w = 4;
                        //break;
                    }
                    ilosc_powtorzen_w_petli++;
                }
                obiekt[unikat].bomba = obiekt[unikat].bomba + 1;
            }

            // umiesc_bomby(); //funkcja testowa
            //modyfikuj_html();
            wyznacz_numer();
            stopper();
        }
        czy_1_klikniecie = true;
                if (czy_kafel_to_bomba() == false) {
                    szukaj_pustych_pol(klikniety_kafelek);
                    if (obiekt[klikniety_kafelek].numer != 0) {
                        docID("id" + klikniety_kafelek).innerHTML = obiekt[klikniety_kafelek].numer;
                    }
                }
        // czy gra została wygrana
        if (czy_wygrana() >= width_x * height_y - ilosc_bomb) {
            for (i = 0; i < width_x * height_y; i++) {
                if (obiekt[i].bomba == 1) {
                    docID("id" + i).style.backgroundColor = "#10C4C0";
                }
            }
            kasuj_addEventListener();
            stoper_stop = false;
			//console.log("WYGRANA!");
			wygrana();
            //docID("il_klikniec").innerHTML = "ilosc klikniec: " + ilosc_klikniec;
        }



    } else if (event.button == 2) {
        if (obiekt[klikniety_kafelek].stan == "default") {
            //docID("id" + klikniety_kafelek).style.backgroundColor = "blue";
                                                                   //zwiększa ilosc flag
            if(ilosc_flag < ilosc_bomb){
                ilosc_flag++;
                docID("il_flag").innerHTML = "ilosc flag: " + ilosc_flag;
                docID("id" + klikniety_kafelek).innerHTML = "⚑";  //wsadza w klikniety PPM flage
                obiekt[klikniety_kafelek].stan = "flaga";
            }

        } else if (obiekt[klikniety_kafelek].stan == "flaga") {
            docID("id" + klikniety_kafelek).innerHTML = "?";
            obiekt[klikniety_kafelek].stan = "question_mark";
            ilosc_flag--;                                                       //zmniejsza ilosc flag
            docID("il_flag").innerHTML = "ilosc flag: " + ilosc_flag;
        } else if (obiekt[klikniety_kafelek].stan == "question_mark") {
            //docID("id" + klikniety_kafelek).style.backgroundColor = "#000";
            docID("id" + klikniety_kafelek).innerHTML = "";
            obiekt[klikniety_kafelek].stan = "default";
        }

    }
}
function zapisz_wynik(){
	if(sprawdzPole("saper")){
		//zapis do localstorage
		let wyniki = {};
		wyniki.lp = wartosc_time;
		wyniki.login = docID('login').value;
		wyniki.haslo = docID('haslo').value;
		localStorage.setItem("saper"+localStorage.getItem("saper_ilosc"), JSON.stringify(wyniki));
		
		aktualna_ilosc = localStorage.getItem("saper_ilosc");
		localStorage.setItem( "saper_ilosc",++aktualna_ilosc );
		//reset mgły
		docID("pokaz_mgle").innerHTML='';
		for(div of divs){
			div.style.filter = "blur(0px)";
		}
		docID("pokaz_mgle").style.width="0%";
		//powrót do rozgrywki
		start();
	}	
}

function wygrana(){
    //włącz przycik do wysłania
    docID('button').disabled = false;
    docID('pseudonim').disabled = false;
    //wstaw wynik do ukrytego inputa
    docID("liczba_punktow_saper").value = time;
    console.log("Wynik to: "+time)
    console.log(docID("liczba_punktow_saper").value)



	/*
	for(div of divs){
		div.style.filter = "blur(3px)"
	}
	docID("pokaz_mgle").style.width="100%";
	docID("pokaz_mgle").style.filter="blur(0)";
	
	docID("pokaz_mgle").innerHTML=`<div id="formularz"><form><input type="text" class = "koniec" placeholder="pseudonim" onfocus="this.placeholder=''" onblur="this.placeholder='pseudonim'" id="login"><div id="login_walidacja"></div><input class = "koniec" type="password" placeholder="hasło" onfocus="this.placeholder=''" onblur="this.placeholder='hasło'" id="haslo"><div id="haslo_walidacja"></div>Twój wynik to: <b>`+time+`</b><input  type="button" id="wyslij" value="Zapisz swój wynik!"></form></div>`;
	
	docID("wyslij").addEventListener("click", function(){
		//zapisz_wynik();
		zapisz_wynik();
	});
    */
	//
}


function umiesc_bomby() { //funkcja testowa
    for (i = 0; i < width_x * height_y; i++) {
        if (obiekt[i].bomba == 1) {
            docID("id" + i).style.backgroundColor = "#10C4C0";
        }
    }
}
// funkcia przyzjane obiektom numery w zależnosci od ilości bomb dookoła wg
function wyznacz_numer() {
    for (i = 0; i < width_x * height_y; i++) {
        if (i == 0 && obiekt[i].bomba == 1) {
            obiekt[i + 1].numer++;
            obiekt[i + width_x].numer++;
            obiekt[i + width_x + 1].numer++;
        } else if (i == width_x - 1 && obiekt[i].bomba == 1) {
            obiekt[i - 1].numer++;
            obiekt[i + width_x].numer++;
            obiekt[i + width_x - 1].numer++;
        } else if (i == width_x * (height_y - 1) && obiekt[i].bomba == 1) {
            obiekt[i + 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i - width_x + 1].numer++;
        } else if (i == width_x * height_y - 1 && obiekt[i].bomba == 1) {
            obiekt[i - 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i - width_x - 1].numer++;
        } else if (i > 0 && i < width_x - 1 && obiekt[i].bomba == 1) {
            obiekt[i + width_x - 1].numer++;
            obiekt[i + width_x].numer++;
            obiekt[i + width_x + 1].numer++;
            obiekt[i + 1].numer++;
            obiekt[i - 1].numer++;

        } else if (i % width_x == 0 && obiekt[i].bomba == 1) {
            obiekt[i - width_x + 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i + 1].numer++;
            obiekt[i + width_x + 1].numer++;
            obiekt[i + width_x].numer++;
        } else if ((i + 1) % width_x == 0 && obiekt[i].bomba == 1) {
            obiekt[i - width_x].numer++;
            obiekt[i - width_x - 1].numer++;
            obiekt[i - 1].numer++;
            obiekt[i + width_x - 1].numer++;
            obiekt[i + width_x].numer++;
        } else if (i > width_x * (height_y - 1) && i < width_x * height_y - 1 && obiekt[i].bomba == 1) {
            obiekt[i - width_x - 1].numer++;
            obiekt[i - 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i - width_x + 1].numer++;
            obiekt[i + 1].numer++;
        } else if (obiekt[i].bomba == 1) {
            obiekt[i - width_x - 1].numer++;
            obiekt[i - width_x].numer++;
            obiekt[i - width_x + 1].numer++;
            obiekt[i + 1].numer++;
            obiekt[i - 1].numer++;
            obiekt[i + width_x - 1].numer++;
            obiekt[i + width_x].numer++;
            obiekt[i + width_x + 1].numer++;
        }
    }
}

function modyfikuj_html() {
    for (i = 0; i < width_x * height_y; i++) {
        if (obiekt[i].numer != 0 && obiekt[i].bomba == 1) {
            docID('id' + i);
        }
    }
}

function czy_jest_bomba_i_numer(nr_pomoc) {
    if (obiekt[nr_pomoc].bomba == 0 && obiekt[nr_pomoc].numer == 0 && obiekt[nr_pomoc].stan == "default") {
        obiekt[nr_pomoc].stan = "wcisniety";
        docID("id" + nr_pomoc).style.backgroundColor = "#666";
        docID("id" + nr_pomoc).removeEventListener("mousedown", wyznacz_bomby);
        szukaj_pustych_pol(nr_pomoc);

    } else if (obiekt[nr_pomoc].bomba == 0 && obiekt[nr_pomoc].numer != 0 && obiekt[nr_pomoc].stan == "default") { //jeżeli id "nr_id + 1" nie ma bomby ale ma numer to kafel staje się szary, usuwa mu event click brak rekurencji. (w saperze po kliknęciu odsłąniane są pola aż do pola z numerkiem ;) )
        obiekt[nr_pomoc].stan = "wcisniety";
        docID("id" + nr_pomoc).style.backgroundColor = "#666";
        docID("id" + nr_pomoc).innerHTML = obiekt[nr_pomoc].numer;
        docID("id" + nr_pomoc).removeEventListener("mousedown", wyznacz_bomby);
    }
}


function szukaj_pustych_pol(nr_id) {
    //nr_id = nr_id / 1;


    if (nr_id == 0) { // tutaj analizować będzie lewy górny róg,  id: większe o 1, większe o width_x oraz większe o width_x + 1
        //jeżeli id "nr_id + 1" nie ma bomby i numeru to kafel staje się szary, usuwa mu event click, rekurencja szukaj_pustych_pól dla "id + 1"
        czy_jest_bomba_i_numer(nr_id + 1); //analizować będzie id: większe o 1
        czy_jest_bomba_i_numer(nr_id + width_x); //analizować będzie id: większe o szerokość pola
        czy_jest_bomba_i_numer(nr_id + width_x + 1); //analizować będzie id: większe o szerokość pola

    } else if (nr_id == width_x - 1) { // tutaj analizować będzie prawy górny róg,  id: mniejsze o 1, większe o width_x oraz większe o width_x - 1
        czy_jest_bomba_i_numer(nr_id - 1); //analizować będzie id: mniejsze o 1
        czy_jest_bomba_i_numer(nr_id + width_x); //analizować będzie id: większe o width_x
        czy_jest_bomba_i_numer(nr_id + width_x - 1); //analizować będzie id: większe o width_x - 1

    } else if (nr_id == width_x * (height_y - 1)) { // tutaj analizować będzie lewy dolny róg,  id: większe o 1, mniejsze o width_x oraz mnijesze o width_x + 1
        czy_jest_bomba_i_numer(nr_id + 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id - width_x + 1);

    } else if (nr_id == width_x * height_y - 1) { // tutaj analizować będzie prawy dolny róg,  id: mniejsze o 1, mniejsze o width_x oraz mnijesze o width_x - 1
        czy_jest_bomba_i_numer(nr_id - 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id - width_x - 1);

    } else if (nr_id > 0 && nr_id < width_x - 1) {
        czy_jest_bomba_i_numer(nr_id - 1);
        czy_jest_bomba_i_numer(nr_id + 1);
        czy_jest_bomba_i_numer(nr_id + width_x - 1);
        czy_jest_bomba_i_numer(nr_id + width_x);
        czy_jest_bomba_i_numer(nr_id + width_x + 1);
    } else if (nr_id % width_x == 0) {
        czy_jest_bomba_i_numer(nr_id + 1);
        czy_jest_bomba_i_numer(nr_id - width_x + 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id + width_x);
        czy_jest_bomba_i_numer(nr_id + width_x + 1);
    } else if ((nr_id + 1) % width_x == 0) {
        czy_jest_bomba_i_numer(nr_id - 1);
        czy_jest_bomba_i_numer(nr_id - width_x - 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id + width_x);
        czy_jest_bomba_i_numer(nr_id + width_x - 1);
    } else if (nr_id > width_x * (height_y - 1) && nr_id < width_x * height_y - 1) {
        czy_jest_bomba_i_numer(nr_id - 1);
        czy_jest_bomba_i_numer(nr_id + 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id - width_x - 1);
        czy_jest_bomba_i_numer(nr_id - width_x + 1);
    } else {
        czy_jest_bomba_i_numer(nr_id - 1);
        czy_jest_bomba_i_numer(nr_id + 1);
        czy_jest_bomba_i_numer(nr_id - width_x);
        czy_jest_bomba_i_numer(nr_id - width_x - 1);
        czy_jest_bomba_i_numer(nr_id - width_x + 1);
        czy_jest_bomba_i_numer(nr_id + width_x);
        czy_jest_bomba_i_numer(nr_id + width_x - 1);
        czy_jest_bomba_i_numer(nr_id + width_x + 1);
    }
}

function czy_kafel_to_bomba() {
    if (obiekt[klikniety_kafelek].bomba != 0) { //przegranko
        kasuj_addEventListener();
        umiesc_bomby();
        stoper_stop = false;
        przegrana = true;
        return true;
    } else return false; // jeszcze nie przegranko
}

function czy_wygrana() {
    if(przegrana == true){
		////console.log("PRZEGRANA!");
		return 0;
	} 
    pomoc = 0;
    for (i = 0; i < width_x * height_y; i++) {
        if ((obiekt[i].bomba == 0 && obiekt[i].stan != "default" && obiekt[i].stan != "flaga" && obiekt[i].stan != "question_mark"  ) || (obiekt[i].numer != 0 && obiekt[i].stan != "default" && obiekt[i].stan != "flaga"  && obiekt[i].stan != "question_mark" )) pomoc++;
    }
	
    return pomoc;
}

function kasuj_addEventListener() {
    for (i = 0; i < width_x * height_y; i++) {
        docID("id" + i).removeEventListener("mousedown", wyznacz_bomby);
    }
}

// Disable the right click button's menu.
function pressRightClick() {
    return false;
}

function stopper() {
    // wywołać ja potem
	
    if (czy_1_klikniecie_stopera == false) {
        min1 = 0;
        min0 = 0;
        sek1 = 0;
        sek0 = 0;
        msek1 = 0;
        msek0 = 0;
        time = min1 + "" + min0 + ":" + sek1 + "" + sek0 + ":" + msek1 + "" + msek0;
		
        // alert(time);
    } else  {
        msek0++;
        if(msek0 > 9){
            msek0 = 0;
            msek1++;
            if(msek1 > 6){
                msek1 = 0;
                sek0++;
                if (sek0 > 9) {
                    sek0 = 0;
                    sek1++;
                    if (sek1 > 6) {
                        sek1 = 0;
                        min0++;
                        if (min0 > 9) {
                            min0 = 0;
                            min1++;
                        }
                    }
                }
            }
        }
    }



    docID("stopper").innerHTML = time;
	
    time = min1 + "" + min0 + ":" + sek1 + "" + sek0 + ":" + msek1 + "" + msek0;
	
    //if(time == "03:99")

    if (stoper_stop && czy_1_klikniecie_stopera == true) {
		wartosc_time = msek0+10*msek1+100*sek0+1000*sek1+10000*min0+100000*min1;
        setTimeout("stopper()", 10);
    }
    czy_1_klikniecie_stopera = true;
}

/*
    # .button == 2 aby zaznaczało frage, potem znak zapytania, nie mogą być one kliknięte LPM

    # odliczanie zaczętę od 1 kliknięcia LPM

    # ilosc bomb zmiejszana o 1 za kazdym razem, gdy tworzona jest flaga (zwiększana za każdym razem, gdy usuwa się flagę)
*/



function docID(id) {
    return document.getElementById(id);
}



