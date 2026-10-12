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

        // 1. Learning Streak (Api Semangat) Realtime
        $streak = max(1, (int) ($user->streak_count ?: 1));

        // Hari ini dalam seminggu (Senin = 1 ... Sabtu = 6 ... Minggu = 7)
        $now = now();
        $todayIso = (int) $now->dayOfWeekIso; // 1 (Senin) .. 6 (Sabtu) .. 7 (Minggu)
        $todayIndex = $todayIso - 1; // 0 (Senin) .. 5 (Sabtu) .. 6 (Minggu)

        // Ambil hari-hari aktif belajar di minggu ini dari database
        $startOfWeek = $now->copy()->startOfWeek(); // Senin 00:00:00
        $endOfWeek = $now->copy()->endOfWeek(); // Minggu 23:59:59

        $activeDayIndices = UserProgress::where('user_id', $user->id)
            ->whereBetween('updated_at', [$startOfWeek, $endOfWeek])
            ->get()
            ->map(fn($p) => $p->updated_at->dayOfWeekIso - 1)
            ->unique()
            ->values()
            ->toArray();

        // Hari ini pengguna sedang aktif membuka dashboard/belajar, pastikan todayIndex aktif
        if (!in_array($todayIndex, $activeDayIndices)) {
            $activeDayIndices[] = $todayIndex;
        }

        $baseStreak = max(1, (int) ($user->streak_count ?: 1));

        // Jika streak berturut-turut > 1, aktifkan juga hari-hari sebelum hari ini sejumlah streak
        for ($i = 0; $i < $baseStreak; $i++) {
            $targetIdx = $todayIndex - $i;
            if ($targetIdx >= 0 && !in_array($targetIdx, $activeDayIndices)) {
                $activeDayIndices[] = $targetIdx;
            }
        }

        // Hitung berapa hari beruntun api aktif menyala sampai hari ini secara realtime
        $consecutiveActive = 0;
        for ($idx = $todayIndex; $idx >= 0; $idx--) {
            if (in_array($idx, $activeDayIndices)) {
                $consecutiveActive++;
            } else {
                break;
            }
        }
        $streak = max($consecutiveActive, $baseStreak, 1);

        if ((int) $user->streak_count !== $streak) {
            $user->streak_count = $streak;
            $user->save();
        }

        $dayNames = [
            ['short' => 'Sen', 'letter' => 'S', 'name' => 'Senin'],
            ['short' => 'Sel', 'letter' => 'S', 'name' => 'Selasa'],
            ['short' => 'Rab', 'letter' => 'R', 'name' => 'Rabu'],
            ['short' => 'Kam', 'letter' => 'K', 'name' => 'Kamis'],
            ['short' => 'Jum', 'letter' => 'J', 'name' => 'Jumat'],
            ['short' => 'Sab', 'letter' => 'S', 'name' => 'Sabtu'],
            ['short' => 'Min', 'letter' => 'M', 'name' => 'Minggu'],
        ];

        $weeklyDays = [];
        foreach ($dayNames as $idx => $d) {
            $isActive = in_array($idx, $activeDayIndices);
            $isToday = ($idx === $todayIndex);
            $weeklyDays[] = [
                'index' => $idx,
                'short' => $d['short'],
                'letter' => $d['letter'],
                'name' => $d['name'],
                'is_today' => $isToday,
                'is_active' => $isActive,
            ];
        }

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

        // 3. Misi Harian (Daily Quests) Bertingkat / Adaptif Secara Realtime
        $todayStr = now()->toDateString();
        $completedToday = UserProgress::where('user_id', $user->id)
            ->where('status', 'selesai')
            ->whereDate('updated_at', $todayStr)
            ->count();

        $startedToday = UserProgress::where('user_id', $user->id)
            ->whereDate('updated_at', $todayStr)
            ->count();

        $perfectScoresToday = UserProgress::where('user_id', $user->id)
            ->where('status', 'selesai')
            ->where('score', 100)
            ->whereDate('updated_at', $todayStr)
            ->count();

        $distinctSubjectsToday = UserProgress::with('lesson')
            ->where('user_id', $user->id)
            ->whereDate('updated_at', $todayStr)
            ->get()
            ->pluck('lesson.subject_id')
            ->filter()
            ->unique()
            ->count();

        $totalUserPoints = $user->points ?? 0;

        // TIER 1: Misi Utama Harian
        $dailyQuests = [
            [
                'id' => 1,
                'tier' => 1,
                'badge' => 'Misi Harian',
                'title' => 'Selesaikan 1 Kuis Pembelajaran',
                'description' => 'Asah pikiranmu dengan menyelesaikan 1 modul kuis hari ini!',
                'current' => min($completedToday, 1),
                'target' => 1,
                'progress_text' => min($completedToday, 1) . ' / 1 Kuis',
                'reward_points' => 20,
                'completed' => $completedToday >= 1,
                'category' => 'quiz',
            ],
            [
                'id' => 2,
                'tier' => 1,
                'badge' => 'Misi Harian',
                'title' => 'Pelajari 1 Bab Materi Baru',
                'description' => 'Buka materi baru dan baca ringkasan pembelajaran.',
                'current' => min($startedToday, 1),
                'target' => 1,
                'progress_text' => min($startedToday, 1) . ' / 1 Materi',
                'reward_points' => 30,
                'completed' => $startedToday >= 1,
                'category' => 'lesson',
            ],
            [
                'id' => 3,
                'tier' => 1,
                'badge' => 'Misi Harian',
                'title' => 'Raih Total 100 Poin Belajar',
                'description' => 'Kumpulkan bintang emas dari modul dan kuis pembelajaran.',
                'current' => min($totalUserPoints, 100),
                'target' => 100,
                'progress_text' => min($totalUserPoints, 100) . ' / 100 Poin',
                'reward_points' => 50,
                'completed' => $totalUserPoints >= 100,
                'category' => 'points',
            ],
        ];

        // Cek apakah misi tier 1 sudah selesai atau ada yang selesai
        $tier1Completed = collect($dailyQuests)->every(fn($q) => $q['completed']);
        $hasAnyTier1Completed = collect($dailyQuests)->contains(fn($q) => $q['completed']);

        // TIER 2: Misi Tantangan Lanjutan (Terbuka jika misi yang ada sudah dilakukan)
        if ($tier1Completed || $hasAnyTier1Completed) {
            $tier2Quests = [
                [
                    'id' => 4,
                    'tier' => 2,
                    'badge' => 'Tantangan Ekstra',
                    'title' => 'Tantangan Hebat: Selesaikan 3 Kuis Hari Ini',
                    'description' => 'Tuntaskan total 3 kuis pembelajaran hari ini untuk membuktikan kehebatanmu!',
                    'current' => min($completedToday, 3),
                    'target' => 3,
                    'progress_text' => min($completedToday, 3) . ' / 3 Kuis',
                    'reward_points' => 35,
                    'completed' => $completedToday >= 3,
                    'category' => 'quiz',
                ],
                [
                    'id' => 5,
                    'tier' => 2,
                    'badge' => 'Tantangan Ekstra',
                    'title' => 'Master Nilai 100: Raih Skor Sempurna di Kuis',
                    'description' => 'Jawab semua kuis dengan teliti dan raih nilai 100 di salah satu kuis hari ini.',
                    'current' => min($perfectScoresToday, 1),
                    'target' => 1,
                    'progress_text' => min($perfectScoresToday, 1) . ' / 1 Nilai 100',
                    'reward_points' => 40,
                    'completed' => $perfectScoresToday >= 1,
                    'category' => 'quiz_score',
                ],
                [
                    'id' => 6,
                    'tier' => 2,
                    'badge' => 'Tantangan Ekstra',
                    'title' => 'Kolektor Bintang: Capai 200 Poin Belajar',
                    'description' => 'Kumpulkan total akumulasi 200 bintang emas dari aktivitas belajarmu.',
                    'current' => min($totalUserPoints, 200),
                    'target' => 200,
                    'progress_text' => min($totalUserPoints, 200) . ' / 200 Poin',
                    'reward_points' => 50,
                    'completed' => $totalUserPoints >= 200,
                    'category' => 'points',
                ],
                [
                    'id' => 7,
                    'tier' => 2,
                    'badge' => 'Tantangan Ekstra',
                    'title' => 'Penjelajah Mapel: Pelajari 2 Mata Pelajaran Berbeda',
                    'description' => 'Buka dan pelajari materi dari minimal 2 mata pelajaran yang berbeda hari ini.',
                    'current' => min($distinctSubjectsToday, 2),
                    'target' => 2,
                    'progress_text' => min($distinctSubjectsToday, 2) . ' / 2 Mapel',
                    'reward_points' => 45,
                    'completed' => $distinctSubjectsToday >= 2,
                    'category' => 'subject',
                ],
            ];

            foreach ($tier2Quests as $t2) {
                $dailyQuests[] = $t2;
            }

            // TIER 3: Misi Juara Super (Terbuka saat misi Tier 2 selesai)
            $tier2Completed = collect($tier2Quests)->every(fn($q) => $q['completed']);
            if ($tier2Completed) {
                $tier3Quests = [
                    [
                        'id' => 8,
                        'tier' => 3,
                        'badge' => 'Juara Super',
                        'title' => 'Super Juara: Selesaikan 5 Kuis Hari Ini',
                        'description' => 'Prestasi luar biasa! Selesaikan 5 modul kuis dalam satu hari.',
                        'current' => min($completedToday, 5),
                        'target' => 5,
                        'progress_text' => min($completedToday, 5) . ' / 5 Kuis',
                        'reward_points' => 60,
                        'completed' => $completedToday >= 5,
                        'category' => 'quiz',
                    ],
                    [
                        'id' => 9,
                        'tier' => 3,
                        'badge' => 'Juara Super',
                        'title' => 'Cendekiawan Cilik: Capai 300 Poin Belajar',
                        'description' => 'Raih total akumulasi 300 bintang emas untuk menjadi siswa teladan!',
                        'current' => min($totalUserPoints, 300),
                        'target' => 300,
                        'progress_text' => min($totalUserPoints, 300) . ' / 300 Poin',
                        'reward_points' => 80,
                        'completed' => $totalUserPoints >= 300,
                        'category' => 'points',
                    ],
                    [
                        'id' => 10,
                        'tier' => 3,
                        'badge' => 'Juara Super',
                        'title' => 'Penjelajah Tangguh: Pelajari 4 Bab Materi Hari Ini',
                        'description' => 'Buka dan pelajari 4 bab materi berbeda hari ini.',
                        'current' => min($startedToday, 4),
                        'target' => 4,
                        'progress_text' => min($startedToday, 4) . ' / 4 Materi',
                        'reward_points' => 70,
                        'completed' => $startedToday >= 4,
                        'category' => 'lesson',
                    ],
                ];

                foreach ($tier3Quests as $t3) {
                    $dailyQuests[] = $t3;
                }
            }
        }

        $completedQuestsCount = collect($dailyQuests)->filter(fn($q) => $q['completed'])->count();
        $totalQuestsCount = count($dailyQuests);

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
                $durationMinutes = 0;
                if ($p->created_at && $p->updated_at) {
                    $diffMins = max(1, (int) round($p->created_at->diffInMinutes($p->updated_at)));
                    $durationMinutes = $p->status === 'selesai' ? max(5, $diffMins) : $diffMins;
                } else {
                    $durationMinutes = $p->status === 'selesai' ? 10 : 3;
                }

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
                    'duration_minutes' => $durationMinutes,
                    'points_earned' => $p->status === 'selesai' ? ($p->score ? round($p->score / 5) * 5 : 25) : 10,
                    'completed_at' => $p->completed_at ? $p->completed_at->setTimezone('Asia/Jakarta')->format('d M Y, H:i') : null,
                    'updated_at' => $p->updated_at ? $p->updated_at->setTimezone('Asia/Jakarta')->format('d M Y, H:i') : null,
                    'raw_updated_at' => $p->updated_at ? $p->updated_at->setTimezone('Asia/Jakarta')->toIso8601String() : null,
                    'raw_created_at' => $p->created_at ? $p->created_at->setTimezone('Asia/Jakarta')->toIso8601String() : null,
                ];
            });

        // Hitung total menit belajar nyata dari akumulasi aktivitas user
        $totalStudyMinutes = $activityList->sum('duration_minutes');
        if ($totalStudyMinutes === 0 && ($totalCompleted > 0 || $totalInProgress > 0)) {
            $totalStudyMinutes = ($totalCompleted * 10) + ($totalInProgress * 5);
        }

        $learningActivities = [
            'total_completed' => $totalCompleted,
            'total_in_progress' => $totalInProgress,
            'total_points' => $user->points,
            'last_active' => $activityList->isNotEmpty()
                ? ($user->last_login_date ? $user->last_login_date->format('d M Y') : 'Hari ini')
                : null,
            'estimated_minutes' => $totalStudyMinutes,
            'total_study_minutes' => $totalStudyMinutes,
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
                'today_index' => $todayIndex,
                'today_name' => $dayNames[$todayIndex]['name'],
                'weekly_days' => $weeklyDays,
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
            'daily_quests_meta' => [
                'total_quests' => $totalQuestsCount,
                'completed_count' => $completedQuestsCount,
                'has_bonus_unlocked' => ($totalQuestsCount > 3),
                'all_completed' => ($completedQuestsCount === $totalQuestsCount),
            ],
            'stats' => [
                'total_completed_lessons' => $totalCompleted,
                'total_points' => $user->points,
                'grade' => $user->grade,
            ],
        ]);
    }
}
