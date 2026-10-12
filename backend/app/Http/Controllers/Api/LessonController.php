<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    /**
     * 3.6 Modul Pembelajaran (Fase Materi)
     * Teks chunking, foto/ilustrasi, video edukasi, dan status progress
     */
    public function show(Request $request, $id)
    {
        $lesson = Lesson::with('subject')->findOrFail($id);
        $user = $request->user();
        if (!$user) {
            $user = $request->user('sanctum') ?: auth('sanctum')->user();
        }
        if (!$user && $token = $request->bearerToken()) {
            $accessToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);
            if ($accessToken) {
                $user = $accessToken->tokenable;
            }
        }

        $status = 'belum_mulai';
        if ($user) {
            $progress = UserProgress::firstOrCreate(
                ['user_id' => $user->id, 'lesson_id' => $lesson->id],
                ['status' => 'sedang_belajar']
            );

            // If it was 'belum_mulai', move to 'sedang_belajar'
            if ($progress->status === 'belum_mulai') {
                $progress->status = 'sedang_belajar';
            }

            // Realtime: perbarui updated_at detik itu juga ketika siswa benar-benar membuka materi
            $progress->touch();
            $progress->save();

            $status = $progress->status;
        }

        $quizCount = $lesson->quizzes()->count();

        return response()->json([
            'lesson' => $lesson,
            'user_status' => $status,
            'quiz_count' => $quizCount,
        ]);
    }
}
