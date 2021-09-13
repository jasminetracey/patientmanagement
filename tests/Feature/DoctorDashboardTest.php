<?php

namespace Tests\Feature;

use App\Models\Appointment;
use App\Models\Enums\Roles;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\Assert;
use Tests\TestCase;

class DoctorDashboardTest extends TestCase
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

        $this->actingAs($this->doctor);

        $this->get('/')
            ->assertStatus(200)
            ->assertInertia(function (Assert $page) {
                $page->component('DoctorDashboard/Index');
                $page->has('appointments', 5, function (Assert $page) {
                    $page->hasAll(['date', 'doctor', 'patient', 'doctor_id', 'status', 'id', 'created_at', 'updated_at', 'patient_id']);
                });
            });
    }

    public function test_can_approve_appointment()
    {
        $this->actingAs($this->patient);

        $appointment = Appointment::factory()
            ->for($this->doctor, 'doctor')
            ->create();

        $this->actingAs($this->doctor);

        $this->put(route('appointment.approve', ['appointment' => $appointment]));

        $this->assertEquals('confirmed', $appointment->fresh()->status);
    }

    public function test_can_decline_appointment()
    {
        $this->actingAs($this->patient);

        $appointment = Appointment::factory()
            ->for($this->doctor, 'doctor')
            ->create();

        $this->actingAs($this->doctor);

        $this->put(route('appointment.decline', ['appointment' => $appointment]));

        $this->assertEquals('declined', $appointment->fresh()->status);
    }
}
