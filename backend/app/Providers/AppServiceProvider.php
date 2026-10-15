<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Safe deployment safeguard: automatically seed subjects, lessons, and quizzes
        // if and only if the database is unseeded (subjects count is 0).
        // This ensures deployment succeeds without requiring manual terminal access,
        // and is 100% safe, non-destructive, and will not run if data already exists.
        static $checked = false;
        if (!$checked) {
            $checked = true;
            try {
                if (!\Illuminate\Support\Facades\Schema::hasTable('users')) {
                    \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
                }
                if (\Illuminate\Support\Facades\Schema::hasTable('subjects')) {
                    if (\App\Models\Subject::count() === 0) {
                        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
                    }
                }
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning('Safe auto-seed skipped: ' . $e->getMessage());
            }
        }
    }

}
