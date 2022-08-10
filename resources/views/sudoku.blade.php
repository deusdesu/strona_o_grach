@extends('layouts.app')
@section('tytul',$page->tytul)
<?php if ($page->czy_dodac_walidacje ){
    ?>
    @section('walidacja')	
    <link rel="stylesheet" href="{{ asset('css/walidacja.css') }}" type="text/css" />
    @stop
    <?php 
}?>
@section('css_specjalny')
    <link rel="stylesheet" href="{{ asset('css/'.$page->nazwa.'.css') }}" type="text/css" />
@stop

@section('tresc_glowna')
<div class="blok_danych"><div id="spr"><p><b> Sudoku </b></p></div></div>
			<div class="blok_danych"><div id = "pole_sudoku"></div></div>
@endsection
@section('tresc_boczna')
<div class="blok_danych "><p><b>Jak szybko zdołasz rozwiązać to sudoku?</b></p></div>
			<div class="blok_danych "><div id="stopper"></div></div>
			<div class="blok_danych "><input type="button" id="od_nowa" value="Zacznij od nowa!"></div>
			<div class="blok_danych "><input type="button" id="pokaz_rozwiacanie" value="Pokaż rozwiązanie!"></div>

            <form action="{{route('sendscore')}}" method="POST"> 
            @csrf
			<input type="text" id="liczba_punktow_sudoku" name="wynik" value="00:00:00" hidden >
            <input type="hidden" name="nazwa_gry" value="sudoku" readonly>
            <div class="blok_danych "><input type="button" id="sprawdzenie" value="Skończone!"></div>
            <div class="blok_danych ">Po zakończeniu gry wpisz swój pseudonim:</div>

            <div class="blok_danych "><input type="text" placeholder="Pseudonim" name="pseudonim" id="pseudonim" disabled></div>

            <div class="blok_danych "><div class="col-sm-12"><button id="button" disabled>Wyślij swój wynik</button></div></div>

</form>
@endsection

@section('dodaj_js')
<div id="pokaz_mgle"></div>
   <script src="js/walidacja.js"></script>
   <script src="js/sudoku.js"></script>
@stop
   

