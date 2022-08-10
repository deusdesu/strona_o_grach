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
<div class="blok_danych"><p><b> Ranking </b></p></div>
			<div class="blok_danych">
				<div class="pion"><p><b> Snake </b></p></div>
				<div class="pion"><p><b> Saper </b></p></div>
				<div class="pion"><p><b> Sudoku </b></p></div>
				<div style="clear:both;"></div>
			</div>
			<div class="blok_danych">
				<div class="pion_maly">Pseudonim</div>
				<div class="pion_maly">Wynik</div>
				<div class="pion_maly">Pseudonim</div>
				<div class="pion_maly">Wynik(m:s:ms)</div>
				<div class="pion_maly">Pseudonim</div>
				<div class="pion_maly">Wynik(m:s:ms)</div>
				<div style="clear:both;"></div>
			</div>
			<div class="blok_danych">
			<div class="pion_maly"><div id="r_snake_l">
				<!-- pokaż pseudonimy w snake-->
					@foreach ($snake as $s)
						<p>{{$s->pseudonim}}</p>
					@endforeach
			</div></div>
				<div class="pion_maly"><div id="r_snake_w">
					<!-- pokaż ich wyniki w snake-->
					@foreach ($snake as $s)
						<p><b>{{$s->wynik}}</b></p>
					@endforeach
				</div></div>
				<div class="pion_maly"><div id="r_saper_l">
				
				@foreach ($saper as $s)
						<p>{{$s->pseudonim}}</p>
					@endforeach
				</div></div>
				<div class="pion_maly"><div id="r_saper_w">
				@foreach ($saper as $s)
						<p><b>{{$s->wynik}}</b></p>
					@endforeach
				</div></div>
				<div class="pion_maly"><div id="r_sudoku_l">
				@foreach ($sudoku as $s)
						<p>{{$s->pseudonim}}</p>
					@endforeach
				</div></div>
				<div class="pion_maly"><div id="r_sudoku_w">
				@foreach ($sudoku as $s)
						<p><b>{{$s->wynik}}</b></p>
					@endforeach
				</div></div>
				<div style="clear:both;"></div>
			</div>
			
@endsection
@section('tresc_boczna')
<div class="blok_danych "><p><b>Pełne rankingi</b></p></div>
			<div class="blok_danych ">Ta strona pokazuje ranking wszystkich gier.</div>
			<div class="blok_danych ">W snake liczy się największa ilośc zjedzonych owoców.</div>
			<div class="blok_danych ">W saperze i sudoku liczy się najszybszy czas.</div>
			<div class="blok_danych ">Pseudonimy mogą się powtarzać.</div>
@endsection

@section('dodaj_js')
<!--<script type="text/javascript" src="js/ranking.js"></script>-->

@stop
   

