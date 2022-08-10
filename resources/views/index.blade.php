@extends('layouts.app')
@section('tytul',$page->tytul)
@section('tresc_glowna')

<div class="blok_danych"><p><b>Witam na mojej stronie poświęconej grom. Mam nadzieję, że miło spędzisz ten czas. </b></p></div>
			<div class="blok_danych">Poniżej znajdziesz informacje o grach, a powyżej możesz w nie zagrać.</div>
			<div class="blok_danych pomoc"> <div class="img"><img src="img/1_snake.jpg"></div><b>Snake</b> – gra komputerowa, wydana po raz pierwszy w październiku 1976 roku pod nazwą <b>Blockade</b><sup>[1]</sup> i spopularyzowana na przełomie XX i XXI wieku dzięki wersjom dla telefonów komórkowych firmy <b>Nokia</b><sup>[2]</sup>.</div>
			<div class="blok_danych pomoc"><div class="img"><img src="img/2_saper.png">
				</div><b>Saper</b> (tytuł oryginalny <b>Minesweeper</b>) – klasyczna jednoosobowa gra komputerowa napisana w 1981 roku przez <b>Roberta Donnera</b>, dostępna jako akcesorium w każdym systemie Microsoft Windows do wersji 7. Od wersji 8 i RT dostępne do ściągnięcia w sklepie Windows<sup>[3]</sup> (istnieją też wersje dla innych systemów operacyjnych). Gra polega na odkrywaniu na planszy poszczególnych pól w taki sposób, aby nie natrafić na minę. Na każdym z odkrytych pól napisana jest liczba min, które bezpośrednio stykają się z danym polem (od zera do ośmiu). Jeśli oznaczymy dane pole flagą, jest ono zabezpieczone przed odsłonięciem, dzięki czemu przez przypadek nie odsłonimy miny.</div>
			<div class="blok_danych pomoc"> <div class="img"><img src="img/3_sudoku.png"></div><b>Sudoku</b> (jap. 数独 sūdoku; od <b>sū</b>ji wa <b>doku</b>shin ni kagiru, czyli cyfry muszą być pojedyncze) – łamigłówka, której celem jest wypełnienie diagramu <b>9 × 9</b> w taki sposób, aby w każdym wierszu, w każdej kolumnie i w każdym z dziewięciu pogrubionych kwadratów 3 × 3 (zwanych „blokami” lub „podkwadratami”) znalazło się po jednej cyfrze od 1 do 9. Zasady przypominają trochę kwadrat łaciński, wymyślony i badany przez średniowiecznych matematyków z terenów Arabii (XIII wiek). W sudoku, w przeciwieństwie do kwadratu łacińskiego, cyfry nie mogą się powtarzać nie tylko w żadnym wierszu i kolumnie, ale także w małym kwadracie 3 × 3. Sudoku międzynarodową sławę zyskało dopiero w <b>2005</b> r.<sup>[4]</sup>

</div>
@endsection
@section('tresc_boczna')
<div class="blok_danych ">Przypisy:</div>
			<div class="blok_danych ">1. <a href="https://www.arcade-history.com/?n=blockade&page=detail&id=287" target="_blank">www.arcade-history.com</a></div>
			<div class="blok_danych ">2. <a href="https://gadzetomania.pl/58062,snake-nokia-waz-online" target="_blank"> Snake: wąż, który zmienił mobilną rozrywkę.  </a>[dostęp 2018-03-13]</div>
			<div class="blok_danych ">3. <a href="https://pl.wikipedia.org/wiki/Saper_(gra_komputerowa)" target="_blank"> Minesweeper  </a></div>
			<div class="blok_danych ">4. <a href="https://pl.wikipedia.org/wiki/Sudoku" target="_blank"> Sudoku  </a></div>
@endsection

   

