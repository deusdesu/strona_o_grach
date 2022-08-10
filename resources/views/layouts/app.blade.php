<!DOCTYPE ...>
<head>
   <meta charset="utf-8">
   <title> @yield('tytul')</title>
   <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <!-- <script src="JS/index.js"></script> -->
    <link rel="stylesheet" href="{{ asset('css/tresc_glowna.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('css/menu_gora.css') }}" type="text/css" />
    @yield('walidacja')	
    @yield('css_specjalny')
   <link href="https://fonts.googleapis.com/css?family=Lato:400,900&amp;subset=latin-ext" rel="stylesheet">
</head>
<body>
   <div id="kontener">
	<div id="sticky">
			<div class="menu_gora" ><a href="index" >Strona główna</a></div>
			<div class="menu_gora" ><a href="snake">Snake </a></div>
			<div class="menu_gora" ><a href="saper">Saper</a></div>
			<div class="menu_gora" ><a href="sudoku" >Sudoku</a></div>
			<div class="menu_gora" ><a href="ranking">Ranking</a></div>
			<div class="menu_gora" ><a href="galeria" >Galeria</a></div>
			<div class="menu_gora" ><a href="ankieta">Ankieta</a></div>
	</div>
	<div id="main">
		<div id="tresc_glowna">
            @yield('tresc_glowna')			
		</div>
		<div id="tresc_boczna">
            @yield('tresc_boczna')	
		</div>
		<div id="stopka" >Maciej Rak projekt "strona o grach" </div>
	</div>
   </div>
   @yield('dodaj_js')

</body>
</html>
