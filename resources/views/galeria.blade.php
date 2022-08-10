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
<div class="blok_danych"><p><b> Galeria gier </b></p></div>
			
			<div class="blok_danych ">
				<div class="gal"><img src="img/g_1_1.jpg">
				</div>
				<div class="gal"><img src="img/g_1_2.jpg">
				</div>
				<div class="gal"><img src="img/g_1_3.jpg">
				</div>
				<div style="clear:both">
				</div>
			</div>
			
			<div class="blok_danych ">
				<div class="gal"><img src="img/g_2_1.jpg">
				</div>
				<div class="gal"><img src="img/g_2_2.jpg">
				</div>
				<div class="gal"><img src="img/g_2_3.jpg">
				</div>
				<div style="clear:both">
				</div>
			</div>
			
			<div class="blok_danych ">
				<div class="gal"><img src="img/g_3_1.png">
				</div>
				<div class="gal"><img src="img/g_3_2.jpg">
				</div>
				<div class="gal"><img src="img/g_3_3.jpg">
				</div>
				<div style="clear:both">
				</div>
			</div>
@endsection
@section('tresc_boczna')
<div class="blok_danych ">Galeria zdjęć przedstawia różne wizje tych samych gier.</div>
			<div class="blok_danych ">Od góry snake, saper oraz sudoku.</div>
@endsection


   

