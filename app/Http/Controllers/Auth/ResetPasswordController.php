<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ResetPasswordController extends Controller
{
    public function showResetPasswordForm(string $token)
    {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $updatePassword = DB::table('password_resets')
            ->where(['email' => $request->email, 'token' => $request->token])->first();
        
        if(!$updatePassword) {
            flash('Invalid token!', 'danger');
            return back()->withInput();
        }

        $user = User::where('email', $request->email)
            ->update(['password' => bcrypt($request->password)]);

        DB::table('password_resets')->where(['email'=> $request->email])->delete();
        flash('Your password has been changed!', 'success');
        return redirect()->route('login');
    }
}
