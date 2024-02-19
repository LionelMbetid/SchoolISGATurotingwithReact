<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubjectCreateRequest;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Subject::with('classe')->paginate(10);
        return response()->json([
            'status' => true,
            'data'   => $subjects
        ]);
    }
    public function indexWithoutPagination()
    {
        $subjects = Subject::all();
        return response()->json([
            'status' => true,
            'data'   => $subjects
        ]);
    }
    public function listbyKeyword(Request $request)
    {
        $keyword = $request->keyword;
        $subjects = Subject::where(function ($query) use ($keyword) {
            $query->where('title', 'LIKE', $keyword . '%');
        })->with('classe')->paginate(10);

        if (!$subjects) {
            return response()->json([
                'status' => false,
                "message" => "the subjects doesn't exist"
            ], 404);
        }
        return response()->json([
            'status' => true,
            "data" => $subjects
        ], 200);
    }

    public function deleteSubjectTutor($idUser,$idSubject){
        //dd($idUser);
        Student::find($idUser)->subjects()->wherePivot('subject_id', $idSubject)->wherePivot('student_id', $idUser)->detach();
        return response()->json([
            "message"=>"l'element a ete suprimé avec succés"
        ]);
    }

    // User Functions

    public function getAllSubjects($idUser,$keyword=""){

        $subjectsUser = Student::where('id',$idUser)->with('subjects')->first();
        $subjectIds = [];
        foreach($subjectsUser->subjects as $subject){
            array_push($subjectIds,$subject->id);
        }
        $subjects = Subject::whereNotIn('subjects.id',$subjectIds)->where('title', 'LIKE', $keyword . '%')->paginate(10);
         return response()->json([
             'status' => true,
             "data" => $subjects
         ], 200);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(SubjectCreateRequest $request)
    {
        //validate incoming request
        $data = $request->validated();

        $subject = Subject::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'classe_id' => null,
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Subject created successfully',
            'user' => $subject
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(SubjectCreateRequest $request)
    {
        $data = $request->validated();

        $subject = Subject::create(
            [
               "title"=>$data['title'],
               "description"=>$data['description'],
            ]
            );
        return response()->json([
             "status"=>true,
             "data"=>$subject
        ],200);

    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $subject = Subject::find($request->id);
        $subject->title = $request->title;
        $subject->description = $request->description;
        $subject->classe_id = $request->classe_id;
        $subject->save();
        return response()->json([
             "status"=>true,
             "data"=>$subject
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
       Subject::where('subjects.id',$id)->delete();
       return response()->json([
        "status"=>true,
        "message"=>"subject deleted Succefully"
       ],200);
    }
}
