function ucitaj(divElementPoruke, inputElemenent)
{
	var mojDiv = document.getElementById(divElementPoruke);
	var validacija = new Validacija(mojDiv);
	var pass = document.getElementById(inputElemenent);
	validacija.password(pass);
}
