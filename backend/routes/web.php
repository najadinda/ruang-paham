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

    Route::post('/lessons/{id}/quiz/submit', [QuizController::class, 'submitQuiz']);
    Route::post('/api/lessons/{id}/quiz/submit', [QuizController::class, 'submitQuiz']);
});

// ==========================================
// 4. FRONTEND SPA CATCH-ALL ROUTE
// Menjalankan frontend React langsung dari Laravel
// ==========================================
Route::get('/{any?}', function () {
    $indexPath = public_path('index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }
    return view('welcome');
})->where('any', '^(?!api|up|sanctum).*$');
