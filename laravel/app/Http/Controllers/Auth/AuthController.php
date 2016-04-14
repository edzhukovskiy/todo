<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        return response()->json([
            'status'=>Auth::attempt(request()->all())
        ]);
    }
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function authorize()
    {
        return response()->json([
            'authorized'=>Auth::check()
        ]);
    }
}
