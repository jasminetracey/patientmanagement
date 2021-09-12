<?php

namespace App\Mail;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UpdateAppointment extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;
    public $role;
    public $status;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Appointment $appointment, $role, $status)
    {
        $this->appointment = $appointment;
        $this->role = $role;
        $this->status = $status;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.appointments.update')
            ->subject("Appointment Update");
    }
}
