<style>
body{background-color:#888;}
th {
                border: 2px solid black;
                padding: 4px;
            }
            td {
                border: 1px solid black;
                padding: 4px;
            }
			input[type='checkbox']{
				margin:auto;
				display: block;
				cursor: pointer;
			}
			.disable{
				pointer-events:none;
				background-color: #bbb;
			}
</style>
@if($errors->any())
   <div class="alert alert-danger">
    <ul>
        @foreach($errors->all() as $error)
                <li>{{$error}}</li>
        @endforeach
    </ul>
   </div>

@endif
<div class="formularz">
<form action="/test" method="POST">
    @csrf

                  <div class="form-group row">
                     <label for="inputEmail3" class="col-sm-5 col-form-label">Pseudonim</label>
                     <div class="col-sm-7">
                        <input type="text" class="form-control" id="pseudonim" name="pseudonim" placeholder="Pseudonim" required>
                     </div>
                  </div>
                  <div class="form-group row">
                     <label for="inputPassword3" class="col-sm-5 col-form-label">Telefon</label>
                     <div class="col-sm-7">
                        <input type="tel" class="form-control" id="telefon" name="telefon" placeholder="Telefon" pattern="[0-9]{9}" required>
                     </div>
                  </div>
				  <div class="blok_danych"></div>
                  <fieldset class="form-group ">
                     <div class="row align-items-center">
                        <legend class="col-form-label col-sm-5 pt-0">Ulubiona gra:</legend>
                        <div class="col-sm-7">
                           <div class="form-check">
                              <input class="form-check-input" type="radio" name="ulubiona_gra" id="gridRadios1" value="Snake"  required>
                              <label class="form-check-label" for="gridRadios1">
                              Snake
                              </label>
                           </div>
                           <div class="form-check">
                              <input class="form-check-input" type="radio" name="ulubiona_gra" id="gridRadios2" value="Saper">
                              <label class="form-check-label" for="gridRadios2">
                              Saper
                              </label>
                           </div>
                           <div class="form-check">
                              <input class="form-check-input" type="radio" name="ulubiona_gra" id="gridRadios3" value="Sudoku" >
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
                           <input class="zainteresowania form-check-input" type="checkbox" id="gridCheck1" name="gridCheck1" value="Gry">
                           <label class="form-check-label" for="gridCheck1">
                           Gry
                           </label>
                        </div>
						 <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" id="gridCheck2" name="gridCheck2" value="Muzyka">
                           <label class="form-check-label" for="gridCheck2">
                           Muzyka
                           </label>
                        </div>
						 <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" id="gridCheck3" name="gridCheck3" value="Książki">
                           <label class="form-check-label" for="gridCheck3">
                           Książki
                           </label>
                        </div>
						 <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" id="gridCheck4" name="gridCheck4" value="Programowanie">
                           <label class="form-check-label" for="gridCheck4">
                           Programowanie
                           </label>
                        </div>
						 <div class="form-check">
                           <input class="zainteresowania form-check-input" type="checkbox" id="gridCheck5" name="gridCheck5" value="Inne">
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
						  <option value="Nieistotne">Nieistotne</option>
						  <option value="Pełnoletni">Pełnoletni</option>
						  <option value="Niepełnoletni">Niepełnoletni</option>
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
               </form>
</div> 
<div class="tabele">
<!-- linijka z form-->
<table>
    <thead>
<tr>
<th>Pseudonim</th>
    <th>Telefon</th>
    <th>Ulubiona gra</th>
    <th>Zainteresowania</th>
    <th>Wiek</th>
    <th>edytuj</th>
    <th>usuń</th>
</tr> </thead>
@foreach($ankieta as $an)

<tr id="{{$an->id}}">

    <td id='pseudonim{{$an->id}}'>{{$an->pseudonim}}</td>
    <td id='telefon{{$an->id}}'>{{$an->telefon}}</td>
    <td id='ulubiona_gra{{$an->id}}'>{{$an->ulubiona_gra}}</td>
    <td id='zainteresowania{{$an->id}}'>{{$an->zainteresowania}}</td>
    <td id='wiek{{$an->id}}'>{{$an->wiek}}</td>
    <td id='edycja{{$an->id}}'>
      <form action="{{route('siusiak2').'/'.$an->id}}" method="POST" id='my_form'>
         @csrf
         <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path></svg>
         </button>
         </form>
      </td>
    <td>usuń</td>
   
</tr>

@endforeach
</table>
</div>
<script src="js/walidacja.js"></script>
<script type="text/javascript" src="js/ankieta_nowa.js">
	  </script>   
