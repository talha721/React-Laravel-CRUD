<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Traits\ResponseTraits;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Validator;


class ForgotPasswordController extends Controller
{
    use ResponseTraits;
   function submitForgetPasswordForm(Request $request){


       $validator = Validator::make($request->all(), [
           'email' => 'required|email|exists:users',
        ]);
       if($validator->fails()){
           return $this->sendError('Validation Error.', $validator->errors());
       }
       $token = Str::random(64);
       DB::table('password_resets')->insert([
           'email' => $request->email,
           'token' => $token,
           'created_at' => Carbon::now()
       ]);

       Mail::send('email.forgetPassword', ['token' => $token], function($message) use($request){
           $message->to($request->email);
           $message->subject('Reset Password');
       });

       $success['token'] = $token;
       $success['email'] = $request->email;
       return $this->sendResponse($success,'We have e-mailed your password reset link!');

   }

    public function showResetPasswordForm($token) {
        return view('forgetPasswordLink', ['token' => $token]);
    }

    public function submitResetPasswordForm(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $updatePassword = DB::table('password_resets')
            ->where([
                'email' => $request->email,
                'token' => $request->token
            ])
            ->first();

        if(!$updatePassword){
            return $this->sendError('Invalid token!', 'Invalid token!');
        }
        $user = User::where('email', $request->email)
            ->update(['password' => Hash::make($request->password)]);
        DB::table('password_resets')->where(['email'=> $request->email])->delete();
        $success['email'] = $request->email;
        return $this->sendResponse($success,'Your password has been changed!');
    }
}
