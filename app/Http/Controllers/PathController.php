<?php

namespace App\Http\Controllers;
use App\Models\Page;
use App\Models\Ankieta;
use App\Models\Score;

use Illuminate\Http\Request;

class PathController extends Controller
{
    //wybieranie scieżki wg danych z bazy strona_o_grach/pages
    public function path ($slug) {
        $page = Page::findOrFail($slug);
       
        switch($slug){
            case('ankieta'):
                $ankieta = Ankieta::all()->sortByDesc("telefon");
                return view($slug,compact('page','ankieta'));
            break;
            case('ranking'):
                $snake = Score::where('nazwa_gry', 'snake')
                ->orderByDesc('wynik')
                ->get();

                $saper = Score::where('nazwa_gry', 'saper')
                ->orderBy('wynik')
                ->get();
                
                $sudoku = Score::where('nazwa_gry', 'sudoku')
                ->orderBy('wynik')
                ->get();
                return view($slug,compact('page','snake','saper','sudoku'));
            break;
        }
        return view($slug,compact('page'));
    }
    //jezeli sciezka jest pusta wysiwetl index
    public function go_to_index () {
        $page = Page::findOrFail('index');
        return view('index',compact('page'));
    }
}
