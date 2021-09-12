<?php

namespace App\Mail;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewAppointment extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;
    public $role;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Appointment $appointment, $role)
    {
        $this->appointment = $appointment;
        $this->role = $role;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.appointments.new');
    }
}
