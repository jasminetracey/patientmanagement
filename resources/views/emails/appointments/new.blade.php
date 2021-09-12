@component('mail::message')
# New Appointment

@if ($role == 'patient')
Your appointment for {{ \Carbon\Carbon::parse($appointment->date)->format('F d, Y h:i a') }} with doctor {{ $appointment->doctor->name }} has been placed.
@endif

@if ($role == 'doctor')
A new appointment has been made for {{ \Carbon\Carbon::parse($appointment->date)->format('F d, Y h:i a') }} please review.
@endif

Thanks,<br>
{{ config('app.name') }}
@endcomponent
