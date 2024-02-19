<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Subject;

class Classe extends Model
{
    use HasFactory;

    public function subjects(){
        return $this->hasMany(Subject::class);
    }
}
