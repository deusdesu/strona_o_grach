<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Score;
class ScoreController extends Controller
{
    public function sendScore(Request $request) {
//funkcja używana przez snake'a, sapera i sudoku do 
//tworzenia rankingów danych gier

        //walidacja
        $request->validate([
            'pseudonim'=>'required',
            'wynik'=>'required',
            'nazwa_gry'=>'required',
        ]);
        //tworzenie rekordu w tabeli
        Score::create($request->all());
        //idz do rankingu
        return redirect('/ranking');
    }
}
