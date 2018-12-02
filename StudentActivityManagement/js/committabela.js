var CommitTabela=(function(){

	//S obrzirom da smo vidljivost varijabli radili tek na vježbama u 7. sedmici nastave, nisam znala gdje su moje varijable vidljive
	//tako da sam kreirala dosta varijabli u ovom committabela.js samo zbog sigurnosti iako znam da to nije dobra praksa

	var konstruktor=function(divElement,brojZadataka){

		if(brojZadataka < 0 || brojZadataka == 0) {
			return -1;
		}
		//Ako je tabela već kreirana, izbriši je i kreiraj novu
		if(divElement.firstChild != null)
		{
			divElement.removeChild(divElement.firstChild);
		}
		//Kreiramo tabelu
	    var tabela = document.createElement("TABLE");
	    tabela.setAttribute("id", "tabela");
	    divElement.appendChild(tabela);
        //Kreiramo prvi red, isti je u svakoj tabeli
	    let firstRow = document.createElement("TR");
	    firstRow.setAttribute("id", "red");
	    tabela.appendChild(firstRow);
	    //Kreiramo celije prvog reda
	    let cell = document.createElement("TH");
	    let text = document.createTextNode("Broj zadatka");
		cell.appendChild(text);
		firstRow.appendChild(cell);

 		cell = document.createElement("TH");
		text = document.createTextNode("Commiti");
		cell.appendChild(text);
		firstRow.appendChild(cell);
		//Dodajemo Zadatke tj. nove redove
	    for(var i = 0; i < brojZadataka; i++){
	    	let red = document.createElement("TR");
	    	tabela.appendChild(red);
	    	let j = i+1;
	    	let celija = document.createElement("TD");
	    	let text = document.createTextNode("Zadatak" + j);
	    	celija.appendChild(text);
	    	red.appendChild(celija);
	    	celija = document.createElement("TD");
	    	red.appendChild(celija);
		}

		return{
			dodajCommit:function(rbZadatka,url){

				//Provjera ispravnosti parametara ////////////////////////////////////////////////////////////////////////
				if(divElement.firstChild == null)
				{
					alert("Tabela nije kreirana!"); return;
				}
				var brRedova = document.getElementById("tabela").rows.length;
				let brojZ = brRedova-1;
				if(rbZadatka > brojZ || rbZadatka < 0 || rbZadatka ==0)
					return -1;

				var urlRGX = /^((http(s)?|ftp|ssh):\/\/){1}[A-Za-z0-9]+([.]{1}[A-Za-z0-9]+)*((\/[A-Za-z0-9]+)*|(\/[A-Za-z0-9]+)+[?]{1}([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[=]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[&]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[=]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9]))$/;
				var urlResult = urlRGX.test(url);

				if(urlResult == false)
					return;
				///////////////////////////////////////////////////////////////////////////////////////////////////////////

                //Dodajmo commit u tabelu
                var red = document.getElementById("tabela").rows[rbZadatka];
			    var kolone = red.cells.length;
			    var zadnjaKol = red.cells[kolone-1];

			    if(zadnjaKol.innerHTML != ""){
			    	
			    	var x = red.insertCell(kolone);
			    	var a = document.createElement("a");
			    	a.setAttribute("href", url);
			    	a.innerHTML= red.cells.length-1;
			    	x.appendChild(a);

			    }
			    else{
			    	//Ako je zadnja kolona prazna
			    	//Ne dodajemo novu nego pisemo na prvu praznu kolonu
			    	var columnSpan = zadnjaKol.colSpan;
			    	if(columnSpan == 1){
			    		var t = document.createElement("a");
				    	t.setAttribute("href", url);
				    	t.innerHTML= kolone -1;
			    		zadnjaKol.appendChild(t);
			    	}
			    	else{
			    		//Ako je prazna kolona veće sirine od 1
			    		var pom = columnSpan-1;
			    		zadnjaKol.colSpan = "1";
				    	var a = document.createElement("a");
				    	a.setAttribute("href", url);
				    	a.innerHTML= kolone -1;
				    	zadnjaKol.appendChild(a);
			    		red.insertCell();
			    		red.cells[kolone].colSpan = pom;
			    	}
			    }
			    
			    //Nadjimo maksimalan broj kolona:
			    var maxColumns = 0;
			    for(let i = 0; i <= brojZadataka; i++){
			    	let max = document.getElementById("tabela").rows[i];
			    	let kol = max.cells.length;
			    	let s = 0;
			    	for(let l = 0; l < kol; l++){
			    		s += max.cells[l].colSpan;
			    	}
			    	if(s > maxColumns)
			    		maxColumns = s;
			    } 

			    for(var i = 0; i <= brojZadataka; i++)
			    {

			    	var redd = document.getElementById("tabela").rows[i];
			    	var kolonee = redd.cells.length;
			    	var span = 0;
			    	for(let l = 0; l < kolonee; l++){
			    		span += redd.cells[l].colSpan;
			    	}
			    	
			    	if(span < maxColumns){
			    		if(i == 0) document.getElementById("tabela").rows[0].cells[1].colSpan++;
			    		if(i != 0 && i != rbZadatka){
			    	        var tekstt = redd.cells[kolonee-1].innerHTML;
			    	        if(tekstt == ""){
			    	        	redd.cells[kolonee-1].colSpan++;
			    	        }
			    	        else 
			    	        	redd.insertCell(kolonee);
				    	}
			    	}
			    }
	  
			},
			editujCommit:function(rbZadatka,rbCommita,url){
				//PRovjera ispravnosti parametara /////////////////////////////////////////////////////
				if(divElement.firstChild == null)
				{
					alert("Tabela nije kreirana!"); return;
				}

				var brRedova = document.getElementById("tabela").rows.length;
				let brojZ = brRedova-1;
				if(rbZadatka > brojZadataka || rbZadatka <=0 || rbCommita<=0)
					return -1;
				var ko = parseInt(tabela.rows[rbZadatka].cells.length-1);
				
				if(tabela.rows[rbZadatka].cells[tabela.rows[rbZadatka].cells.length-1].innerHTML == "")
					ko = ko - 1;

				if( rbCommita > ko || rbZadatka<=0 || rbCommita<=0)
					return -1;

				var urlRGX2 = /^((http(s)?|ftp|ssh):\/\/){1}[A-Za-z0-9]+([.]{1}[A-Za-z0-9]+)*((\/[A-Za-z0-9]+)*|(\/[A-Za-z0-9]+)+[?]{1}([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[=]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[&]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9])[=]([a-z0-9]|[a-z0-9][-a-z0-9]*[a-z0-9]))$/;
				var urlResult2 = urlRGX2.test(url);

				if(urlResult2 == false)
					return;
	            ///////////////////////////////////////////////////////////////////////////////////////
				
				tabela.rows[rbZadatka].cells[rbCommita].getElementsByTagName("a")[0].href=url;
				alert("Commit je editovan!");
			},
			obrisiCommit:function(rbZadatka,rbCommita){

				//Provjera da li su parametri pogresni //////////////////////////////////////////////////////
				if(divElement.firstChild == null)
				{
					alert("Tabela nije kreirana!"); return;
				}

				var redovi = tabela.rows.length -1; // 4

				if(rbZadatka > brojZadataka ||rbZadatka <=0 || rbCommita<=0)
					return -1;

				var ko = parseInt(tabela.rows[rbZadatka].cells.length-1);
				
				if(tabela.rows[rbZadatka].cells[tabela.rows[rbZadatka].cells.length-1].innerHTML == "")
					ko = ko - 1;

				if( rbCommita > ko || rbZadatka<=0 || rbCommita<=0)
					return -1;
				//////////////////////////////////////////////////////////////////////////////////////////////

				//Red sa najvise kolona:
			    var maxCoo = 0;
			    for(var e = 0; e <= brojZadataka; e++){
			    	let maxy = document.getElementById("tabela").rows[e];
			    	let kolmaxy = maxy.cells.length;
			    	 if(kolmaxy > maxCoo)
			    		maxCoo = kolmaxy;
			    } 
			    
			    var nova = tabela.rows[rbZadatka].cells.length-1;
			    
				//Ako je kolona koja se brise posljednja, a red nije red sa max brojem kolona
				if(tabela.rows[rbZadatka].cells[nova].innerHTML == ""){
					//Znaci nije red sa max kolona jer ne bi usao u if da jeste
					var cspan = tabela.rows[rbZadatka].cells[nova].colSpan;
					tabela.rows[rbZadatka].deleteCell(rbCommita);
					tabela.rows[rbZadatka].cells[nova-1].colSpan++;
				}

				
				else if(tabela.rows[rbZadatka].cells[nova].getElementsByTagName("a")[0].innerHTML != ""){
					
					//Red sa najvise kolona
					var provjera = 0;
					for(var z = 1; z < brojZadataka; z++){
						var ukupno = tabela.rows[z].cells.length;
						if(tabela.rows[z].cells[ukupno-1].innerHTML == "")
							ukupno--;
						if(z!= rbZadatka &&ukupno==maxCoo)
							provjera++;
					}
					if(provjera > 0){
						//Ako je ovo red sa najvecim brojem kolona ali nije jedini
						//Samo obrisi tu celiju i dodaj umjesto nje praznu
						//var brisi = tabela.rows[rbZadatka].cells[rbCommita].getElementsByTagName("a")[0];
						tabela.rows[rbZadatka].deleteCell(rbCommita);
						tabela.rows[rbZadatka].insertCell();					
					}
					else{
						
						//Ako je ovaj red iz kojeg se brise, red sa najvecim brojem kolona i jedini sa tim brojem kolona
						tabela.rows[0].cells[1].colSpan--;
						for(var w = 0; w < tabela.rows.length; w++){
							
							if(w != 0 && w != rbZadatka){
								
								if(tabela.rows[w].cells[tabela.rows[w].cells.length-1].innerHTML == ""){
									if(tabela.rows[w].cells[tabela.rows[w].cells.length-1].colSpan > 1)
										tabela.rows[w].cells[tabela.rows[w].cells.length-1].colSpan--;
									else 
										tabela.rows[w].deleteCell(tabela.rows[w].cells.length-1);	
							    }
							    else if(tabela.rows[w].cells.length == maxCoo)
							    	provjera++;				
							}
							if(w == rbZadatka){
								//Obrisi celiju
								tabela.rows[rbZadatka].deleteCell(rbCommita);
							}
						}
					}
				}

			}
		}	
    }
	return konstruktor;
}());

