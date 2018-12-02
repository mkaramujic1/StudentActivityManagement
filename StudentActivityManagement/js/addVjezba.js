function ucitaj(divElementPoruke, naziv)
{
	var mojDiv = document.getElementById(divElementPoruke);
	var validacija = new Validacija(mojDiv);
	var naziv = document.getElementById(naziv);
	validacija.naziv(naziv);
}
