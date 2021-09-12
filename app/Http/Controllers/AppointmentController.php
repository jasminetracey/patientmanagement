<?php

namespace App\Http\Controllers;

use App\Mail\NewAppointment;
use App\Mail\UpdateAppointment;
use App\Models\Appointment;
use App\Models\Enums\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|after:today|date',
            'doctor_id' => 'required|exists:users,id',
        ]);

        $appointment = Appointment::create(
            $request->only('date', 'doctor_id')
        );

        Mail::to($appointment->patient->email)
            ->send(new NewAppointment($appointment, Roles::PATIENT));
        Mail::to($appointment->doctor->email)
            ->send(new NewAppointment($appointment, Roles::DOCTOR));

        return redirect()->back()->with('success', 'Appointment successfully created.');
    }

    public function cancel(Appointment $appointment)
    {
        $appointment->update(['status' => 'cancelled']);

        Mail::to($appointment->patient->email)
            ->send(new UpdateAppointment($appointment, Roles::PATIENT, 'cancelled'));
        Mail::to($appointment->doctor->email)
            ->send(new UpdateAppointment($appointment, Roles::DOCTOR, 'cancelled'));

        return redirect()->back()->with('success', 'Appointment successfully cancelled.');
    }

    public function approve(Appointment $appointment)
    {
        $appointment->update(['status' => 'confirmed']);

        Mail::to($appointment->patient->email)
            ->send(new UpdateAppointment($appointment, Roles::PATIENT, 'confirmed'));
        Mail::to($appointment->doctor->email)
            ->send(new UpdateAppointment($appointment, Roles::DOCTOR, 'confirmed'));

        return redirect()->back()->with('success', 'Appointment successfully approved.');

    }

    public function decline(Appointment $appointment)
    {
        $appointment->update(['status' => 'declined']);

        Mail::to($appointment->patient->email)
            ->send(new UpdateAppointment($appointment, Roles::PATIENT, 'declined'));
        Mail::to($appointment->doctor->email)
            ->send(new UpdateAppointment($appointment, Roles::DOCTOR, 'declined'));

        return redirect()->back()->with('success', 'Appointment successfully declined.');
    }
}
