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
<div class="blok_danych"><p><b> SNAKE </b></p></div>
			<div class="blok_danych"><div id="snake_div"></div></div>
@endsection
@section('tresc_boczna')
<div class="blok_danych"><p><b> Jak dużo owoców zdołasz zjeść? </b></p></div>
			<div class="blok_danych ">Sterowanie:</div>
			<div class="blok_danych ">WASD</div>
			<div class="blok_danych ">Liczba punktów:</div>
            <form action="{{route('sendscore')}}" method="POST"> 
            @csrf
			<div class="blok_danych "><input type="text" id="liczba_punktów_snake" name="wynik" value="0" readonly>
            <input type="hidden" name="nazwa_gry" value="snake" readonly></div>
            <div class="blok_danych ">Po zakończeniu gry wpisz swój pseudonim:</div>
            <div class="blok_danych "><input type="text" placeholder="Pseudonim" name="pseudonim" id="pseudonim" disabled></div>
            <div class="blok_danych "><div class="col-sm-12"><button id="button" disabled>Wyślij swój wynik</button></div></div>
</form>
            @endsection

@section('dodaj_js')
<div id="pokaz_mgle"></div>
   <script src="js/walidacja.js"></script>
   <script src="js/snake.js"></script>
@stop
   

