<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProgress;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SubjectSeeder::class,
            LessonSeeder::class,
            QuizSeeder::class,
        ]);

        // Pengguna dikosongkan agar pengguna dapat mendaftar akun baru dari awal
    }
}
