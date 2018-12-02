var mojDiv, tabela;
var div,div1, div2,dvi3;
function kreirajTabelu(divTabele, brojZadataka, divPoruke)
{
	div = document.getElementById(divPoruke);
	var brojZadataka = document.getElementById(brojZadataka);
	if(brojZadataka <= 0)
		div.innerHTML = " Neispravan redni broj zadatka!";
	else{
		mojDiv = document.getElementById(divTabele);
		
		tabela = new CommitTabela(mojDiv,brojZadataka.value);
	}
	
}
function dodajCommit(divPoruke, brojZ, url)
{	
	div1 = document.getElementById(divPoruke);
	div1.innerHTML = "";
	var brojZ = document.getElementById(brojZ).value;
	var url = document.getElementById(url);
    if(tabela == null) alert("Tabela nije kreirana!"); 
    if(brojZ == ""|| url.value == ""){
    	alert("Popunite sva polja!");
    	return;
    }
    else{
    	validirajURL(url,div1);
    	var pom = tabela.dodajCommit(brojZ,url.value);
		if(pom == -1 )
	    div1.innerHTML += "Neispravan broj zadatka!";
    }
    
}

function obrisiCommit(divPoruke, brojZadatka, brojCommita)
{
	div2 = document.getElementById(divPoruke);
	var brojZadatka = document.getElementById(brojZadatka).value;
	var brojCommita =document.getElementById(brojCommita).value;
	if(tabela == null) {
		alert("Tabela nije kreirana!"); 
		return;
	}
	if(brojZadatka == "" || brojCommita == ""){
		alert("Popunite sva polja!"); 
		return;
	}
	if(tabela.obrisiCommit(brojZadatka, brojCommita) == -1)
		div2.innerHTML = "Neispravan parametar!";
	else div2.innerHTML = "";
}

function editujCommit(divPoruke, brojZadatka, brojCommita,url)
{
	div3 = document.getElementById(divPoruke);
	div3.innerHTML = "";
	var brojZadatkaC = document.getElementById(brojZadatka).value;
	var brojCommitaC = document.getElementById(brojCommita).value;
	var urlC = document.getElementById(url);
	if(tabela == null){
		alert("Tabela nije kreirana!");
		return;
	}
	if(brojZadatkaC == "" || brojCommitaC == "" || urlC.value== ""){
		alert("Popunite sva polja!");
		return;
	}
	validirajURL(urlC, div3);

	if(tabela.editujCommit(brojZadatkaC, brojCommitaC, urlC.value) == -1){
		div3.innerHTML += "Neispravan parametar!";
	}
}

function validirajURL(url, div)
{
	var validacija = new Validacija(div);
	validacija.url(url);
}	

