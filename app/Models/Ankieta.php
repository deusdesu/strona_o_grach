<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ankieta extends Model
{
    use HasFactory;
    protected $table = 'ankiety';

    protected $fillable = ['pseudonim','telefon','ulubiona_gra','zainteresowania','wiek'];
}
