<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SessionCreateRequest;
use App\Models\Session;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\Cast\Object_;

use function PHPUnit\Framework\isEmpty;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getSessionsForMe($idUser, $keyword = "")
    {
        $student = Student::where('students.id', $idUser)->first();

        $sessions = Session::whereHas('students', function ($query) use ($student) {
            $query->where('students.id', $student->id);
        })->where('title', 'LIKE', $keyword . '%')->with(['student', 'students', 'subjectSession'])->paginate(10);

        return response()->json([
            'status' => true,
            'data' => $sessions
        ]);
    }
    public function getPublicSessions($idUser)
    {
        $currentUserId = Student::where('students.id', $idUser)->first()->id;

        $sessions = Session::where('student_id','<>',$idUser)->whereDoesntHave('students', function ($query) use ($currentUserId) {
            $query->where('students.id', $currentUserId);
        })
            ->withCount('students')
            ->with(['student','subjectSession'])
            ->get();
        $publicSessions = [];
        foreach($sessions as $session){
            if($session->student_count<$session->nbrStudents){
                array_push($publicSessions,$session);
            }
        }
        return response()->json([
            'status' => true,
            'data' => $publicSessions
        ]);
    }
    public function getSessionInfos($sessionId)
    {
        $sessionItem = Session::where('id', $sessionId)->with(['students','subjectSession','student'])->first();
        return response()->json([
            'status' => true,
            'data' => $sessionItem
        ]);
    }
    public function joinSession($userId,$sessionId){
       //dd($userId,$sessionId);
       $session = Session::where('sessions.id',$sessionId)->first();
       $session->students()->attach([$userId]);
       $session->save();
       return response()->json([
        "status"=>true,
        "message"=>"tu as entrer dans cette session"
       ]);
    }
    public function getMySessions($idUser,$keyword="")
    {
        $sessionsUser = Session::where('student_id', $idUser)->where('title','LIKE',$keyword.'%')->with(['subjectSession','student'])->paginate(10);
        return response()->json([
            'status' => true,
            'data' => $sessionsUser
        ]);
    }



    public function createSession(SessionCreateRequest $request)
    {
        //dd($request);
        $data = $request->validated();
        //checkIsTutorTeachSubject($data['student_id'],$data['subject_id'],$data['studentsList']);

        if (!$this->checkIsTutorTeachSubject($data['student_id'], $data['subject_id'])) {
            return response()->json([
                "status" => "error",
                "message" => "cette etudiant il peut pas enseigner cette matiére"
            ], 404);
        } else {
            $resultsameSubject = $this->checkIsStudentTeachSameSubject($data['student_id'], $data['subject_id'], $data['studentsList']);
            if (is_int($resultsameSubject)) {
                $student = Student::where('students.id', $resultsameSubject)->first();
                return response()->json([
                    "status" => "error",
                    "message" => "etudiant avec l'id" . $student->id . "et le nom" . $student->name . "can't profit from this course because he is already teach this subject"
                ], 404);
            }
        }

        $session = Session::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'dateBegin' => $data['dateBegin'],
            'timeBegin' => $data['timeBegin'],
            'place' => $data['place'],
            'status' => $data['status'],
            'nbrStudents' => $data['nbrStudents'],
            'sessionType' => $data['sessionType'],
            'student_id' => $data['student_id'],
            'subject_id' => $data['subject_id'],
        ]);
        $session->students()->attach($data['studentsList']);
        $session->save();

        return response()->json([
            'status' => true,
            'data' => $session
        ], 200);
    }

    public function checkIsTutorTeachSubject($studentid, $subjectTeach)
    {
        $student = Student::whereHas('subjects', function ($query) use ($subjectTeach) {
            $query->where('subjects.id', $subjectTeach);
        })->where('id', $studentid)->get();
        return $student;
    }


    public function checkIsStudentTeachSameSubject($studentid, $subjectTeach, $studentsList)
    {
        $studentswithSubjects = Student::whereIn('students.id', $studentsList)->whereHas('subjects')->with('subjects')->get();
        foreach ($studentswithSubjects as $student) {
            foreach ($student->subjects as $subject) {
                if ($subjectTeach === $subject->id) {
                    return $student->id;
                }
            }
        }
        return false;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Session $session)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Session $session)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Session $session)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Session $session)
    {
        //
    }
}
