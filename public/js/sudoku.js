/**
 * PRZYKŁD 235, 300 SUDOKU
 * [przyklad_1 description] wstawia przykład zadania sudoku
 * @return {[type]} [description]
 */
//000000040000090100000205700046837000307950080598106370860579403973408500054360897

// 0 - tryb łatwej gry
// 1 - tryb normalnej gry
const tryb_try = 1;



//wstawia pola sudoku
var kafelek = "";
for (i = 1; i <= 81; i++) {
    kafelek = kafelek + '<input class="sudoku" id="id' + i + '" maxlength="1" type="text" />';
    if (i % 9 == 0) kafelek = kafelek + '<div style="clear:both;"></div>';
}
kafelek = kafelek + '<div style="clear:both;"></div>';
docID("pole_sudoku").innerHTML = kafelek;
// wstawia bordery
for (i = 1; i <= 81; i++) {
    if (i % 3 == 0 && i % 9 != 0) docID("id" + i).style.borderRight = "2px solid #000";
    if (i >= 19 && i <= 27) docID("id" + i).style.borderBottom = "2px solid #000";
    if (i >= 46 && i <= 54) docID("id" + i).style.borderBottom = "2px solid #000";
}
const divs = document.getElementsByTagName("div");
let tablica_przyklad;
let stoper_stop = true;
//przypisanie funkcji do guzików
let czy_pokazano_rozwiazanie = false;
docID("pokaz_rozwiacanie").addEventListener("click", function(){
	//console.log("pokaz");
	pokaz_rozwiacanie();
	czy_pokazano_rozwiazanie = true;
});


docID("sprawdzenie").addEventListener("click", function(){
	//console.log("sprawdzenie");
    if(tryb_try){
        if(czy_pokazano_rozwiazanie){
            docID("spr").innerHTML = "Niestety, pokazane rozwiązanie się nie liczy! :p";
        }
        else if(sprawdz_czy_poprawne_sudoku()){
            stoper_stop =false;
            zwyciestwo();
        }else{
            docID("spr").innerHTML = "Niestety, nieudało Ci się rozwiązać poprawie sudoku, spróbuj jeszcze raz!";
        }
    }else{
        if(sprawdz_czy_poprawne_sudoku()){
            stoper_stop =false;
            zwyciestwo();
        }else{
            docID("spr").innerHTML = "Niestety, nieudało Ci się rozwiązać poprawie sudoku, spróbuj jeszcze raz!";
        }
    }
    
	
});
docID("od_nowa").addEventListener("click", function(){
	window.location.reload(true);
});
if(!localStorage.getItem("sudoku_ilosc")){
	localStorage.setItem( "sudoku_ilosc",0 );
}	
	
	
	
	
	
	
	
	
	
function zwyciestwo(){
    docID('button').disabled = false;
    docID('pseudonim').disabled = false;
    //wstaw wynik do ukrytego inputa
    docID("liczba_punktow_sudoku").value = time;
    console.log("Wynik to: "+time)
    console.log(docID("liczba_punktow_sudoku").value)

	/*
	for(div of divs){
		div.style.filter = "blur(3px)"
	}
	docID("pokaz_mgle").style.width="100%";
	docID("pokaz_mgle").style.filter="blur(0)";
	
	docID("pokaz_mgle").innerHTML=`<div id="formularz"><form><input type="text" class = "koniec" placeholder="pseudonim" onfocus="this.placeholder=''" onblur="this.placeholder='pseudonim'" id="login"><div id="login_walidacja"></div><input class = "koniec" type="password" placeholder="hasło" onfocus="this.placeholder=''" onblur="this.placeholder='hasło'" id="haslo"><div id="haslo_walidacja"></div>Twój wynik to: <b>`+time+`</b><input  type="button" id="wyslij" value="Zapisz swój wynik!"></form></div>`;
	
	docID("wyslij").addEventListener("click", function(){
		zapisz_wynik();
	});*/
	//
}

function zapisz_wynik(){
	//console.log("klik!");
	if(sprawdzPole("sudoku")){
		//zapis do localstorage
		let wyniki = {};
		wyniki.lp = wartosc_time;
		wyniki.login = docID('login').value;
		wyniki.haslo = docID('haslo').value;
		localStorage.setItem("sudoku"+localStorage.getItem("sudoku_ilosc"), JSON.stringify(wyniki));
		
		aktualna_ilosc = localStorage.getItem("sudoku_ilosc");
		localStorage.setItem( "sudoku_ilosc",++aktualna_ilosc );
		//reset mgły
		docID("pokaz_mgle").innerHTML='';
		for(div of divs){
			div.style.filter = "blur(0px)";
		}
		docID("pokaz_mgle").style.width="0%";
		//powrót do rozgrywki
		window.location.reload(true);
	}	
}
	
	
	

// zegar
docID("stopper").innerHTML = "00:00:00";
let czy_1_klikniecie_stopera = false;

let time, wartosc_time;
function stopper() {
    // wywołać ja potem
	//console.log("start zegar");
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
    
    //if(time == "03:99")

    if (stoper_stop && czy_1_klikniecie_stopera == true) {
		wartosc_time = msek0+10*msek1+100*sek0+1000*sek1+10000*min0+100000*min1;
        setTimeout("stopper()", 10);
    }
	time = min1 + "" + min0 + ":" + sek1 + "" + sek0 + ":" + msek1 + "" + msek0;
    czy_1_klikniecie_stopera = true;
}



function pokaz_rozwiacanie(){
	//console.log("2. rozwiazuje tab: "+tablica_przyklad);
	umiesc_sudoku(tablica_przyklad);
	send_numers();
}
function start(){
	console.log("start");
	zera = new Array(81).fill(0);
	umiesc_sudoku( zera );
	tablica = [];
	stopper();
     
	 switch(Math.floor(Math.random() * (2 - 0 + 1)) + 0){
		case 0: tablica[0] = "431060580729548361568310000";
				tablica[1] = "607000058102000030003000002";
				tablica[2] = "005004006276851493004906075";
		break;
		case 1: tablica[0] = "100008004030000500000521000";
				tablica[1] = "400000093006000700320000001";
				tablica[2] = "000692000007000040900700008";
		break;
		case 2:	tablica[0] = "000400023031000000009370000";
				tablica[1] = "007008095600000008890500100";
				tablica[2] = "000023400000000960510006000";
		break;
		
		default:tablica[0] = "100008004030000500000521000";
				tablica[1] = "400000093006000700320000001";
				tablica[2] = "000692000007000040900700008";
		break;
	}
	

	

	switch(Math.floor(Math.random() * (5 - 0 + 1)) + 0){
		case 0: tablica_przyklad = tablica[0]+tablica[1]+tablica[2];
		break;
		case 1: tablica_przyklad = tablica[0]+tablica[2]+tablica[1];
		break;
		case 2:	tablica_przyklad = tablica[2]+tablica[0]+tablica[1];
		break;
		case 3:	tablica_przyklad = tablica[2]+tablica[1]+tablica[0];
		break;
		case 4: tablica_przyklad = tablica[1]+tablica[2]+tablica[0];
		break;
		case 5: tablica_przyklad = tablica[1]+tablica[0]+tablica[2];
		break;
		default:tablica_przyklad = tablica[1]+tablica[0]+tablica[2];
		break;
	}
	
	tablica_przyklad = zamiana_na_tab(tablica_przyklad);
	let inna_liczba;
	inna_liczba = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    if( tablica_przyklad.length == 81 ){
        for (var i = 0; i < 81; i++) {
            a = i + 1;
            if (tablica_przyklad[i] != 0) {
           if(parseInt(tablica_przyklad[i]) + inna_liczba <= 9){
					tablica_przyklad[i] = parseInt(tablica_przyklad[i]) + inna_liczba;
				}else{
					tablica_przyklad[i] = parseInt(tablica_przyklad[i]) + inna_liczba-9;
				}			              
            }
        }
    }
	if(Math.floor(Math.random() * (1 - 0 + 1)) + 0){
		
		tablica_przyklad = tablica_przyklad.reverse();
	}
	//console.log("1. wstawiam tab: "+tablica_przyklad);
	umiesc_sudoku(tablica_przyklad);
	 stopper();
	
	//send_numers();
}

