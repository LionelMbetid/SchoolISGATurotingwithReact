<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function students(){
        return $this->belongsToMany(Student::class);
    }
    public function student(){
        return $this->belongsTo(Student::class);
    }
    public function subject(){
        return $this->belongsTo(Student::class);
    }
    public function subjectSession(){
        return $this->belongsTo(Subject::class,'subject_id');
    }


}
