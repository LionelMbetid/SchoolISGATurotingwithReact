<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Classe;
use App\Models\Session;


class Subject extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function classe(){
        return $this->belongsTo(Classe::class);
    }
    public function students(){
        return $this->belongsTo(Student::class,'tutor_subject');
    }
    public function sessions(){
        return $this->hasMany(Session::class);
    }
}