function zamiana_na_tab(x) {
  return Array.from(x);
}


function umiesc_sudoku(przyklad) {
    if( przyklad.length == 81 ){
        for (var i = 0; i < 81; i++) {
            a = i + 1;
            if (przyklad[i] == 0) {
                document.getElementById("id" + a).value = '';
            } else if (przyklad[i] != 0) {

                document.getElementById("id" + a).value = przyklad[i];
            }
        }
    }
}
/**
 * sudoku pobiera wartoci liczbowe z inputów
 *
 * odpowiednio przYpisuje je obiektom
 *
 * każdY kafelek ma odpowiednie wartosci
 *
 * należY rozróżniać kafelki wg pionu(Y), poziomu(X) wg małego 9 pólowego kwadratu (nazYwanY później kwadratem, lub CUBE)
 *
 * liczba powinna zostać wpisana gdY:
 *      #w pionie, poziomie lub/i kwadracie została tYlko ta jedna liczba
 *      #inne, trudniejsze zależnosci heh
 *
 * tablice pomocnicze, poziomu, pionu i małego 9 pólowego kwadratu
 *
 * dodac kontrole poprawnosci tj czy liczby sa unikalne wg pozycjaX[], pozycjaY[] i CUBE[]
 *
 * jeżeli obiekt[i].value == '' szuka obiekt[i].value_around, które == false i sprawdza, czy inne obiekty w wg CUBE też maja false, przy tym samym numerze, jeżeli nie to wstawia liczbe, przy krórej jest false xd
 *
 *
 *
 * funkcja sprawdzajaca, czy sudoku zostalo poprawnie rozwiazane? plox
 */
// ZMIENNE GLOBALNE ---------------------------------------------------------------------
// tablica poziomu,  numer_pozycji = [liczby w danej pozycji], służa jako wskaźniki,  pozycjaX[] wskazuje jakie liczby należa do danej pozycji
pozycjaX = [];
pozycjaX[1] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
pozycjaX[2] = [10, 11, 12, 13, 14, 15, 16, 17, 18];
pozycjaX[3] = [19, 20, 21, 22, 23, 24, 25, 26, 27];
pozycjaX[4] = [28, 29, 30, 31, 32, 33, 34, 35, 36];
pozycjaX[5] = [37, 38, 39, 40, 41, 42, 43, 44, 45];
pozycjaX[6] = [46, 47, 48, 49, 50, 51, 52, 53, 54];
pozycjaX[7] = [55, 56, 57, 58, 59, 60, 61, 62, 63];
pozycjaX[8] = [64, 65, 66, 67, 68, 69, 70, 71, 72];
pozycjaX[9] = [73, 74, 75, 76, 77, 78, 79, 80, 81];

// tablica pionu,  numer_pozycji = [liczby w danej pozycji], służa jako wskaźniki
pozycjaY = [];
pozycjaY[1] = [1, 10, 19, 28, 37, 46, 55, 64, 73];
pozycjaY[2] = [2, 11, 20, 29, 38, 47, 56, 65, 74];
pozycjaY[3] = [3, 12, 21, 30, 39, 48, 57, 66, 75];
pozycjaY[4] = [4, 13, 22, 31, 40, 49, 58, 67, 76];
pozycjaY[5] = [5, 14, 23, 32, 41, 50, 59, 68, 77];
pozycjaY[6] = [6, 15, 24, 33, 42, 51, 60, 69, 78];
pozycjaY[7] = [7, 16, 25, 34, 43, 52, 61, 70, 79];
pozycjaY[8] = [8, 17, 26, 35, 44, 53, 62, 71, 80];
pozycjaY[9] = [9, 18, 27, 36, 45, 54, 63, 72, 81];

// tablica kwadratu,  numer_pozycji = [liczby w danej pozycji], służa jako wskaźniki
CUBE = [];
CUBE[1] = [1, 2, 3, 10, 11, 12, 19, 20, 21];
CUBE[2] = [4, 5, 6, 13, 14, 15, 22, 23, 24];
CUBE[3] = [7, 8, 9, 16, 17, 18, 25, 26, 27];
CUBE[4] = [28, 29, 30, 37, 38, 39, 46, 47, 48];
CUBE[5] = [31, 32, 33, 40, 41, 42, 49, 50, 51];
CUBE[6] = [34, 35, 36, 43, 44, 45, 52, 53, 54];
CUBE[7] = [55, 56, 57, 64, 65, 66, 73, 74, 75];
CUBE[8] = [58, 59, 60, 67, 68, 69, 76, 77, 78];
CUBE[9] = [61, 62, 63, 70, 71, 72, 79, 80, 81];



// tworzy tablice wykorzystywane w funkcji szukaj_w_obiekt_pozycja(). służ one rozwiazaniu
// "/przyklad_01.png"
tablica_CUBE = [];
tablica_bezpieczenstwa_CUBE = [];
tablica_pozycjaY = [];
tablica_bezpieczenstwa_pozycjaY = [];
tablica_pozycjaX = [];
tablica_bezpieczenstwa_pozycjaX = [];

tablica_sprawdzajaca_CUBE = [];
tablica_sprawdzajaca_pozycjaY = [];
tablica_sprawdzajaca_pozycjaX = [];

