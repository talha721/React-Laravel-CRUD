<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\Http\Traits;

class UserController extends Controller
{
    use Traits\ResponseTraits;
    public function show()
    {

        $data = User::where('role', '!=', 'admin')->get();
        if (count($data) > 0) {
            return $this->sendResponse($data, 'Data Found!');
        } else {
            return $this->sendError('No User found', ['error' => 'No data Found!']);
        }
    }


    public function store(Request $request)
    {

        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'email' => 'unique:users|required|email',
            'password' => 'required',
            'role' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!" , $validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'designation' => $request->designation,
        ]);
        return $this->sendResponse($user, 'User created!');
    }

    public function update(Request $request)
    {

        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->id,
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!" , $validator->errors());
        }
        $user = User::where('id', $request->id);
        if ($request->password) {
            $user->update(['password' => Hash::make($request->password)]);
        }
        if ($request->role) {
            $user->update(['role' => $request->role]);
        }
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'designation' => $request->designation,
        ]);

        return $this->sendResponse($user, 'User updated!');
    }

    public function delete(Request $request)
    {
        $user = User::where('id', $request->id)->first();
        if($user){
            $user->tokens()->where('tokenable_id', $request->id)->delete();

        }
        else{
            return $this->sendError('User Not Found', ['error' => 'User not found']);
        }
        $data = User::where('id', $request->id)->delete();
        if ($data == 1) {
            return $this->sendResponse("User Found", 'User Deleted!');

        } else {
            return $this->sendError('User Not Found', ['error' => 'User not found']);

        }
    }





}
