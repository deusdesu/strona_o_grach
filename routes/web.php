<?php

use Illuminate\Support\Facades\Route;

use App\Models\Ankieta;
use Illuminate\Http\Request;
use App\Http\Controllers\PathController;
use App\Http\Controllers\ShowTestController;
use App\Http\Controllers\ScoreController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::post('/wyslij_ankiete', [ShowTestController::class, 'send'])->name('wyslij_ankiete');

Route::post('/edycja', [ShowTestController::class, 'send_to_edit'])->name('Form_edycja');
Route::post('/edycja/{id}', [ShowTestController::class, 'send_to_edit']);

Route::post('/delete', [ShowTestController::class, 'delete'])->name('delete');
Route::post('/delete/{id}', [ShowTestController::class, 'delete']);

Route::post('/dodaj_wynik', [ScoreController::class, 'sendScore'])->name('sendscore');


Route::get('/', [PathController::class, 'go_to_index']);
Route::get('/{slug}', [PathController::class, 'path']);