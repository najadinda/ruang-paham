<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\QuizController;
use App\Http\Controllers\Api\SubjectController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web & API Routes Terpadu - Ruang Paham
|--------------------------------------------------------------------------
| Semua rute (Auth, RESTful API, dan Frontend SPA) disatukan di web.php
|--------------------------------------------------------------------------
*/

// ==========================================
// 1. RUTE AUTENTIKASI (PUBLIC)
// ==========================================
Route::post('/login', [AuthController::class, 'login']);
Route::post('/api/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/api/register', [AuthController::class, 'register']);

Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/api/forgot-password', [AuthController::class, 'forgotPassword']);

Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/api/reset-password', [AuthController::class, 'resetPassword']);

// ==========================================
// 2. RUTE MATA PELAJARAN & MATERI (PUBLIC)
// ==========================================
Route::get('/subjects', [SubjectController::class, 'index']);
Route::get('/api/subjects', [SubjectController::class, 'index']);

Route::get('/subjects/{id}', [SubjectController::class, 'show']);
Route::get('/api/subjects/{id}', [SubjectController::class, 'show']);

Route::get('/lessons/{id}', [LessonController::class, 'show']);
Route::get('/api/lessons/{id}', [LessonController::class, 'show']);

Route::get('/lessons/{id}/quiz', [QuizController::class, 'getByLesson']);
Route::get('/api/lessons/{id}/quiz', [QuizController::class, 'getByLesson']);

// ==========================================
// 3. RUTE DILINDUNGI (SANCTUM PROTECTED)
// ==========================================
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/api/logout', [AuthController::class, 'logout']);

    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/api/profile', [AuthController::class, 'profile']);

    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::put('/api/profile', [AuthController::class, 'updateProfile']);

    Route::get('/dashboard/data', [DashboardController::class, 'index']);
    Route::get('/api/dashboard', [DashboardController::class, 'index']);
    Route::get('/activities', [DashboardController::class, 'index']);
    Route::get('/api/activities', [DashboardController::class, 'index']);

    Route::post('/lessons/{id}/quiz/submit', [QuizController::class, 'submitQuiz']);
    Route::post('/api/lessons/{id}/quiz/submit', [QuizController::class, 'submitQuiz']);
});

// ==========================================
// 4. FRONTEND SPA CATCH-ALL ROUTE
// Menjalankan frontend React langsung dari Laravel
// ==========================================
Route::fallback(function () {
    if (request()->is('api/*')) {
        return response()->json([
            'message' => 'Endpoint API tidak ditemukan.',
        ], 404);
    }
    $indexPath = public_path('index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath, [
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ]);
    }
    return view('welcome');
});
