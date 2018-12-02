var Validacija=(function(){
	//lokalne variable idu ovdje
	var konstruktor=function(divElementPoruke){
			
		return{
			ime:function(inputElement){
				var imeRGEX = /^[A-Z]([']*[a-zA-Z]+[']*)+(([-]|\s)([A-Z]([']?[a-zA-Z]+[']?)+)){0,3}$/;
		  		var ime = inputElement.value;
		  		var imeResult = imeRGEX.test(ime);
		  		if(imeResult == false){
		  			pisiPoruku(divElementPoruke, inputElement, "ime i prezime");
		  		}
		  		else{
		  		     brisiPoruku(divElementPoruke, inputElement, "ime i prezime");
		  		}
			},

			godina:function(inputElement){
				var godinaRGEX = /^20\d{1}\d{1}[/]20\d{1}\d{1}$/;
		  		var godina = inputElement.value;
		  		var godinaResult = godinaRGEX.test(godina);
		  		if(godinaResult == false)
		  			pisiPoruku(divElementPoruke, inputElement, "godina");
		  		else{
		  			var g1= parseInt(godina.substr(2,2));
		  			var g2= parseInt(godina.substr(7,2));
		  		     if(g1 == g2-1)
		  		     	brisiPoruku(divElementPoruke, inputElement, "godina");
		  		     else
		  		     	pisiPoruku(divElementPoruke, inputElement, "godina");
		  		}

			},

			repozitorij:function(inputElement,regex){
				var rep = inputElement.value;
				var repResult = regex.test(rep);
				if(repResult == false){
		  			pisiPoruku(divElementPoruke, inputElement, "repozitorij");
		  		}
		  		else
		  		    brisiPoruku(divElementPoruke, inputElement, "repozitorij");
			},
			index:function(inputElement){
				var indRGX = /^(1[4-9]|20){1}[0-9]{3}$/;
				var ind = inputElement.value;
				var indResult = indRGX.test(ind);
				if(indResult == false){
		  			pisiPoruku(divElementPoruke, inputElement, "index");
		  		}
		  		else
		  		    brisiPoruku(divElementPoruke, inputElement, "index");
			},
			naziv:function(inputElement){
				var nazivRGX = /^[A-Za-z]{1}[-A-Za-z0-9\/\\"'!?:;,]+([0-9]|[a-z])+$/;
				var naziv = inputElement.value;
				var nazivResult = nazivRGX.test(naziv);
				if(nazivResult == false){
		  			pisiPoruku(divElementPoruke, inputElement, "naziv");
		  		}
		  		else{
		  		    brisiPoruku(divElementPoruke, inputElement, "naziv");
		  		}

			},
			url:function(inputElement){
				var urlRGX = /^((http(s)?|ftp|ssh):\/\/){1}[A-Za-z0-9]+([.]{1}[A-Za-z0-9]+)*((\/[A-Za-z0-9]+)*|(\/[A-Za-z0-9]+)+[?]{1}([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[=]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[&]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[=]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9]))$/;
				var url = inputElement.value;
				var urlResult = urlRGX.test(url);
				if(urlResult == false){
		  			pisiPoruku(divElementPoruke, inputElement, "url");
		  		}
		  		else
		  		    brisiPoruku(divElementPoruke, inputElement, "url");

			},
			password:function(inputElement){
				var passRGEX = /(?=^[A-Za-z0-9]{8,}$)((([A-Z]+[A-Za-z]*[a-z]+[A-Za-z]*)|([a-z]+[A-Za-z]*[A-Z]+[A-Za-z]*))|(([A-Z]+[A-Z0-9]*[0-9]+[A-Z0-9]*)|([0-9]+[A-Z0-9]*[A-Z]+[A-Z0-9]*))|(([a-z]+[a-z0-9]*[0-9]+[a-z0-9]*)|([0-9]+[a-z0-9]*[a-z]+[a-z0-9]*))|([A-Z]+[a-zA-Z0-9]*[a-z]+[A-Za-z0-9]*[0-9]+[A-Za-z0-9]*)|([a-z]+[a-zA-Z0-9]*[A-Z]+[A-Za-z0-9]*[0-9]+[A-Za-z0-9]*)|([0-9]+[a-zA-Z0-9]*[a-z]+[A-Za-z0-9]*[A-Z]+[A-Za-z0-9]*)|([0-9]+[a-zA-Z0-9]*[A-Z]+[A-Za-z0-9]*[a-z]+[A-Za-z0-9]*))$/;
		  		var password = inputElement.value;
		  		var passResult = passRGEX.test(password);
		  		if(passResult == false){
		  			pisiPoruku(divElementPoruke, inputElement, "password");
		  		}
		  		else{
		  		     brisiPoruku(divElementPoruke, inputElement, "password");
		  		}
			}
		}
	}
	return konstruktor;
}());

function pisiPoruku(divElementPoruke, inputElement, naziv){
	inputElement.setAttribute('style', 'background: orangered !important');
	if(divElementPoruke.innerHTML != ""){
		if(divElementPoruke.innerHTML.indexOf(naziv) == -1){
			divElementPoruke.innerHTML = divElementPoruke.innerHTML.substr(0, divElementPoruke.innerHTML.length-1);
			divElementPoruke.innerHTML += "," + naziv + "!";
		}
	}
	else{
		//Ako je samo ovo nevalidno
		divElementPoruke.innerHTML = "Sljedeća polja nisu validna:" + naziv + "!";
	}
}
function brisiPoruku(divElementPoruke, inputElement, naziv) {
	inputElement.style.backgroundColor = "";
	if(divElementPoruke.innerHTML != ""){
		if(divElementPoruke.innerHTML.indexOf(naziv) !== -1){
			//Ako je samo ovaj nevalidan, onda izbrisi poruku citavu
			if(divElementPoruke.innerHTML == "Sljedeća polja nisu validna:" + naziv + "!"){
				divElementPoruke.innerHTML = "";
			}
			else{
				//izbrisi samo dati naziv iz stringa ako ima jos nevalidnih polja
				var i = divElementPoruke.innerHTML.indexOf(naziv);
				if(divElementPoruke.innerHTML[i-1] == ",")
					i--;
				var str = divElementPoruke.innerHTML.substr(0,i);
				divElementPoruke.innerHTML = str + divElementPoruke.innerHTML.substr(i+naziv.length+1, divElementPoruke.innerHTML.length-1);
			}
		}
	}
	if(divElementPoruke.innerHTML =="Sljedeća polja nisu validna: " || 
		divElementPoruke.innerHTML =="Sljedeća polja nisu validna:")
		divElementPoruke.innerHTML="";
}



