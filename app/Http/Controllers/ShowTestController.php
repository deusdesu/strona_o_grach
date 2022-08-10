<?php

namespace App\Http\Controllers;
use App\Models\Ankieta;
use Illuminate\Http\Request;
use App\Models\Page;
use App\Models\Score;
class ShowTestController extends Controller
{
    public function sort_and_show() {
        $ankieta = Ankieta::all()->sortByDesc("telefon");
        return view('test',compact('ankieta'));
    }
    public function send(Request $request) {
        //dodaj element do bazy danych
        //dd($request);
        $request->validate([
            'pseudonim'=>'required',
            'telefon'=>'required',
            'ulubiona_gra'=>'required',
        ]);
        //przekształć tabele request:
        //  połączyć zainteresowania wg wzoru:
            // zainteresowanie 1
            // zainteresowanie 2
            // zainteresowanie 3
        //      na: zainteresowanie 1, zainteresowanie 2, zainteresowanie 3
        
            $tablica_zainteresowan = [];
            $i = 1;
            while($request['gridCheck'.$i] != ''){
                array_push($tablica_zainteresowan, $request['gridCheck'.$i++]);
            }
            //zamien tab na string
            $str ='';
            $i = 1;
            foreach($tablica_zainteresowan as $zainteresowanie){
                if($i++ == 1){
                    $str=$str.$zainteresowanie;
                }else{
                    $str=$str.', '.$zainteresowanie;
                }
                
            }
            if($str == ''){
                $str = 'brak';
            }
            $request['zainteresowania'] = $str;    
        //return  $request;
        //dd($request);
    
        //id z widoku
        //find
    
        Ankieta::create($request->all());
        return redirect('/ankieta');
    
    }

    public function send_to_edit($id) {
        
        $ankieta = Ankieta::findOrFail($id);
       
        return view('edycja_layout',compact('ankieta'));
    }
    public function delete($id){
        Ankieta::findOrFail($id)->delete();
        return redirect('/ankieta');
     }


        
}
