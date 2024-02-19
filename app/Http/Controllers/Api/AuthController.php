<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use App\Http\Requests\SignUpRequest;
use App\Models\Student;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','signup']]);
    }
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        /*([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);*/
        $student = Student::where('students.email',$credentials['email'])->where('students.status','block')->first();
        if($student){
            return response()->json([
                'status' => 'error',
                'message' => 'this user is blocked',
            ], 404);
        }
        if (!$token = auth('api')->claims(['role' => 'student'])->attempt($credentials)){
            return response()->json([
                'status' => 'error',
                'message' => 'login or password invalid',
            ], 401);
        }
        $user = auth('api')->user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'role' => 'student',
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
    }
    public function signup(SignUpRequest $request){
        $data = $request->validated();
        /*[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:students',
            'password' => 'required|string|min:6',
        ]);
        */

        $user = Student::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'cin'=>$data['CIN'],
            'phone'=>$data['phone'],
            'address'=>$data['address'],
            'password' => bcrypt($data['password']),
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }
    public function logout(Request $request)
    {
        auth('api')->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ],204);
    }
    public function refresh()
    {
        $newToken = auth('api')->refresh();
        return response()->json([
            'status' => 'success',
            'user' => auth('api')->user(),
            'authorisation' => [
                'token' => $newToken,
                'type' => 'bearer',
            ]
        ]);
    }
}
