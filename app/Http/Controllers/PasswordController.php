<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;

class PasswordController extends Controller
{
    public function update(Request $request)
    {
        $input = $request->all();
        $user = auth()->user();

        Validator::make($input, [
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', Rules\Password::defaults(), 'confirmed'],
        ])->after(function ($validator) use ($user, $input) {
            if (!isset($input['current_password']) || !Hash::check($input['current_password'], $user->password)) {
                $validator
                    ->errors()
                    ->add('current_password', __('The provided password does not match your current password.'));
            }
        })->validate();

        $user->forceFill([
            'password' => Hash::make($input['password']),
        ])->save();

        return Redirect::back()->with('success', 'Password updated.');
    }
}
