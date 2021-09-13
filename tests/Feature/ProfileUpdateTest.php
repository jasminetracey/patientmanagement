<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_information_can_be_updated()
    {
        $patient = User::factory()->create();

        $this->actingAs($patient);

        $this->put(route('profile.update'), [
            'name' => 'Test Name',
            'email' => 'test@example.com',
            'dob' => '01/01/2000',
            'address' => '123 Abc Street',
            'phone_number' => '8761234567',
            'next_of_kin_name' => 'Jane Doe',
            'next_of_kin_relationship' => 'Mother',
            'next_of_kin_phone_number' => '876-123-4567',
        ]);

        $this->assertEquals('Test Name', $patient->fresh()->name);
        $this->assertEquals('test@example.com', $patient->fresh()->email);
        $this->assertEquals('01/01/2000', $patient->fresh()->dob);
        $this->assertEquals('123 Abc Street', $patient->fresh()->address);
        $this->assertEquals('8761234567', $patient->fresh()->phone_number);
        $this->assertEquals('Jane Doe', $patient->fresh()->next_of_kin_name);
        $this->assertEquals('Mother', $patient->fresh()->next_of_kin_relationship);
        $this->assertEquals('876-123-4567', $patient->fresh()->next_of_kin_phone_number);
    }
}
