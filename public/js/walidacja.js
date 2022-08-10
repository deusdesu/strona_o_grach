function sprawdzPole(text) {
	let do_sprawdzenia_login = docID("login").value;
	let do_sprawdzenia_haslo = docID("haslo").value;
	let log, hasl;
	console.log(do_sprawdzenia_login);

		for(i = localStorage.getItem(text+"_ilosc") - 1;i>=0;i-- ){
			if(localStorage.getItem(text+i)){ // jezeli istnieje!
				//console.log("haslo: "+JSON.parse(localStorage.getItem("snake"+i)).haslo);
				if(do_sprawdzenia_login == JSON.parse(localStorage.getItem(text+i)).login && do_sprawdzenia_haslo != JSON.parse(localStorage.getItem(text+i)).haslo){
					docID("login_walidacja").innerHTML = "Pseudonim zajęte!";
					return false;
				}
			}
		
		}
	docID("login_walidacja").innerHTML = "";
	return true;
} 

function docID(id) {
    return document.getElementById(id);
}