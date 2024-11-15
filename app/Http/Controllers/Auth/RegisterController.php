<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class RegisterController extends Controller
{

    public function showRegisterForm()
    {
        return Inertia::render('Auth/Register');
    }

     /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function register(Request $request)
    {
        $user = $request->validate([
            'first_name' => ['required'],
            'last_name' => ['required'],
            'phone' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $emails = User::select('email')->get();
        foreach ($emails as $email) {
            if($email->email == $user['email']) {
                return back()->withErrors([
                    'email' => 'You are already registered.',
                ])->onlyInput('email');
            }
        }
        $request['register_date'] = now();
        $user = User::create($request->all());
        $user_id = $user->id;
        $user->assignRole(2);

        // return redirect()->route('stripe.show', [
        //     'id' => $user_id
        // ]);

        return redirect()->intended('login');
        
    }

}