for (var i = 1; i <= 9; i++) {
    tablica_CUBE[i] = [null, 9, 9, 9, 9, 9, 9, 9, 9, 9];
    tablica_pozycjaY[i] = [null, 9, 9, 9, 9, 9, 9, 9, 9, 9];
    tablica_pozycjaX[i] = [null, 9, 9, 9, 9, 9, 9, 9, 9, 9];

    tablica_bezpieczenstwa_CUBE[i] = [null, false, false, false, false, false, false, false, false, false];
    tablica_bezpieczenstwa_pozycjaY[i] = [null, false, false, false, false, false, false, false, false, false];
    tablica_bezpieczenstwa_pozycjaX[i] = [null, false, false, false, false, false, false, false, false, false];

    // tworzy
    tablica_sprawdzajaca_CUBE[i] = [null, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tablica_sprawdzajaca_pozycjaY[i] = [null, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    tablica_sprawdzajaca_pozycjaX[i] = [null, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

/**
 * [obiekt tablica obiektów, każde pole ma odpowiadajcY mu obiekt o takim samYm numerze id]
 */
var obiekt = [9 * 9];
var obiekt_backup = [9 * 9];
var obiekt_CUBE = [];
var obiekt_Y = [];
var obiekt_X = [];
var value = [];

var tablica_do_funkcji_wywoływawczej_tymczasowej = [];

var tab_liczba_tylko_raz = [];

for (i = 1; i <= 81; i++) {
    tab_liczba_tylko_raz[i] = false;
}

/**
 * [pętla tworzca obiekty, przypisujca im odpowiednie parametry]
 **/
okresl_obiekty();
przypisz_numery_pozycji();

/**
 * [ilosc_zapisanych_pol oznacza ile pól zostało zapisanych, zwiększa się za każdym użciem funkcji wstaw_value_do_obiektu_i_id]
 * @type {Number}
 */
var ilosc_zapisanych_pol = 0;
var ilosc_przed_funkcjami_lokalne; // sprawdza pojedyncze petle w petli "q" w funkcji send_numers()
var ilosc_przed_funkcjami_glowne; // sprawdza czy zrobiono postep w petli "q" w funkcji send_numers()
var czy_zafarbowac_tlo = false; // jest zmieniany tylko w funkcji send_numers(), więc tylko poczatkowe
var pierwszy_raz = true; // używany tylko w ostetecznej funkcji sprawdzajcej 'element_losowy()'
var tryb_element_losowy = false;






// statystyki!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


var czy_false = 0;
//var pierwsze_klikniecie = false;

// FUNKCJE ---------------------------------------------------------------------

/**
 * [send_numers description] wstawia w tablice value[] wartosci wg wpisanych liczb
 * @return {[type]} [description] odsyła do funkcji wstaw_liczby()
 */
function send_numers() {
    if( pierwszy_raz){
        for (var i = 1; i <= 81; i++) {
            value[i] = document.getElementById("id" + i).value; // linia testowa nwm czy będzie miała zastosowanie

            if (document.getElementById("id" + i).value != '') {
                czy_zafarbowac_tlo = true;
                wstaw_value_do_obiektu_i_id(i, document.getElementById("id" + i).value); //można przekonwertować 'document.getElementById("id" + i).value' na liczbę, gdyż w tej postaci jest stringiem, co nie? XD
                czy_zafarbowac_tlo = false;
            }
        }
    }
   
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! poprawić!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (q = 0; ilosc_zapisanych_pol != 81; q++) {
        ilosc_przed_funkcjami_glowne = ilosc_zapisanych_pol;
        for (w = 0; ilosc_zapisanych_pol != 81; w++) {
            ilosc_przed_funkcjami_lokalne = ilosc_zapisanych_pol;
            sprawdz_czy_istnieje_tylko_1_mozliwosc();
            jakie_l();

            if (ilosc_przed_funkcjami_lokalne == ilosc_zapisanych_pol) {
                // alert("nie udało się rozwiazać sudoku w 100%");
                break;
            }
        }

        for (e = 0; ilosc_zapisanych_pol != 81; e++) {
            ilosc_przed_funkcjami_lokalne = ilosc_zapisanych_pol;
            sprawdz_czy_jest_tylko_1_true_w_pozycji();
            jakie_l();

            if (ilosc_przed_funkcjami_lokalne == ilosc_zapisanych_pol) {
                // alert("nie udało się rozwiazać sudoku w 100%");
                break;
            }
        }

        for (e = 0; ilosc_zapisanych_pol != 81; e++) {
            ilosc_przed_funkcjami_lokalne = ilosc_zapisanych_pol;
            redukcja_przez_wykluczenie();
            jakie_l();

            if (ilosc_przed_funkcjami_lokalne == ilosc_zapisanych_pol) {
                // alert("nie udało się rozwiazać sudoku w 100%");
                break;
            }
        }

        for (e = 0; ilosc_zapisanych_pol != 81; e++) {
            ilosc_przed_funkcjami_lokalne = ilosc_zapisanych_pol;
            redukcja_przez_parę_cyfr_w_linii();
            jakie_l();

            if (ilosc_przed_funkcjami_lokalne == ilosc_zapisanych_pol) {
                // alert("nie udało się rozwiazać sudoku w 100%");
                break;
            }
        }

        for (e = 0; ilosc_zapisanych_pol != 81; e++) {
            ilosc_przed_funkcjami_lokalne = ilosc_zapisanych_pol;
            redukcja_przez_parę_mozliwosci();
            jakie_l();

            if (ilosc_przed_funkcjami_lokalne == ilosc_zapisanych_pol) {
                // alert("nie udało się rozwiazać sudoku w 100%");
                break;
            }
        }

       /*
        for (e = 0; ilosc_zapisanych_pol != 81; e++) {
            ilosc_przed_funkcjami_lokalne = ilosc_zapisanych_pol;
            //alert("heh");

            jakie_l();

            if (ilosc_przed_funkcjami_lokalne == ilosc_zapisanych_pol) {
                // alert("nie udało się rozwiazać sudoku w 100%");
                break;
            }
        }
        */

        jakie_l();
        if (ilosc_przed_funkcjami_glowne == ilosc_zapisanych_pol) {
            // alert("nie udało się rozwiazać sudoku w 100%");
            break;
        }
    }
   // ostateczne_rozwiazanie_kwesti_sudoku();
   //console.log('ilosc_zapisanych_pol ' + ilosc_zapisanych_pol);
    if( pierwszy_raz && ilosc_zapisanych_pol != 81){
        pierwszy_raz = false;
        //element_losowy();
    }
    
     
}


function redukcja_przez_parę_mozliwosci() {
    var il_moz;
    var numer;
    var liczby = tablica_dwuwymiarowa(10);
    var ktory_raz_liczba_wystepuje = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var poz;
    for (var a = 1; a <= 3; a++) {
        switch (a) {
            case 1:
                pozycja = pozycjaX;
                poz = 'pozycjaX';
                break;
            case 2:
                pozycja = pozycjaY;
                poz = 'pozycjaY';
                break;
            case 3:
                pozycja = CUBE;
                poz = 'CUBE';
        }

        for (var nr1pozycja = 1; nr1pozycja <= 9; nr1pozycja++) { // pierwszy wymiar
            for (var nr2pozycja = 0; nr2pozycja <= 8; nr2pozycja++) { // drugi wymiar
                il_moz = obiekt[pozycja[nr1pozycja][nr2pozycja]].ilosc_mozliwosci;
               //  console.log( il_moz+' moz');
                // console.log( obiekt[ 1 ].toSource()+' obiekt');
                for (var i = 0; i < il_moz; i++) {
                    for (var h = 1; h <= 81; h++) {
                        /*if(!pierwszy_raz){
                           // console.log( obiekt[ h ].toSource()+' obiekt');
                        }*/
                    }
                    

                    numer = obiekt[ pozycja[nr1pozycja][nr2pozycja] ].jakie_liczby_mozna_wpisac[i];
                    if(isNaN( numer ) ){
                        //alert(numer +" pozycja "+poz+" nr1pozycja "+nr1pozycja+" nr2pozycja "+nr2pozycja+" nr obiektu  "+pozycja[nr1pozycja][nr2pozycja]  +" source "+obiekt[pozycja[nr1pozycja][nr2pozycja]].toSource() +" ilosc mozliwosci: "+il_moz );
                    }
                    liczby[numer][ ktory_raz_liczba_wystepuje[numer] ] = nr2pozycja + 1;
                    ktory_raz_liczba_wystepuje[numer]++;
                }
            }
            // koniec skanu jednej pozycji
            //alert(liczby);
            sprawdz_czy_istnieja_2_pary(liczby);
            // liczby to tablica, która opisuje, które liczby w których miejscach występuja



            // RESET BEJBI WAŻNA RZECZ
            ktory_raz_liczba_wystepuje = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            liczby = [];
            liczby = tablica_dwuwymiarowa(10);
        }
    }
}

function sprawdz_czy_istnieja_2_pary(tab) {
    var length = tab.length;
    var pary = [];
    var pochodzenie1;
    var czy_napewno_pochodzenie1;
    var czy_napewno_pochodzenie1_spr = true;
    var pochodzenie2;

    var czy_jest1 = false;
    var czy_jest2 = false;
    var ilosc_par = 0;
    for (var i = 1; i < length; i++) {
        pary = zwracam_pary(tab[i]);
        pary_length = pary.length; // dł zwróconych par (w sumie to ilosc)
        for (var u = 0; u < pary_length; u++) { // u to penta robiona tyle razy, ile jest par z danego tab[i]
            //   pary[u] to sa zwrócone pary, każda z liczb w parze(a sa ich 2) nalezy porownac z kazdym elementem w tab oprocz elementu, z ktorego para pochodzi. if ilosc takich samych par wynosi UWAGA 1 to jest super, tego szukalismy ^_^
            for (var y = 1; y < length; y++) { // porównywanie ze wszystkimi elementami w tablicy heh
                //if(i != y){ // tu może być bład!!!!! ale nie jestem pewny xD
                dl = tab[y].length;

                for (var t = 0; t < dl; t++) { // porównywanie z jednym elementem
                    if (pary[u][0] == tab[y][t]) {
                        czy_jest1 = true;
                        czy_napewno_pochodzenie1 = i;

                    }
                    if (czy_jest1) {
                        for (var r = 0; r < dl; r++) {
                            if (pary[u][1] == tab[y][r]) {
                                czy_jest2 = true;
                                if (czy_napewno_pochodzenie1_spr) {
                                    pochodzenie1 = czy_napewno_pochodzenie1;
                                    czy_napewno_pochodzenie1_spr = false;
                                }
                                pochodzenie2 = y;
                            }
                        }
                    }
                }
                if (czy_jest1 && czy_jest2) {
                    //zajebiscie, znalazlo pare heh ale ich ilosc musi wynosić 1!!!!!
                    ilosc_par++;
                }
                czy_napewno_pochodzenie1_spr = true;
                czy_jest1 = false;
                czy_jest2 = false;
                //}
            }
            if (ilosc_par == 2 && pochodzenie1 != pochodzenie2) {
                //alert( pary[u] );
                // zwraca tablice albo obiekt, który mówi:
                // #    jakie dokładnie liczby sa para ()
                // #    w których miejscach jest para
                // #    z jakich pól pochodza (pole pierwszej pary i pole drugiej pary)
                para = {
                    pola1: pary[u][0],
                    pola2: pary[u][1],
                    pochodz1: pochodzenie1, // naprawić pochodzenie!!!
                    pochodz2: pochodzenie2
                };
                //alert(para.toSource());
                return para;
                //alert(para );
            }
            pochodzenie1 = 0;
            pochodzenie2 = 0;
            ilosc_par = 0;
            return false;

            //   pary[u][0]
            //   pary[u][1]
        }
    }
}

function zwracam_pary(tab) { //wkłada tablice 2 wymiarowa, return pary bez powtorzen
    var length = tab.length;
    var ilosc = 0;
    var pary = [];
    for (var i = 0; i < length; i++) {
        for (var u = i + 1; u < length; u++) {
            pary[ilosc] = [tab[i], tab[u]];
            ilosc++;
        }
    }
    ilosc = 0;
    return pary;
}

function tablica_dwuwymiarowa(liczba_wierszy) {
    var tab = new Array(liczba_wierszy);
    for (var i = 0; i < liczba_wierszy; i++) {
        tab[i] = [];
    }
    return tab;
}

function redukcja_przez_parę_cyfr_w_linii() {
    //Zasada: Jeżeli w linii w dwóch polach, mogą wystąpić tylko dwie te same cyfry, to oznacza że nie mogą one wystąpić w pozostałych polach linii.

    //kolejna próba, skan w poszukiwaniu ilosc moz == 2 i sprawdzanie czy sa takie same

    var ilosc_wyst2 = 0; // liczy ilosc występowan .ilosc_mozliwosci == 2
    var ilosc_wyst3 = 0; // liczy ilosc występowan .ilosc_mozliwosci == 3
    var tablica_wynik2 = [];
    var tablica_wynik3 = [];
    var numer_pola;
    var czy_jest_rowne = true;

    var jakie_to_liczby = [];
    var liczby = [];
    var numer_wystapnienia = 0;

    // dla CUBE, jeszcze X i Y!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // pozycjaY !!!!!!!!!!!!!!!!!!!
    // // dla pozycjaY, jeszcze X i Y!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    for (var a = 1; a <= 3; a++) {
        switch (a) {
            case 1:
                pozycja = pozycjaX;
                pozycjaL = "X";
                break;
            case 2:
                pozycja = pozycjaY;
                pozycjaL = "Y";
                break;
            case 3:
                pozycja = CUBE;
                pozycjaL = "CUBE";
        }

        for (var nr1pozycja = 1; nr1pozycja <= 9; nr1pozycja++) { // pierwszy wymiar
            for (var nr2pozycja = 0; nr2pozycja <= 8; nr2pozycja++) { // drugi wymiar
                numer_pola = pozycja[nr1pozycja][nr2pozycja];
                if (obiekt[numer_pola].ilosc_mozliwosci == 2) { // pozycja[nr1pozycja][nr2pozycja] == numer
                    liczby[ilosc_wyst2] = obiekt[numer_pola].jakie_liczby_mozna_wpisac;
                    tablica_wynik2[ilosc_wyst2] = numer_pola;
                    ilosc_wyst2++;
                }
                /*if (obiekt[numer_pola].ilosc_mozliwosci == 3) {
                    tablica_wynik3[ilosc_wyst3] = numer_pola;
                    ilosc_wyst3++;
                }*/
            }
            // po przeliczeniu 1 pozycja następuje dalszy kod
            //
            // sprawdza czy .value_around sa takie same dla dwoch pól (dla ilosc_wyst2 == 2)
            //  TRZEBA JESZCZE ROZWAŻYĆ INNE PRZYAPADKI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //
            // alert(tablica_wynik2);

            if (ilosc_wyst2 > 1) {
                //para jeden para dwa, porównywanie każdy z każdym, jak w innym kodzie

                //alert( oddaje_pary_z_tablicy(liczby) );
                okresla_ktore_liczby_sa_para = oddaje_pary_z_tablicy(liczby);
                /*        if(okresla_ktore_liczby_sa_para){
                             alert( tablica_wynik2 +" - " +okresla_ktore_liczby_sa_para +" "+liczby+" pozycja: "+nr1pozycja+pozycjaL);
                         }*/
                length = okresla_ktore_liczby_sa_para.length; // okresla długosc zwróconej tablicy
                // za pomoca tablic tablica_wynik2 i okresla_ktore_liczby_sa_para mozna okreslac do jakich pól należa powtarzajace się pary
                if (okresla_ktore_liczby_sa_para != false) {
                    for (var i = 0; i < length; i++) {
                        //   tablica_wynik2[ okresla_ktore_liczby_sa_para[i][0] ] id pierwszej liczby
                        //   tablica_wynik2[ okresla_ktore_liczby_sa_para[i][1] ] id drugiej liczby
                        //   liczby[ okresla_ktore_liczby_sa_para[i][0] ][0] pierwsza liczba
                        //   liczby[ okresla_ktore_liczby_sa_para[i][1] ][1] druga liczba
                        // alert( okresla_ktore_liczby_sa_para+" - "+tablica_wynik2[ okresla_ktore_liczby_sa_para[i][0] ] +" - " +tablica_wynik2[ okresla_ktore_liczby_sa_para[i][1] ] +" - "+liczby[ okresla_ktore_liczby_sa_para[i][0] ][0]+" "+liczby[ okresla_ktore_liczby_sa_para[i][1] ][1] +"pozycja: "+pozycjaL);
                        id_1_liczby = tablica_wynik2[okresla_ktore_liczby_sa_para[i][0]];
                        id_2_liczby = tablica_wynik2[okresla_ktore_liczby_sa_para[i][1]];
                        if (id_2_liczby) {
                            //alert(id_2_liczby);
                            pierwsza_liczba = liczby[okresla_ktore_liczby_sa_para[i][0]][0];
                            druga_liczba = liczby[okresla_ktore_liczby_sa_para[i][1]][1];
                            for (var u = 0; u <= 8; u++) {
                                if (pozycja[nr1pozycja][u] != id_1_liczby && pozycja[nr1pozycja][u] != id_2_liczby && obiekt[pozycja[nr1pozycja][u]].value_around[pierwsza_liczba] == false) { // warunki: nie moze to byc id_1_liczby i id_2_liczby, obiekt[ pozycja[nr1pozycja][u] ].value_around[pierwsza_liczba] == false
                                    obiekt[pozycja[nr1pozycja][u]].value_around[pierwsza_liczba] = true;
                                    obiekt[pozycja[nr1pozycja][u]].ilosc_mozliwosci--;
                                }

                                if (pozycja[nr1pozycja][u] != id_1_liczby && pozycja[nr1pozycja][u] != id_2_liczby && obiekt[pozycja[nr1pozycja][u]].value_around[druga_liczba] == false) { // warunki: nie moze to byc id_1_liczby i id_2_liczby, obiekt[id_2_liczby].value_around[druga_liczba] == false
                                    obiekt[pozycja[nr1pozycja][u]].value_around[druga_liczba] = true;
                                    obiekt[pozycja[nr1pozycja][u]].ilosc_mozliwosci--;
                                }
                            }
                        }
                    }

                }
            }

            /*if (ilosc_wyst2 == 2) {
                czy_jest_rowne = true; // ustawia true
                for (var i = 1; i <= 9; i++) { // sprawdza, czy sa równe
                    if (obiekt[tablica_wynik2[0]].value_around[i] != obiekt[tablica_wynik2[1]].value_around[i]) {
                        czy_jest_rowne = false;
                        i = 9;
                    }
                }
                //alert(tablica_wynik2);
                // leci dalej
                if (czy_jest_rowne) { // jeżeli czy_jest_rowne nie zostało zmienione oznacza to, value_aroud sa takie same!!
                    // alert( tablica_wynik2[0] +" "+tablica_wynik2[1]);
                    for (var o = 1; o <= 9; o++) {
                        if (obiekt[tablica_wynik2[0]].value_around[o] == false) {
                            jakie_to_liczby[numer_wystapnienia] = o;
                            numer_wystapnienia++;
                        }
                    }
                    // jakie_to_liczby[0]
                    // jakie_to_liczby[1]
                    // usuwa te liczby z .value_around w pozycja
                    //alert(jakie_to_liczby + " - "+tablica_wynik2);
                    for (var p = 0; p <= 8; p++) { // sprawdzanie i przydział
                        //alert( (obiekt[ pozycja[nr1pozycja][p]].value_around[jakie_to_liczby[0] ] +", "+obiekt[ pozycja[nr1pozycja][p]].value_around[jakie_to_liczby[1] ]));

                        if (obiekt[pozycja[nr1pozycja][p]].value_around[jakie_to_liczby[0]] == false  && pozycja[nr1pozycja][p] != tablica_wynik2[0] && pozycja[nr1pozycja][p] != tablica_wynik2[1]) { // wiele warunków XD, oba .value_around msuza być false i nie moga to byc wybrane wczesniej ( tablica_wynik2[] ) liczby
                            obiekt[pozycja[nr1pozycja][p]].value_around[jakie_to_liczby[0]] = true;
                            obiekt[pozycja[nr1pozycja][p]].ilosc_mozliwosci --;
                        }
                        if (obiekt[pozycja[nr1pozycja][p]].value_around[jakie_to_liczby[1]] == false && pozycja[nr1pozycja][p] != tablica_wynik2[0] && pozycja[nr1pozycja][p] != tablica_wynik2[1]) { // wiele warunków XD, oba .value_around msuza być false i nie moga to byc wybrane wczesniej ( tablica_wynik2[] ) liczby
                            obiekt[pozycja[nr1pozycja][p]].value_around[jakie_to_liczby[1]] = true;
                            obiekt[pozycja[nr1pozycja][p]].ilosc_mozliwosci --;
                            //alert(a);
                        }


                    }

                }
                czy_jest_rowne = true; // reset równosci
            }*/

            //reset
            jakie_to_liczby = [];
            ilosc_wyst2 = 0; // reset! XD
            ilosc_wyst3 = 0; // reset! XD
            tablica_wynik2 = [];
            //tablica_wynik2[1] = 0;
            tablica_wynik3[0] = 0;
            tablica_wynik3[1] = 0;
            tablica_wynik3[2] = 0;
            numer_wystapnienia = 0;
            // PRZYPADEK NR1 ZAKONCZONY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
    }
}

function oddaje_pary_z_tablicy(tab) { //tylko tablice 2 wymiarowe, w których 2 wymiar ma length == 2
    length = tab.length;
    //var test = '';
    var liczby = [];
    var ilosc = 0;
    for (var i = 0; i < length; i++) {

        for (var u = i + 1; u < length; u++) {
            //test=test+tab[i]+" "+tab[u]+"<br />";
            if (porownywarka_tablic2(tab[i], tab[u])) {
                //  test = test +"równe sa: "+tab[i]+" "+tab[u]+"<br />";
                liczby[ilosc] = i + "" + u;
                ilosc++;
            }
        }
    }
    // document.getElementById("dla_testu").innerHTML = test;
    //alert(liczby);
    if (ilosc > 0) {
        ilosc = 0;
        return liczby;
    }
    return false;
}

function porownywarka_tablic2(tab1, tab2) {
    length1 = tab1.length;
    length2 = tab2.length;
    if (length1 != length2) {
        return false;
    }
    for (var i = 0; i <= 1; i++) {
        if (tab1[i] != tab2[i]) {
            return false;
        }
    }
    return true;
    //}
    //return false;
}

function sprawdz_czy_istnieje_tylko_1_mozliwosc() { //
    for (var i = 1; i <= 81; i++) {
        if (obiekt[i].ilosc_mozliwosci == 1) {
            for (var u = 1; u <= 9; u++) {
                if (obiekt[i].value_around[u] == false) {
                    pomoc = u;
                    break;
                }
            }
            wstaw_value_do_obiektu_i_id(i, pomoc);
        }
    }
}

function sprawdz_czy_jest_tylko_1_true_w_pozycji() {
    for (i = 1; i <= 9; i++) {
        for (u = 0; u <= 8; u++) {
            for (y = 1; y <= 9; y++) {
                id = CUBE[i][u];
                if (obiekt[id].value_around[y] && tablica_CUBE[i][y] > 0 && tablica_bezpieczenstwa_CUBE[i][y] == false) {
                    tablica_CUBE[i][y]--;
                    if (tablica_CUBE[i][y] == 1) {
                        tablica_bezpieczenstwa_CUBE[i][y] = true;
                        for (t = 0; t <= 8; t++) {
                            if (obiekt[CUBE[i][t]].value_around[y] == false) { //CUBE[i][t] to ID :))
                                wstaw_value_do_obiektu_i_id(CUBE[i][t], y);
                            }
                        }

                    }

                }
                id = pozycjaX[i][u];
                if (obiekt[id].value_around[y] && tablica_pozycjaX[i][y] > 0 && tablica_bezpieczenstwa_pozycjaX[i][y] == false) {
                    tablica_pozycjaX[i][y]--;
                    if (tablica_pozycjaX[i][y] == 1) {
                        tablica_bezpieczenstwa_pozycjaX[i][y] = true;
                        for (t = 0; t <= 8; t++) {
                            if (obiekt[pozycjaX[i][t]].value_around[y] == false) { //CUBE[i][t] to ID :))
                                wstaw_value_do_obiektu_i_id(pozycjaX[i][t], y);
                            }
                        }

                    }

                }

                id = pozycjaY[i][u];
                if (obiekt[id].value_around[y] && tablica_pozycjaY[i][y] > 0 && tablica_bezpieczenstwa_pozycjaY[i][y] == false) {
                    tablica_pozycjaY[i][y]--;
                    if (tablica_pozycjaY[i][y] == 1) {
                        tablica_bezpieczenstwa_pozycjaY[i][y] = true;
                        for (t = 0; t <= 8; t++) {
                            if (obiekt[pozycjaY[i][t]].value_around[y] == false) { //CUBE[i][t] to ID :))
                                wstaw_value_do_obiektu_i_id(pozycjaY[i][t], y);
                            }
                        }

                    }

                }

            }
        }
    }

    reset_wartosci_w_tablicach_cube_etc();
    //a może zapsiz co ma ta funkcja robić :/
}

function redukcja_przez_wykluczenie() { // funkcja sprawdzajaca czy ilosc false jest w przedziale [2,3], jezeli tak to zprawdza, czy maja taki sam X lub Y, jezeli tak to w tym X lub Y liczba y nie moze się powtorzyc

    // zad_01 skanuje dany CUBE szukajac liczby (np 1),
    // zad_02 zlicza ile razy moze wystapić,
    // zad_03 if występuje 2 lub 3 razy sprawdza idze dalej i jeszcze value==""
    // (inaczej nie spełnia warunków)
    //
    //      zad_04 sprawdza czy maja one wspolny X lub Y, if wszystkie maja taki sam X:
    //          ustawia dla wszytkich(oprócz wczeniejszych obiektów) obiektów z X == X obiektów .value_around[x] = true i zmiejsza ilosc_mozliwosci--;

    //zmienne
    var ilosc_wystepowan = 0;
    var szukane_tablica = [false, false, false];
    var nr = 0;

    var number_of_position; //dla czytelnosci

    // skanuje CUBE[][]
    for (var szukana = 1; szukana <= 9; szukana++) { // szukana - liczba która aktualnie szukamy
        for (var nr1cube = 1; nr1cube <= 9; nr1cube++) { // nr1cube - pierwszo wymiarowy numer w CUBE[nr1cube][]
            for (var nr2cube = 0; nr2cube <= 8; nr2cube++) { // nr2cube - drugo wymiarowy numer w CUBE[][nr2cube]
                // szuka, czy 'szukana' występuje i zlicza jej wyspępowania
                //  CUBE[nr1cube][nr2cube] == numer pola
                if (obiekt[CUBE[nr1cube][nr2cube]].value == "" && obiekt[CUBE[nr1cube][nr2cube]].value_around[szukana] == false) { // sprawdza czy pole jest puste i czy 'szukana' jest mozliwa do wpisania
                    ilosc_wystepowan++;
                    szukane_tablica[nr] = CUBE[nr1cube][nr2cube];
                    nr++;
                    if (ilosc_wystepowan > 3) { //if przekroczy szukane_tablica resetuje ilosc_wystepowan i idzie skanować następnego CUBE
                        nr2cube = 8;
                        ilosc_wystepowan = 0;
                        nr = 0;
                        szukane_tablica = [false, false, false];
                    }
                }
            }
            //przeskanowało cały jeden CUBE
            if (ilosc_wystepowan == 2) {
                // DLA X
                if (obiekt[szukane_tablica[0]].X == obiekt[szukane_tablica[1]].X) { //sprawdza czy .X sa równe (dla 2)
                    number_of_position = obiekt[szukane_tablica[0]].X; //dla czytelnosci
                    //dla wszystkich obiektów posiadajcych .X == number_of_position ustawia .value_around[szukana] na true
                    for (var i = 0; i <= 8; i++) {
                        if (obiekt[pozycjaX[number_of_position][i]].value == '' && obiekt[pozycjaX[number_of_position][i]].value_around[szukana] == false && pozycjaX[number_of_position][i] != szukane_tablica[0] && pozycjaX[number_of_position][i] != szukane_tablica[1]) { // warunki: .value jest puste, obiekt ma .value_around ustawione na false, pozycja jest różna od liczb w "szukane_tablica"
                            obiekt[pozycjaX[number_of_position][i]].value_around[szukana] = true;
                            obiekt[pozycjaX[number_of_position][i]].ilosc_mozliwosci--;
                            sprawdz_czy_jest_tylko_1_true_w_pozycji();
                            sprawdz_czy_istnieje_tylko_1_mozliwosc();
                        }
                    }
                }
                // DLA Y

                if (obiekt[szukane_tablica[0]].Y == obiekt[szukane_tablica[1]].Y) { //sprawdza czy .X sa równe (dla 2)
                    number_of_position = obiekt[szukane_tablica[0]].Y; //dla czytelnosci
                    //dla wszystkich obiektów posiadajcych .X == number_of_position ustawia .value_around[szukana] na true

                    for (var i = 0; i <= 8; i++) {
                        if (obiekt[pozycjaY[number_of_position][i]].value == '' && obiekt[pozycjaY[number_of_position][i]].value_around[szukana] == false && pozycjaY[number_of_position][i] != szukane_tablica[0] && pozycjaY[number_of_position][i] != szukane_tablica[1]) {
                            obiekt[pozycjaY[number_of_position][i]].value_around[szukana] = true;
                            obiekt[pozycjaY[number_of_position][i]].ilosc_mozliwosci--;
                            sprawdz_czy_jest_tylko_1_true_w_pozycji();
                            sprawdz_czy_istnieje_tylko_1_mozliwosc();

                        }
                    }
                }

            }

            if (ilosc_wystepowan == 3) {
                //DLA X
                if (obiekt[szukane_tablica[0]].X == obiekt[szukane_tablica[1]].X && obiekt[szukane_tablica[0]].X == obiekt[szukane_tablica[2].X]) {
                    number_of_position = obiekt[szukane_tablica[0]].X; //dla czytelnosci
                    for (var i = 0; i <= 8; i++) {
                        if (obiekt[pozycjaX[number_of_position][i]].value == '' && obiekt[pozycjaX[number_of_position][i]].value_around[szukana] == false && pozycjaX[number_of_position][i] != szukane_tablica[0] && pozycjaX[number_of_position][i] != szukane_tablica[1] && pozycjaX[number_of_position][i] != szukane_tablica[2]) {
                            obiekt[pozycjaX[number_of_position][i]].value_around[szukana] = true;
                            obiekt[pozycjaX[number_of_position][i]].ilosc_mozliwosci--;
                            sprawdz_czy_jest_tylko_1_true_w_pozycji();
                            sprawdz_czy_istnieje_tylko_1_mozliwosc();
                        }
                    }

                }
                //DLA Y
                if (obiekt[szukane_tablica[0]].Y == obiekt[szukane_tablica[1]].Y && obiekt[szukane_tablica[0]].Y == obiekt[szukane_tablica[2].Y]) {
                    number_of_position = obiekt[szukane_tablica[0]].Y; //dla czytelnosci
                    for (var i = 0; i <= 8; i++) {
                        if (obiekt[pozycjaY[number_of_position][i]].value == '' && obiekt[pozycjaY[number_of_position][i]].value_around[szukana] == false && pozycjaY[number_of_position][i] != szukane_tablica[0] && pozycjaY[number_of_position][i] != szukane_tablica[1] && pozycjaY[number_of_position][i] != szukane_tablica[2]) {
                            obiekt[pozycjaY[number_of_position][i]].value_around[szukana] = true;
                            obiekt[pozycjaY[number_of_position][i]].ilosc_mozliwosci--;
                            sprawdz_czy_jest_tylko_1_true_w_pozycji();
                            sprawdz_czy_istnieje_tylko_1_mozliwosc();
                        }
                    }

                }
            }
            // reset wartosci po petli
            ilosc_wystepowan = 0;
            nr = 0;
            szukane_tablica = [false, false, false];
        }
    }
}

function v2_zmianaX(iks, id_skrot, y) {
    for (var il_nr = 0; il_nr <= 8; il_nr++) {
        id_ob_do_zmiany = pozycjaX[iks][il_nr]; //w obiekcie o tym id należy ustawić odpowiedznie .value_around na true;
        if (id_ob_do_zmiany != tab_z_false[0] && id_ob_do_zmiany != tab_z_false[1]) {
            //alert(id_ob_do_zmiany +", "+tab_z_false);
            obiekt[id_ob_do_zmiany].value_around[y] = true;
            //obiekt[id_ob_do_zmiany].ilosc_mozliwosci--;
            sprawdz_czy_jest_tylko_1_true_w_pozycji(); //XD??
            //alert("co1");
        }
    }

}

function v2_zmianaY(igrek, id_skrot, y) {
    for (var il_nr = 0; il_nr <= 8; il_nr++) {
        id_ob_do_zmiany = pozycjaY[igrek][il_nr]; //w obiekcie o tym id należy ustawić odpowiedznie .value_around na true;
        if (id_ob_do_zmiany != tab_z_false[0] && id_ob_do_zmiany != tab_z_false[1]) {
            //alert(id_ob_do_zmiany +", "+tab_z_false);
            obiekt[id_ob_do_zmiany].value_around[y] = true;
            //obiekt[id_ob_do_zmiany].ilosc_mozliwosci--;
            sprawdz_czy_jest_tylko_1_true_w_pozycji(); //XD??
            //alert("co1");
        }
    }

}

function reset_wartosci_w_tablicach_cube_etc() { // kwestia bezpieczenstwa
    for (var i = 1; i <= 9; i++) {
        tablica_CUBE[i] = [null, 9, 9, 9, 9, 9, 9, 9, 9, 9];
        tablica_pozycjaY[i] = [null, 9, 9, 9, 9, 9, 9, 9, 9, 9];
        tablica_pozycjaX[i] = [null, 9, 9, 9, 9, 9, 9, 9, 9, 9];
        // nie resetuje bezpieczentwa, te sa przydatne heh
        //tablica_bezpieczenstwa_CUBE[i] = [null, false, false, false, false, false, false, false, false, false];
        //tablica_bezpieczenstwa_pozycjaY[i] = [null, false, false, false, false, false, false, false, false, false];
        //tablica_bezpieczenstwa_pozycjaX[i] = [null, false, false, false, false, false, false, false, false, false];
    }
}

/**
 * [sprawdz_czy_poprawne_sudoku description] sprawdza, czy sudoku zostało porawnie rozwizane: warunki rozwizania:
 *     wszystkie pola w spacjalnych tablicach == 1 nie mnije nie więcej
 * @return {[type]} [description]
 */
function sprawdz_czy_poprawne_sudoku() {
    czy_zwyciestwo = true;
    //     tablica_sprawdzajaca_CUBE[i] = [null ,0,0,0,0,0,0,0,0,0];
    for (var i = 1; i <= 9; i++) {
        for (var u = 0; u <= 8; u++) {
            wartosc = obiekt[pozycjaX[i][u]].value;
            tablica_sprawdzajaca_pozycjaX[i][wartosc]++;
            if (tablica_sprawdzajaca_pozycjaX[i][wartosc] != 1) {
                czy_zwyciestwo = false;
                //alert("co1");
            }
            wartosc = obiekt[pozycjaY[i][u]].value;
            tablica_sprawdzajaca_pozycjaY[i][wartosc]++;
            if (tablica_sprawdzajaca_pozycjaY[i][wartosc] != 1) {
                czy_zwyciestwo = false;
                // alert("co2");
            }
            wartosc = obiekt[CUBE[i][u]].value;
            tablica_sprawdzajaca_CUBE[i][wartosc]++;
            if (tablica_sprawdzajaca_CUBE[i][wartosc] != 1) {
                czy_zwyciestwo = false;
                // alert(tablica_sprawdzajaca_CUBE[i][wartosc] + " i = " + i + "u = " + u);
            }
        }
    }
    return czy_zwyciestwo;
}



//----------------------------------------------------------------------------------------------------
function lite_dodaj_do_funkcji() {
    ciag = '';
    for (var i = 1; i <= 81; i++) {
        if (document.getElementById("id" + i).value == '') {
            ciag = ciag + 0;
        } else {
            ciag = ciag + document.getElementById("id" + i).value;
        }
    }
    document.getElementById("lite_dodaj_do_funkcji").innerHTML = ciag;
    return ciag;
}

/**
 * ----------------------------------------------------------------------------------------------------------------------------------------------------
 * [wstaw_value_do_obiektu_i_id wstawia liczby do obiektów, jak i i odpowiednich ID w polu sudoku]
 * @param  {[type]} id                [description]
 * @param  {[type]} wstawiona_wartosc [description]
 * @return {[type]}                   [description]
 */
function wstaw_value_do_obiektu_i_id(id, wstawiona_wartosc) {
    if (obiekt[id].value != wstawiona_wartosc && tab_liczba_tylko_raz[id] == false) {

        obiekt[id].value = wstawiona_wartosc;
        obiekt[id].ilosc_mozliwosci = 0;
        tab_liczba_tylko_raz[id] = true; // tablica, która pozwala wpisać dana liczbe tylko raz
        //petla_ustawiajaca_true_w_obiekcie_z_wartoscia(id);
        for (var u = 1; u <= 9; u++) {
            obiekt[id].value_around[u] = true;
        }
        document.getElementById("id" + id).value = wstawiona_wartosc;

        if (czy_zafarbowac_tlo == true) {
            document.getElementById("id" + id).style.backgroundColor = "#10C4C0";
            czy_zafarbowac_tlo = false;
        }

        // wg wsadzonych wartosci do obiektów/documentów zmienia .value_around i .ilosc_mozliwosciobiektów wokół, zlepek z funkcji
        numerX = obiekt[id].X;
        numerY = obiekt[id].Y;
        numerCUBE = obiekt[id].CUBE;
        for (var i = 0; i <= 8; i++) {
            // szuka liczb dla pozycjiX, za pierwszym razem zmiejsza .ilosc_mozliwosci o 1
            if (obiekt[pozycjaX[numerX][i]].value_around[wstawiona_wartosc] == false) {
                obiekt[pozycjaX[numerX][i]].ilosc_mozliwosci--;
                obiekt[pozycjaX[numerX][i]].value_around[wstawiona_wartosc] = true;
            }

            if (obiekt[pozycjaY[numerY][i]].value_around[wstawiona_wartosc] == false) {
                obiekt[pozycjaY[numerY][i]].ilosc_mozliwosci--;
                obiekt[pozycjaY[numerY][i]].value_around[wstawiona_wartosc] = true;
            }

            if (obiekt[CUBE[numerCUBE][i]].value_around[wstawiona_wartosc] == false) {
                obiekt[CUBE[numerCUBE][i]].ilosc_mozliwosci--;
                obiekt[CUBE[numerCUBE][i]].value_around[wstawiona_wartosc] = true;
            }
        }
        ilosc_zapisanych_pol++;

        sprawdz_czy_istnieje_tylko_1_mozliwosc();
    }
    jakie_l();
}



/**
 * [przypisz_numery_pozycji description] do obiektów etc
 * @return {[type]} [description]
 */
function przypisz_numery_pozycji() {
    for (var i = 1; i <= 81; i++) {
        var X = obiekt[i].X;
        var Y = obiekt[i].Y;
        var C = obiekt[i].CUBE;
        for (z = 0; z <= 8; z++) {
            if (pozycjaX[X][z] == i && obiekt[i].X_nr == "default") {
                obiekt[i].X_nr = z + 1;
            }
            if (pozycjaY[Y][z] == i && obiekt[i].Y_nr == "default") {
                obiekt[i].Y_nr = z + 1;
            }
            if (CUBE[C][z] == i && obiekt[i].CUBE_nr == "default") {
                obiekt[i].CUBE_nr = z + 1;
            }
        }
    }
}

function jakie_l() {
    var tab = [];
    var nr = 0;
    for (var i = 1; i <= 81; i++) {
        for (var u = 1; u <= 9; u++) {
            if (obiekt[i].value_around[u] == false) {
                tab[nr++] = u;
            }
            /*else{
                obiekt[i].jakie_liczby_mozna_wpisac[u] = null;
            }*/
        }
        obiekt[i].jakie_liczby_mozna_wpisac = tab;
        nr = 0;
        tab = [];
    }

}

function okresl_obiekty() {
    for (var i = 1; i <= 81; i++) {
        obiekt[i] = {
            X: 0, // okresla w którym pozycjaX_ znajduje się obiekt, domyslnie 0, czyli nigdzie
            X_nr: "default",
            Y: 0, // okresla w którym pozycjaY_ znajduje się obiekt, domyslnie 0, czyli nigdzie
            Y_nr: "default",
            CUBE: 0, // okresla w którym CUBE_ znajduje się obiekt, domyslnie 0, czyli nigdzie
            CUBE_nr: "default",
            value: '', // okresla jaka wartosc ma obiekt[i]
            id: i,
            ilosc_mozliwosci: 9, // zmiejsza się ze każdym razem, gdy zostawnie przyznana wartosc true dla "obiekt[i].value_around"
            value_around: [0, false, false, false, false, false, false, false, false, false],
            jakie_liczby_mozna_wpisac: []
            /* okresla czy wystepuje gdzies wsrod pozycjaX[i], pozycjaY[i] lub CUBE[i]
            wg wzoru value_around[0] nic nie znaczy, value_around[1] oznacza czy wartosc 1 wystepuje gdzies wsrod pozycjaX[1], pozycjaY[1] lub CUBE[1], reszta analogicznie aż do value_around[9].
            */
            //jakie_liczby_mozna_wpisac: jakie_l(obiekt[i].value_around)
        };
        // przYpisuje odpowiednie wartosci X. Dla pierwszego poziomu X = 1, dla drugiego poziomu X = 2, etc etc od dziewiatego X = 9;
        if (i <= 9) {
            obiekt[i].X = 1;
        } else if (i <= 18) {
            obiekt[i].X = 2;
        } else if (i <= 27) {
            obiekt[i].X = 3;
        } else if (i <= 36) {
            obiekt[i].X = 4;
        } else if (i <= 45) {
            obiekt[i].X = 5;
        } else if (i <= 54) {
            obiekt[i].X = 6;
        } else if (i <= 63) {
            obiekt[i].X = 7;
        } else if (i <= 72) {
            obiekt[i].X = 8;
        } else if (i <= 81) {
            obiekt[i].X = 9;
        }

        // przYpisuje odpowiednie wartosci Y. Dla dziewitego pionu Y = 9, Dla ósmego pionu Y = 8, etc do Y = 1;
        if (i % 9 == 0) {
            obiekt[i].Y = 9;
        } else if ((i + 1) % 9 == 0) {
            obiekt[i].Y = 8;
        } else if ((i + 2) % 9 == 0) {
            obiekt[i].Y = 7;
        } else if ((i + 3) % 9 == 0) {
            obiekt[i].Y = 6;
        } else if ((i + 4) % 9 == 0) {
            obiekt[i].Y = 5;
        } else if ((i + 5) % 9 == 0) {
            obiekt[i].Y = 4;
        } else if ((i + 6) % 9 == 0) {
            obiekt[i].Y = 3;
        } else if ((i + 7) % 9 == 0) {
            obiekt[i].Y = 2;
        } else if ((i + 8) % 9 == 0) {
            obiekt[i].Y = 1;
        }

        // przypisuje odpowiednie wartosci CUBE dla CUBE: 1 id to: 1,2,3, 10,11,12, 19,20,21;
        if (i >= 1 && i <= 3 || i >= 10 && i <= 12 || i >= 19 && i <= 21) {
            obiekt[i].CUBE = 1;
        } else if (i >= 4 && i <= 6 || i >= 13 && i <= 15 || i >= 22 && i <= 24) {
            obiekt[i].CUBE = 2;
        } else if (i >= 7 && i <= 9 || i >= 16 && i <= 18 || i >= 25 && i <= 27) {
            obiekt[i].CUBE = 3;
        } else if (i >= 28 && i <= 30 || i >= 37 && i <= 39 || i >= 46 && i <= 48) {
            obiekt[i].CUBE = 4;
        } else if (i >= 31 && i <= 33 || i >= 40 && i <= 42 || i >= 49 && i <= 51) {
            obiekt[i].CUBE = 5;
        } else if (i >= 34 && i <= 36 || i >= 43 && i <= 45 || i >= 52 && i <= 54) {
            obiekt[i].CUBE = 6;
        } else if (i >= 55 && i <= 57 || i >= 64 && i <= 66 || i >= 73 && i <= 75) {
            obiekt[i].CUBE = 7;
        } else if (i >= 58 && i <= 60 || i >= 67 && i <= 69 || i >= 76 && i <= 78) {
            obiekt[i].CUBE = 8;
        } else if (i >= 61 && i <= 63 || i >= 70 && i <= 72 || i >= 79 && i <= 81) {
            obiekt[i].CUBE = 9;
        }

    }
    jakie_l(); // wpisuje jakie liczby można wpisać w obiekt, przydatne w późniejszych funkcjach heh

        // potrzebne do ostatecznego rozwiazania kwestii sudoku()
    for (var o = 1; o <= 81; o++) {
        obiekt_backup[o] = {
            X: 0, // okresla w którym pozycjaX_ znajduje się obiekt, domyslnie 0, czyli nigdzie
            X_nr: "default",
            Y: 0, // okresla w którym pozycjaY_ znajduje się obiekt, domyslnie 0, czyli nigdzie
            Y_nr: "default",
            CUBE: 0, // okresla w którym CUBE_ znajduje się obiekt, domyslnie 0, czyli nigdzie
            CUBE_nr: "default",
            value: '', // okresla jaka wartosc ma obiekt[i]
            id: o,
            ilosc_mozliwosci: 9, // zmiejsza się ze każdym razem, gdy zostawnie przyznana wartosc true dla "obiekt[i].value_around"
            value_around: [0, false, false, false, false, false, false, false, false, false],
            jakie_liczby_mozna_wpisac: []
            /* okresla czy wystepuje gdzies wsrod pozycjaX[i], pozycjaY[i] lub CUBE[i]
            wg wzoru value_around[0] nic nie znaczy, value_around[1] oznacza czy wartosc 1 wystepuje gdzies wsrod pozycjaX[1], pozycjaY[1] lub CUBE[1], reszta analogicznie aż do value_around[9].
            */
            //jakie_liczby_mozna_wpisac: jakie_l(obiekt[i].value_around)
        };
    }

}


function docID(id) {
    return document.getElementById(id);
}

//odpala skrypt
start();