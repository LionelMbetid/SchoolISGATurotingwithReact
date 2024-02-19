<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SessionCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title'=>'required',
            'description'=>'required',
            'dateBegin'=>'required',
            'timeBegin'=>'required',
            'status'=>'required',
            'sessionType'=>'required',
            'nbrStudents'=>'required',
            'place'=>'required',
            'student_id'=>'required|numeric',
            'subject_id'=>'required',
            'studentsList'=>'required'
        ];
    }
}
