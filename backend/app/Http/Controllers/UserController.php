<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Validator;
use App\Http\Resources\UserResources;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(UserRequest $request){
        $request -> validated($request->all);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);
        $userResource = UserResources::make($user);

        return response()->json([
            'data' => $userResource,
            'message' => 'User registered successfully',
        ]);
    }

    public function login(LoginRequest $request){
        $request->validated($request->all);
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $data = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'token' => $data,
            'message' => 'User login successfully',
        ]);
    }

    public function getme(Request $request){
        $user = $request->user();
        return response()->json([
            'data' => $user,
        ]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'User logout successfully',
        ]);
    }
}
