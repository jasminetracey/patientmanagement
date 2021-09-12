<?php

namespace App\Http\Controllers;

use \Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function show()
    {
        return Inertia::render('Profile/Show');
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:50'],
            'email' => [
                'required', 'max:50', 'email',
                Rule::unique('users')->ignore(auth()->user()->id)
            ],
        ]);

        auth()->user()->update($validated);

        return Redirect::back()->with('success', 'Profile updated.');
    }

    public function destroy(Request $request)
    {
        $user = auth()->user();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $user->delete();

        return Inertia::location(url('/'));
    }
}
