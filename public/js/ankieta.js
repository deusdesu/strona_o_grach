if(!localStorage.getItem("a_ilosc")){
	localStorage.setItem( "a_ilosc",0 );
}

docID("a_zapis").addEventListener("click", function(){
	if(warunki()){
		a_zapis();
	}
		
});

function a_zapis(){
			//pobieram wartości z formularza do obietków i wsadzam je do localstorage
			//pobieram wartości z formularza
			console.log("zapis");
			pobieram_ankiete();
			pokaz_tab();
		}

function pokaz_tab(){
	let ilosc_a = localStorage.getItem("a_ilosc");
	let tabela = '';
	if(ilosc_a == 0 ){
		tabela ="Brak ankiet";
	}else{
		let Pseudonim,Telefon,Ulub,Zainteresowania, Wiek;
		tabela = '<table class="darkTable"><thead><tr><th>Pseudonim</th><th>Telefon</th><th>Ulubiona gra</th><th>Zainteresowania</th><th>Wiek</th><th>Edytuj</th><th>Usuń</th></tr></thead><tbody>';
		
		let edit = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg>';
		let trash = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
		for(let i = 0; i <ilosc_a; i++){
			if(localStorage.getItem("a_"+i)){
				Pseudonim = JSON.parse(localStorage.getItem("a_"+i)).login;
				Telefon = JSON.parse(localStorage.getItem("a_"+i)).tel;
				Ulub = JSON.parse(localStorage.getItem("a_"+i)).ulub;
				Zainteresowania = JSON.parse(localStorage.getItem("a_"+i)).zainteresowania;
				Wiek = JSON.parse(localStorage.getItem("a_"+i)).wiek;
				
				tabela+="<tr><td>"+Pseudonim+"</td><td>"+Telefon+"</td><td>"+Ulub+"</td><td>"+Zainteresowania+"</td><td>"+Wiek+"</td><td><button id='e_"+i+"' onclick=zmiana('e_"+i+"') >"+edit+"</button></td><td><button onclick=zmiana('u_"+i+"')>"+ trash+"</button></td></tr>";
			}
		}
		
		tabela +="</tbody></table>";
		
		
	}
	docID("a_tab").innerHTML = tabela;
	
	
}
function pobieram_ankiete(){
	aktualna_ilosc = localStorage.getItem("a_ilosc");
	let item = {};
	item.login = docID('Pseudonim').value;
	item.tel = docID('Telefon').value;
	
	var tab = document.getElementsByClassName("zainteresowania");
    var op =""; //operacja arytmetyczna do wykonania
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].checked){
			op+=tab[i].value+" ";
		}
    }
	item.zainteresowania = op;
	
	tab = document.getElementsByName("ulub");
    op =""; //operacja arytmetyczna do wykonania
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].checked){
			op+=tab[i].value+" ";
		}
    }
	
	item.ulub = op;
	item.wiek = docID('wiek').value;
	localStorage.setItem('a_'+aktualna_ilosc, JSON.stringify(item));
	localStorage.setItem( "a_ilosc",++aktualna_ilosc );
	console.log("pokazuje");
	console.log(item);
	console.log("koniec");
}

function zmiana(text_id){
	if(text_id[0] == 'u'){
		let id = text_id.replace("u_", "");
		localStorage.removeItem('a_'+id);
		pokaz_tab();
		console.log("id u"+id);
		
	}else if(text_id[0] == 'e'){
		let id = text_id.replace("e_", "");
		//docID(text_id).parentElement.parentElement.style.backgroundColor = "blue";
		let tr = docID(text_id).parentElement.parentElement;
		let child = tr.childNodes;
		//console.log("wew: "+child[0].innerHTML);
		//let wew1=child[0].innerHTML;
		//console.log("wew: "+typeof(wew1));
		let zapisz_edycje = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/> </svg>';
		let edycja=`<td> <input type="text" id="p${id}" value='${child[0].innerHTML}'> </td><td><input type="text" id="t${id}" value='${child[1].innerHTML}'>`+`</td><td><input type="text" id="u${id}" value='${child[2].innerHTML}'>`+`</td><td><input type="text" id="z${id}" value='${child[3].innerHTML}'>`+`</td><td><input type="text" id="w${id}" value='${child[4].innerHTML}'>`+`</td><td><button onclick=zmiana_ankiety(${id})>${zapisz_edycje}</button></td><td>${child[6].innerHTML}</td>`;
		tr.innerHTML=edycja;
		console.log("dzieci: "+child.length)
		//console.log("id e"+id);
	}else{
		console.log("błąd wejścia function zmiana(text_id)");
	}
}
function zmiana_ankiety(id){
	//console.log("Zmiana ankiety: "+id);
	item = JSON.parse(localStorage.getItem("a_"+id));
	item.login = docID('p'+id).value;
	item.tel = docID('t'+id).value;
	item.zainteresowania = docID('z'+id).value;
	item.ulub = docID('u'+id).value;
	item.wiek = docID('w'+id).value;
	localStorage.removeItem('a_'+id);
	localStorage.setItem("a_"+id, JSON.stringify(item));
	pokaz_tab();
}
function warunki(){
	console.log("warunki");
	if( docID('Pseudonim').value == "" ||  docID('Telefon').value == "" ||  docID('Telefon').length != 9){
		console.log("false");
		return false;
	}
	let czy_wcisniete = false;
	let tab = document.getElementsByName("ulub");
	for (let i = 0; i < tab.length; i++) {
        if (tab[i].checked){
			czy_wcisniete = true;
		}
    }
	console.log("true");
	return czy_wcisniete;
}

function docID(id) {
    return document.getElementById(id);
}
window.onload = function(){pokaz_tab();}
