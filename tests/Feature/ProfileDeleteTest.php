<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProfileDeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_accounts_can_be_deleted()
    {
        $patient = User::factory()->create();

        $this->actingAs($patient);

        $this->delete(route('profile.delete'));

        $this->assertNull($patient->fresh());
    }
}
