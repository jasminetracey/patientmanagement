<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PasswordUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_can_be_updated()
    {
        $patient = User::factory()->create();

        $this->actingAs($patient);

        $this->put(route('password.change'), [
            'current_password' => 'password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $this->assertTrue(Hash::check('new-password', $patient->fresh()->password));
    }

    public function test_current_password_must_be_correct()
    {
        $patient = User::factory()->create();

        $this->actingAs($patient);

        $response = $this->put(route('password.change'), [
            'current_password' => 'wrong-password',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response->assertSessionHasErrors();

        $this->assertTrue(Hash::check('password', $patient->fresh()->password));
    }

    public function test_new_passwords_must_match()
    {
        $patient = User::factory()->create();

        $this->actingAs($patient);

        $response = $this->put(route('password.change'), [
            'current_password' => 'password',
            'password' => 'new-password',
            'password_confirmation' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors();

        $this->assertTrue(Hash::check('password', $patient->fresh()->password));
    }
}
