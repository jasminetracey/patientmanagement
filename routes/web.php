<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'show'])
        ->name('profile');

    Route::put('/profile/update', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile/destroy', [ProfileController::class, 'destroy'])
        ->name('profile.delete');

    Route::put('/password/change', [PasswordController::class, 'update'])
        ->name('password.change');

    Route::post('/appointment', [AppointmentController::class, 'store'])
        ->name('appointment.store');

    Route::put('/appointment/{appointment}/cancel', [AppointmentController::class, 'cancel'])
        ->name('appointment.cancel');

    Route::put('/appointment/{appointment}/approve', [AppointmentController::class, 'approve'])
        ->name('appointment.approve');

    Route::put('/appointment/{appointment}/decline', [AppointmentController::class, 'decline'])
        ->name('appointment.decline');
});



require __DIR__ . '/auth.php';
