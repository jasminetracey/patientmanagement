<?php

namespace Database\Seeders;

use App\Models\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

class PMSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (User::where('email', 'patient@example.com')->doesntExist()) {
            User::factory()->state([
                'name' => 'Patient User',
                'email' => 'patient@example.com',
                'email_verified_at' => now(),
                'role' => Roles::PATIENT
            ])->create();
        }

        if (User::where('email', 'doctor@example.com')->doesntExist()) {
            User::factory()->state([
                'name' => 'Doctor User',
                'email' => 'doctor@example.com',
                'email_verified_at' => now(),
                'role' => Roles::DOCTOR
            ])->create();
        }

        User::factory()
            ->state([
                'role' => Roles::DOCTOR
            ])
            ->count(10)
            ->create();
    }
}
