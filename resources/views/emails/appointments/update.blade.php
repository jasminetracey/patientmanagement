@component('mail::message')
# Appointment Update

@if ($role == 'patient')
Your appointment for {{ \Carbon\Carbon::parse($appointment->date)->format('F d, Y h:i a') }} with doctor {{ $appointment->doctor->name }} has been {{ $status }}.
@endif

@if ($role == 'doctor')
Appointment with {{ $appointment->patient->name }} on {{ \Carbon\Carbon::parse($appointment->date)->format('F d, Y h:i a') }} has been {{ $status }}.
@endif

Thanks,<br>
{{ config('app.name') }}
@endcomponent
