<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Subject;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * 3.4 Dashboard Siswa & Gamifikasi
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // 1. Learning Streak (Api Semangat)
        $streak = $user->streak_count;

        // 2. Section Card Progress (Lanjutkan Belajar)
        // Find most recent progress ('sedang_belajar' first, then latest updated)
        $activeProgress = UserProgress::with(['lesson.subject'])
            ->where('user_id', $user->id)
            ->whereIn('status', ['sedang_belajar', 'selesai'])
            ->orderByRaw("FIELD(status, 'sedang_belajar', 'selesai')")
            ->orderBy('updated_at', 'desc')
            ->first();

        $hasActivity = ($activeProgress !== null);
        $recentLesson = null;

        if ($hasActivity) {
            $lesson = $activeProgress->lesson;
            $percent = $activeProgress->status === 'selesai' ? 100 : ($activeProgress->score ?? 60);

            $recentLesson = [
                'lesson_id' => $lesson->id,
                'title' => $lesson->title,
                'subject_name' => $lesson->subject->name,
                'subject_icon' => $lesson->subject->icon,
                'subject_color' => $lesson->subject->theme_color,
                'status' => $activeProgress->status,
                'progress_percent' => $percent,
                'chapter_number' => $lesson->chapter_number,
                'grade' => $lesson->grade,
            ];
        }

        // 3. Misi Harian (Daily Quests) dengan progress bar melingkar
        // Dynamic daily quests based on today's activity
        $completedToday = UserProgress::where('user_id', $user->id)
            ->where('status', 'selesai')
            ->whereDate('updated_at', now()->toDateString())
            ->count();

        $startedToday = UserProgress::where('user_id', $user->id)
            ->whereDate('updated_at', now()->toDateString())
            ->count();

        $dailyQuests = [
            [
                'id' => 1,
                'title' => 'Selesaikan 1 Kuis IPA atau Matematika',
                'description' => 'Asah pikiranmu dengan kuis seru hari ini!',
                'current' => min($completedToday, 1),
                'target' => 1,
                'reward_points' => 20,
                'completed' => $completedToday >= 1,
                'category' => 'quiz',
            ],
            [
                'id' => 2,
                'title' => 'Pelajari 1 Bab Materi Baru',
                'description' => 'Buka materi baru dan baca ringkasan ceria.',
                'current' => min($startedToday, 1),
                'target' => 1,
                'reward_points' => 30,
                'completed' => $startedToday >= 1,
                'category' => 'lesson',
            ],
            [
                'id' => 3,
                'title' => 'Raih Total 100 Poin Belajar',
                'description' => 'Kumpulkan bintang emas dari modul belajar.',
                'current' => min($user->points, 100),
                'target' => 100,
                'reward_points' => 50,
                'completed' => $user->points >= 100,
                'category' => 'points',
            ],
        ];

        // Overall stats
        $totalCompleted = UserProgress::where('user_id', $user->id)
            ->where('status', 'selesai')
            ->count();

        $totalInProgress = UserProgress::where('user_id', $user->id)
            ->where('status', 'sedang_belajar')
            ->count();

        $activityList = UserProgress::with(['lesson.subject'])
            ->where('user_id', $user->id)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'lesson_id' => $p->lesson_id,
                    'lesson_title' => $p->lesson ? $p->lesson->title : 'Materi Pembelajaran',
                    'chapter_number' => $p->lesson ? $p->lesson->chapter_number : 1,
                    'grade' => $p->lesson ? $p->lesson->grade : 3,
                    'subject_name' => $p->lesson && $p->lesson->subject ? $p->lesson->subject->name : 'Mata Pelajaran',
                    'subject_color' => $p->lesson && $p->lesson->subject ? $p->lesson->subject->theme_color : '#3B82F6',
                    'subject_icon' => $p->lesson && $p->lesson->subject ? $p->lesson->subject->icon : 'BookOpen',
                    'status' => $p->status,
                    'score' => $p->score,
                    'points_earned' => $p->status === 'selesai' ? ($p->score ? round($p->score / 5) * 5 : 25) : 10,
                    'completed_at' => $p->completed_at ? $p->completed_at->format('d M Y, H:i') : null,
                    'updated_at' => $p->updated_at ? $p->updated_at->format('d M Y, H:i') : null,
                ];
            });

        $learningActivities = [
            'total_completed' => $totalCompleted,
            'total_in_progress' => $totalInProgress,
            'total_points' => $user->points,
            'last_active' => $activityList->isNotEmpty()
                ? ($user->last_login_date ? $user->last_login_date->format('d M Y') : 'Hari ini')
                : null,
            'estimated_minutes' => ($totalCompleted * 10) + ($totalInProgress * 5),
            'items' => $activityList,
        ];

        return response()->json([
            'greeting' => 'Halo, ' . $user->name . '!',
            'student' => [
                'id' => $user->id,
                'name' => $user->name,
                'grade' => $user->grade,
                'avatar' => $user->avatar,
                'points' => $user->points,
            ],
            'streak' => [
                'count' => $streak,
                'title' => 'Api Semangat',
                'active' => true,
                'message' => 'Luar biasa! Kamu sudah ' . $streak . ' hari berturut-turut belajar di Ruang Paham!',
            ],
            'continue_learning' => [
                'has_activity' => $hasActivity,
                'data' => $recentLesson,
                'empty_state' => [
                    'message' => 'Kamu belum mulai belajar. Mulai petualangan belajarmu sekarang!',
                    'cta_text' => 'Mulai Belajar',
                ],
            ],
            'learning_activities' => $learningActivities,
            'daily_quests' => $dailyQuests,
            'stats' => [
                'total_completed_lessons' => $totalCompleted,
                'total_points' => $user->points,
                'grade' => $user->grade,
            ],
        ]);
    }
}
