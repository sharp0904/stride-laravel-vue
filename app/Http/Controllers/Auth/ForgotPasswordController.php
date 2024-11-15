<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Notifications\ForgotPasswordResetLink;

class ForgotPasswordController extends Controller
{

    public function showForgotPasswordForm()
    {
        return Inertia::render('Auth/ForgotPassword.vue');
    }

    public function requestPasswordResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
        ]);
        $user = User::whereEmail($request->email)->first();
        $token = Str::random(64);

        DB::table('password_resets')->insert([
            'email' => $request->email, 
            'token' => $token, 
            'created_at' => Carbon::now()
        ]);

        $user->notify(new ForgotPasswordResetLink($token));
        flash('We have e-mailed your password reset link!', 'success');
        return back();
    }
}
