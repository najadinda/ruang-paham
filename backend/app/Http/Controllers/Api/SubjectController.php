<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * 3.5 Jelajahi: Grid Mata Pelajaran dengan Filter Kelas (1 - 6)
     */
    public function index(Request $request)
    {
        $grade = $request->query('grade');
        $user = $request->user('sanctum');

        $subjects = Subject::query()
            ->withCount(['lessons' => function ($query) use ($grade) {
                if ($grade) {
                    $query->where('grade', $grade);
                }
            }])
            ->get();

        return response()->json([
            'grade_filter' => $grade ? (int) $grade : 'all',
            'subjects' => $subjects,
        ]);
    }

    /**
     * 3.5 Alur: Saat card diklik, diarahkan ke daftar urutan materi/bab (Lesson List).
     */
    public function show(Request $request, $id)
    {
        $grade = $request->query('grade');
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

        $subject = Subject::findOrFail($id);

        $lessonsQuery = $subject->lessons();
        if ($grade) {
            $lessonsQuery->where('grade', $grade);
        }
        $lessons = $lessonsQuery->get();

        // Attach user progress status for each lesson
        $userProgressMap = [];
        if ($user) {
            $userProgressMap = UserProgress::where('user_id', $user->id)
                ->whereIn('lesson_id', $lessons->pluck('id'))
                ->pluck('status', 'lesson_id')
                ->toArray();
        }

        $lessonsWithStatus = $lessons->map(function ($lesson) use ($userProgressMap) {
            $status = $userProgressMap[$lesson->id] ?? 'belum_mulai';
            return [
                'id' => $lesson->id,
                'chapter_number' => $lesson->chapter_number,
                'title' => $lesson->title,
                'slug' => $lesson->slug,
                'summary' => $lesson->summary,
                'grade' => $lesson->grade,
                'duration_minutes' => $lesson->duration_minutes,
                'image_url' => $lesson->image_url,
                'status' => $status, // 'belum_mulai', 'sedang_belajar', 'selesai'
            ];
        });

        return response()->json([
            'subject' => $subject,
            'lessons' => $lessonsWithStatus,
        ]);
    }
}
