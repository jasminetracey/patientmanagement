<?php

namespace Tests\Feature;

use App\Models\Appointment;
use App\Models\Enums\Roles;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\Assert;

class PatientDashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->doctor = User::factory()->create([
            'role' => Roles::DOCTOR,
        ]);

        $this->patient = User::factory()->create();
    }

    public function test_can_view_appointments()
    {
        $this->actingAs($this->patient);

        Appointment::factory()
            ->for($this->doctor, 'doctor')
            ->count(5)
            ->create();

        $this->get('/')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->component('PatientDashboard/Index');
                $page->has('doctors', 1);
                $page->has('appointments', 5, function (Assert $page) {
                    $page->hasAll(['date', 'doctor', 'doctor_id', 'status', 'id', 'created_at', 'updated_at', 'patient_id']);
                });
            });
    }

    public function test_patient_can_create_appointment()
    {
        $this->actingAs($this->patient);

        $this->post(route('appointment.store'), [
            'date' => Carbon::tomorrow(),
            'doctor_id' => $this->doctor->id
        ]);

        $this->assertCount(1, $this->patient->fresh()->appointmentsPatient);
        $this->assertEquals(Carbon::tomorrow(), $this->patient->fresh()->appointmentsPatient()->latest('id')->first()->date);
    }

    public function test_patient_can_cancel_appointment()
    {
        $this->actingAs($this->patient);

        $appointment = Appointment::factory()
            ->for($this->doctor, 'doctor')
            ->create();

        $this->put(route('appointment.cancel', ['appointment' => $appointment]));

        $this->assertEquals('cancelled', $appointment->fresh()->status);
    }
}
