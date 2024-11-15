<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserPlan;
use App\Models\UserTransaction;
use Carbon\Carbon;

class DailyCheckController extends Controller
{
    
    public function checkExpiredUsers()
    {
        // get the users who are expired today

        // iterate users and make the payment and update user_plan table(change the start_date, expired_date, type) and make 
        // the new record into user_transaction table.

        $users = User::all();
        
        foreach($users as $user) {
            $user_id = $user->id;
            $userPlan = UserPlan::where('user_id', $user_id)->first();
            
            if($userPlan) {
                $expired_date = $userPlan->expired_date;
                $current_date = Carbon::now();
                $new_date = $current_date->addMonth();

                if($expired_date == $current_date) {

                    $userPlan->update([
                        'expired_date' => $new_date,
                        'type' => 1
                    ]);

                    $userTransaction = UserTransaction::create([
                        'user_id' => $user_id,
                        'amount' => 19.99,
                        'transaction_date' => $current_date
                    ]);
                }
            }

        }


    }
}
