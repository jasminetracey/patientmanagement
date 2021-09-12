<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        if (auth()->user()->isDoctor()) {
            return Inertia::render('DoctorDashboard/Index', [
                'appointments' => Appointment::with(['doctor', 'patient'])
                    ->orderBy('date', 'desc')
                    ->get()
            ]);
        } else {
            return Inertia::render('PatientDashboard/Index', [
                'doctors' => User::whereDoctor()->get(),
                'appointments' => Appointment::with('doctor')
                    ->where('patient_id', auth()->id())
                    ->orderBy('date', 'desc')
                    ->get()
            ]);
        }
    }
}
