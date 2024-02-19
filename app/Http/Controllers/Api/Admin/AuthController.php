<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\Admin;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

        //remember to fix
        if (!$token = auth('api2')->claims(['role' => 'admin'])->attempt($credentials)){
            return response()->json([
                'status' => 'error',
                'message' => 'login or password invalid',
            ], 401);
        }
        $user = auth('api2')->user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'role' => 'admin',
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
    }
    public function logout(Request $request)
    {
        //auth('api2')->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ],200);
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
    public function show(Admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
