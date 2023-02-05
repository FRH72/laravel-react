<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        
        $data = $request->validate();
        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password']),
        ]);

        $token = $user -> createToken('main') -> plainTextToken;

        return response(compact('user','token'));
    }

    public function login(LoginRequest $request){

        $credentials = $request -> validate();
        if(Auth::attampt($credentials)) {
            return response([
                'meesage'=>'Provided Email or Password is incorrect'
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
        
    }

    public function logout(Request $request){

        $user = $request -> user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
