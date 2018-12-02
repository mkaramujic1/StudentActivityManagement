function ucitaj(divElementPoruke, ime, index)
{
	var mojDiv = document.getElementById(divElementPoruke);
	var validacija = new Validacija(mojDiv);
	var ime = document.getElementById(ime);
	var index = document.getElementById(index);
	validacija.ime(ime);
	validacija.index(index);
}
