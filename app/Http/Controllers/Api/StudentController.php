<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Subject;
use Hamcrest\Type\IsInteger;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isInstanceOf;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllTutors($idUser, $keyword = "", $idSubject = null)
    {

        if($keyword === "!"){
          $keyword = "";
        }

        //dd($subjectIds);
        $tutors = null;
        if (!isset($idSubject)) {
            $tutors = Student::where('id', '<>', $idUser)->whereHas('subjects')->where('name', 'LIKE', $keyword . '%')->with('subjects')->paginate(10);
        } else {
            $tutors = Student::where('id', '<>', $idUser)->whereHas('subjects', function ($query) use ($idSubject) {
                $query->where('subjects.id', $idSubject);
            })->where('name', 'LIKE', $keyword . '%')->with('subjects')->paginate(10);
        }

        return response()->json([
            'status' => true,
            "data" => $tutors
        ], 200);
    }
    public function getAllStudents()
    {
        $students = Student::with('subjects')->paginate(10);
        return response()->json([
            'status' => true,
            "data" => $students
        ], 200);
    }

    public function editStudentStatus(Request $request)
    {
        $student = Student::where('students.id', $request->idUser);
        if ($request->status === "active") {
            $student->update(array('status' => "block"));
        } else {
            $student->update(array('status' => "active"));
        }

        return response()->json([
            'status' => true,
            "message" => "user state changed succefully"
        ], 200);
    }

    public function getAllStudentsbyKeyword(Request $request)
    {
        $keyword = $request->keyword;
        $students = Student::where(function ($query) use ($keyword) {
            $query->where('name', 'LIKE', $keyword . '%')
                ->orWhere('email', 'LIKE', $keyword . '%');
        })->with('subjects')->paginate(10);

        if (!$students) {
            return response()->json([
                'status' => false,
                "message" => "this user with this keyword doesn't exist"
            ], 404);
        }
        return response()->json([
            'status' => true,
            "data" => $students
        ], 200);
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
    public function findByNameEmail(String $searchTerm, int $perPage)
    {
        //$student = Student::find(auth('api')->user()->id)->subjects;
        $studentsTutors = Student::whereHas('subjects');
        $studentsListfiltered = $studentsTutors->where(function ($query) use ($searchTerm) {
            $query->where('name', 'LIKE', '%' . $searchTerm . '%')
                ->orWhere('email', 'LIKE', '%' . $searchTerm . '%');
        })->with('subjects')->paginate($perPage);
        if (!$studentsListfiltered) {
            return response()->json([
                'status' => false,
                "message" => "this user doesn't exist"
            ], 404);
        }
        return response()->json([
            'status' => true,
            "data" => $studentsListfiltered
        ], 200);
    }
    public function findBySubject(int $idSubject, int $perPage)
    {
        //$student = Student::find(auth('api')->user()->id)->subjects;
        $studentsTutors = Student::whereHas('subjects');
        $studentsListfiltered = $studentsTutors->whereHas('subjects', function ($query) use ($idSubject) {
            $query->where('subjects.id', $idSubject);
        })->with('subjects')->paginate($perPage);
        if (!$studentsListfiltered) {
            return response()->json([
                'status' => false,
                "message" => "there is no student teach this subject"
            ], 404);
        }
        return response()->json([
            'status' => true,
            "data" => $studentsListfiltered
        ], 200);
    }

    public function getSubjectsOfTutor($idStudent)
    {
        $subjects = Student::find($idStudent)->subjects;
        return response()->json(
            [
                "status" => true,
                "subjects" => $subjects
            ]
        );
    }
    public function getSubjectsNotOfTutor($idStudent)
    {
        $subjectsStudent = Student::find($idStudent)->subjects;
        $subjects = Subject::all();
        $subjectsN = [];
        foreach ($subjects as $subject) {
            $isExist = false;
            foreach ($subjectsStudent as $subjectStudent) {
                if ($subject->id === $subjectStudent->id) {
                    $isExist = true;
                }
            }
            if ($isExist === false) {
                array_push($subjectsN, $subject);
            }
        }
        return response()->json(
            [
                "status" => true,
                "subjectsNotTutor" => $subjectsN,
                "subjectsTutor" => $subjectsStudent,
            ]
        );
    }

    public function addSubjectToUser(Request $request)
    {
        $idUser = $request->idUser;
        $niveau = $request->niveau;
        $subjectId = $request->subjectId;

        $subject = Subject::where('id', $subjectId)->get();

        Student::find($idUser)->subjects()->attach($subjectId, ["niveau" => $niveau]);
        return response()->json([
            'status' => "subject added succefully"
        ], 200);
    }

    public function getAllUsersNotMeNotSubjectSelected(Request $request)
    {
        $idUser = $request->idUser;
        $idSubject = $request->idSubject;
        $text = $request->text;
        $listUsersAdded = $request->listUsersAdded;

        $listUserIds = [];

        $listUserIds = collect($listUsersAdded)->map(function (int $userId) {
            return $userId;
        })->toArray();


        $students = Student::where(function ($query) use ($idUser, $listUserIds) {
            $query->where('students.id', '<>', $idUser);
            $query->whereNotIn('students.id', $listUserIds);
        })->whereDoesntHave('subjects', function ($query) use ($idSubject) {
            $query->where('subjects.id', $idSubject);
        })->where('name', 'like', $text . '%')->get();

        return response()->json([
            "message" => $students
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }
}
