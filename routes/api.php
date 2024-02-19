<?php

use App\Http\Controllers\Api\Admin\AuthController as AdminAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\AuthController as AuthAdminController;
use App\Http\Controllers\Api\ClasseController;
use App\Http\Controllers\Api\SessionController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\SubjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:api')->group(function () {
    Route::any('/user',function(Request $request){return $request->user();});
    Route::prefix('subject')->group(function(){
        Route::any('/index',[SubjectController::class,'index'])->name('subject.index');
        Route::get('/getSubjects',[SubjectController::class,'indexWithoutPagination'])->name('subject.listsubjects');
        Route::get('/deleteSubjectTutor/{idUser}/{idSubject}',[SubjectController::class,'deleteSubjectTutor'])->name('subject.deleteSubjectTutor');
        Route::get('/getAllSubjects/{idUser}/{keyword?}',[SubjectController::class,'getAllSubjects'])->name('subject.allsubjects');
    });
    Route::prefix('tutor')->group(function(){
        Route::get('/getAllTutors/{idUser}/{keyword?}/{idSubject?}',[StudentController::class, 'getAllTutors'])->name('tutor.getAllTutors');
        Route::any('/showAllTutors',[StudentController::class,'showAllTutors'])->name('tutor.showAllTutors');
        Route::get('/findByNameEmail/{name}/{perpage}',[StudentController::class,'findByNameEmail'])->name('tutor.findByNameEmail');
        Route::get('/findBySubject/{name}/{perpage}',[StudentController::class,'findBySubject'])->name('tutor.findBySubject');
        Route::get('getSubjectsOfTutor/{idStudent}',[StudentController::class,'getSubjectsOfTutor'])->name('tutor.getSubjectsOfTutor');
        Route::get('getSubjectsNotOfTutor/{idStudent}',[StudentController::class,'getSubjectsNotOfTutor'])->name('tutor.getSubjectsNotOfTutor');
        Route::post('addSubjectToUser',[StudentController::class,'addSubjectToUser'])->name('tutor.addSubjectToUser');

    });
    Route::prefix('session')->group(function(){
        Route::post('/createSession',[SessionController::class,'createSession'])->name('session.createSession');
        Route::get('/getSessionsForMe/{idUser}/{keyword?}',[SessionController::class,'getSessionsForMe'])->name('session.getSessionsForMe');
        Route::get('/getPublicSessions/{idUser}/{keyword?}',[SessionController::class,'getPublicSessions'])->name('session.getPublicSessions');
        Route::get('/getMySessions/{idUser}/{keyword?}',[SessionController::class,'getMySessions'])->name('session.getMySessions');
        Route::get('/getSessionInfos/{idUser}',[SessionController::class,'getSessionInfos'])->name('session.getSessionInfos');
        Route::get('/joinSession/{idUser}/{idSession}',[SessionController::class,'joinSession'])->name('session.joinSession');
    })
    ;
    Route::prefix('student')->group(function(){
        Route::post('/getAllUsersNotMeNotSubjectSelected',[StudentController::class,'getAllUsersNotMeNotSubjectSelected'])->name('student.getAllUsersNotMeNotSubjectSelected');
    });
});
Route::prefix('admin')->middleware('auth:api2')->group(function () {
    Route::any('/user',function(Request $request){return $request->user();});
    Route::post('/logout',[AuthAdminController::class,'logout'])->name('logout.admin');
    Route::prefix('subject')->group(function(){
        Route::any('/list',[SubjectController::class,'index'])->name('subject.getAllSubjects');
        Route::any('/delete/{id}',[SubjectController::class,'delete'])->name('subject.deleteSubject');
        Route::any('/create',[SubjectController::class,'store'])->name('subject.createSubject');
        Route::any('/edit',[SubjectController::class,'edit'])->name('subject.editSubject');
        Route::any('/listbyKeyword',[SubjectController::class,'listbyKeyword'])->name('subject.listbyKeyword');
    });
    Route::prefix('student')->group(function(){
        Route::any('/list',[StudentController::class,'getAllStudents'])->name('student.getAllStudents');
        Route::post('/editStatus',[StudentController::class,'editStudentStatus'])->name('student.editStudentStatus');
        Route::post('/listbyKeyword',[StudentController::class,'getAllStudentsbyKeyword'])->name('student.getAllStudentsbyKeyword');
    });
    Route::prefix('classe')->group(function(){
        Route::any('/list',[ClasseController::class,'index'])->name('class.index');
    });
});

// Route::post('/login',function(Request $request){
// $credentiels = $request->only(['email','password']);
// if(!$token = auth('api')->attempt($credentiels)){
//     abort(401,'Unauthorized');
// }
// return response()->json([
//    'data'=> [
//     'token'=>$token,
//     'token_type'=>'bearer'
//    ]
// ]);
// });
Route::post('/signup',[AuthController::class,'signup'])->name('signup.student');
Route::post('/login',[AuthController::class,'login'])->name('login.student');
Route::post('/logout',[AuthController::class,'logout'])->name('logout.student');
//for Admin
Route::prefix('admin')->group(function(){
    Route::post('/login',[AdminAuthController::class,'login'])->name('login.admin');
});


