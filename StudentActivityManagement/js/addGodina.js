function ucitaj(divElementPoruke, godina, inputElementRep1, inputElementRep2)
{
	var mojDiv = document.getElementById(divElementPoruke);
	var validacija = new Validacija(mojDiv);
	var godina = document.getElementById(godina);
	var rep1 = document.getElementById(inputElementRep1);
	var rep2 = document.getElementById(inputElementRep2);
	validacija.godina(godina);
	var rgx1 = /^[A-Za-z]{1}[-A-Za-z0-9\/\\"'!?:;,]+([0-9]|[a-z])+$/;
	validacija.repozitorij(rep1, rgx1);
	validacija.repozitorij(rep2, rgx1);
}