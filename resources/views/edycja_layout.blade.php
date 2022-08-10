<?php
//wybranie jednej ulubionej gry
if($ankieta->ulubiona_gra != ''){?>
   @section($ankieta->ulubiona_gra,'checked')
   <?php
}
?>

<?php
//wybranie zainteresowań
$zainteresowania_usera = $ankieta->zainteresowania;
$tablica_zainteresowan = [ 'Gry','Muzyka','Książki','Programowanie','Inne'];
$tablica_gridCheck = ['Gry'=>'1','Muzyka'=>'2','Książki'=>'3','Programowanie'=>'4','Inne'=>'5'];
foreach($tablica_zainteresowan as $zainteresowanie){
   $pos = strpos($zainteresowania_usera, $zainteresowanie);
   if ($pos !== false) {
      ?>
      @section('gridCheck'.$tablica_gridCheck[$zainteresowanie],'checked')
      <?php
      //echo "Zainteresowanie to: ".$zainteresowanie." ".$tablica_gridCheck[$zainteresowanie]."<br>";

   }
}
?>

<?php
// wybieranie wieku
if($ankieta->wiek != ''){?>
   @section($ankieta->wiek,'selected="selected"')
   <?php
}
?>
<style>
   .center {
  margin: auto;
  width: 50%;
  border: 3px solid black;
  padding: 10px;
}
</style>
    <link rel="stylesheet" href="{{ asset('css/tresc_glowna.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('css/menu_gora.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('css/walidacja.css') }}" type="text/css" />
<div class="center">
<div class="blok_danych"><p><b>Tu możesz edytować ankietę!</b></p></div>
            <div class="blok_danych "> 
            <form action="{{route('wyslij_ankiete').'/'.$ankieta->id}}" method="POST">@csrf

                  <div class="form-group row">
                     <label for="inputEmail3" class="col-sm-5 col-form-label">Pseudonim</label>
                     <div class="col-sm-7">
                        <input type="text" class="form-control" id="Pseudonim" placeholder="Pseudonim" name="pseudonim" value='{{$ankieta['pseudonim']}}' required>
                     </div>
                  </div>
                  <div class="form-group row">
                     <label for="inputPassword3" class="col-sm-5 col-form-label">Telefon</label>
                     <div class="col-sm-7">
                        <input type="tel" class="form-control" id="Telefon" name="telefon" placeholder="Telefon" pattern="[0-9]{9}" value='{{$ankieta['telefon']}}' required>
                     </div>
                  </div>
				  <div class="blok_danych"></div>
                  <fieldset class="form-group ">
                     <div class="row align-items-center">
                        <legend class="col-form-label col-sm-5 pt-0">Ulubiona gra:</legend>
                        <div class="col-sm-7">
                           <div class="form-check">
                              <input class="form-check-input" type="radio" name="ulubiona_gra" id="gridRadios1" value="Snake"  @yield("Snake") >
                              <label class="form-check-label" for="gridRadios1">
                              Snake
                              </label>
                           </div>
                           <div class="form-check">
                              <input class="form-check-input" type="radio" name="ulubiona_gra" id="gridRadios2" value="Saper" @yield("Saper")>
                              <label class="form-check-label" for="gridRadios2">
                              Saper
                              </label>
                           </div>
                           <div class="form-check">
                              <input class="form-check-input" type="radio" name="ulubiona_gra" id="gridRadios3" value="Sudoku" @yield("Sudoku")>
                              <label class="form-check-label" for="gridRadios3">
                              Sudoku
                              </label>
                           </div>
                        </div>
                     </div>
                  </fieldset>
                  <div class="blok_danych"></div>
                  <div class="form-group row align-items-center">
                     <div class="col-sm-5" ><span>Zainteresowania:</span></div>
                     <div class="col-sm-7">
                        <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" name="gridCheck1" value="Gry" @yield('gridCheck1')>
                           <label class="form-check-label" for="gridCheck1">
                           Gry
                           </label>
                        </div>
						 <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" name="gridCheck2" value="Muzyka" @yield('gridCheck2')>
                           <label class="form-check-label" for="gridCheck2">
                           Muzyka
                           </label>
                        </div>
						 <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" name="gridCheck3" value="Książki" @yield('gridCheck3')>
                           <label class="form-check-label" for="gridCheck3">
                           Książki
                           </label>
                        </div>
						 <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" name="gridCheck4" value="Programowanie" @yield('gridCheck4')>
                           <label class="form-check-label" for="gridCheck4">
                           Programowanie
                           </label>
                        </div>
						 <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" name="gridCheck5" value="Inne" @yield('gridCheck5')>
                           <label class="form-check-label" for="gridCheck5">
                           Inne
                           </label>
                        </div>
                     </div>

                  </div>
				  <div class="blok_danych"></div>
				  <div class="form-group">
				  <div class="form-group row">
                     <div class="col-sm-5"><label for="exampleFormControlSelect1">Wiek</label></div>
                     <div class="col-sm-7 text-center ">
                       <select class="col-sm-12 " id="wiek" name="wiek">
						  <option value="Nieistotne" @yield('Nieistotne')>Nieistotne</option>
						  <option value="Pełnoletni" @yield('Pełnoletni')>Pełnoletni</option>
						  <option value="Niepełnoletni" @yield('Niepełnoletni')>Niepełnoletni</option>
					</select>
				  </div>
					</div>
					
				  </div>
				  <div class="blok_danych"></div>
                  <div class="form-group row">
                     <div class="col-sm-12">
                        <button value="Zapisz!" id="a_zapis" >Zapisz</button>
                     </div>
                  </div>
               </form></div></div>