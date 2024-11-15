<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\UserPlan;
use Stripe\StripeClient;
use Stripe\PaymentIntent;
use Illuminate\Support\Str;
use Stripe\Stripe as StripeGateway;
use Illuminate\Support\Facades\Auth;

class StripeController extends Controller
{
    public function showStripeForm(Request $request)
    {
        return Inertia::render('Auth/Stripe', [
            'id' => $request['id']
        ]);
    }

    public function initiatePayment(Request $request)
    {    
        $stripeSecurityKey = env('STRIPE_SECURITY_KEY');
        StripeGateway::setApiKey($stripeSecurityKey);
        
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount * 100, // Multiply as & when required
                'currency' => $request->currency,
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);
            // Save the $paymentIntent->id to identify this payment later
        } catch (Exception $e) {
            // throw error
        }

        return [
            'token' => (string) Str::uuid(),
            'client_secret' => $paymentIntent->client_secret,
            'payment_intent_id' => $paymentIntent->id
        ];
    }

    public function completePayment(Request $request)
    {
        $stripeSecurityKey = env('STRIPE_SECURITY_KEY');
        $stripe = new StripeClient($stripeSecurityKey);

        // Use the payment intent ID stored when initiating payment
        $paymentDetail = $stripe->paymentIntents->retrieve($request['PAYMENT_INTENT_ID']);
                
        if ($paymentDetail->status != 'succeeded') {
            return false;
            
            // throw error
        } else {
            UserPlan::create($request['form']);
            return response()->json([
                'message' => 'Your trial account was created!'
              ]);
        }

        
    }

    public function failPayment(Request $request)
    {
        // Log the failed payment if you wish
    }
}
