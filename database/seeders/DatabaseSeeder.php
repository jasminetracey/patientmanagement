<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        if (app()->isLocal()) {
            $this->call([
                PMSeeder::class,
                TestingSeeder::class
            ]);
        } else {
            $this->call([
                PMSeeder::class
            ]);
        }
    }
}
