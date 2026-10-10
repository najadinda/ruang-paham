<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Quiz;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * 3.6 Ambil daftar soal kuis untuk materi
     */
    public function getByLesson($lessonId)
    {
        $lesson = Lesson::findOrFail($lessonId);
        $quizzes = $lesson->quizzes()->get();

        return response()->json([
            'lesson_id' => $lesson->id,
            'lesson_title' => $lesson->title,
            'total_questions' => $quizzes->count(),
            'quizzes' => $quizzes->map(function ($q, $index) {
                return [
                    'id' => $q->id,
                    'number' => $index + 1,
                    'question' => $q->question,
                    'options' => [
                        ['key' => 'A', 'text' => $q->option_a],
                        ['key' => 'B', 'text' => $q->option_b],
                        ['key' => 'C', 'text' => $q->option_c],
                        ['key' => 'D', 'text' => $q->option_d],
                    ],
                    'correct_option' => $q->correct_option,
                    'explanation' => $q->explanation,
                    'points' => $q->points,
                ];
            }),
        ]);
    }

    /**
     * 3.6 Submit seluruh kuis & perbarui progress siswa ke 'selesai'
     */
    public function submitQuiz(Request $request, $lessonId)
    {
        $request->validate([
            'answers' => 'required|array', // key: quiz_id, value: option key ('A', 'B', 'C', 'D')
        ]);

        $lesson = Lesson::findOrFail($lessonId);
        $quizzes = $lesson->quizzes()->get();
        $answers = $request->input('answers');

        $totalQuestions = $quizzes->count();
        $correctCount = 0;
        $totalEarnedPoints = 0;
        $results = [];

        foreach ($quizzes as $quiz) {
            $userAns = strtoupper(trim($answers[$quiz->id] ?? ''));
            $isCorrect = ($userAns === strtoupper($quiz->correct_option));

            if ($isCorrect) {
                $correctCount++;
                $totalEarnedPoints += $quiz->points;
            }

            $results[] = [
                'quiz_id' => $quiz->id,
                'user_answer' => $userAns,
                'correct_answer' => $quiz->correct_option,
                'is_correct' => $isCorrect,
                'explanation' => $quiz->explanation,
            ];
        }

        $finalScore = $totalQuestions > 0 ? round(($correctCount / $totalQuestions) * 100) : 0;

        $user = $request->user();
        if ($user) {
            // Update User Progress
            $progress = UserProgress::firstOrNew([
                'user_id' => $user->id,
                'lesson_id' => $lesson->id,
            ]);

            $progress->status = 'selesai';
            $progress->score = $finalScore;
            $progress->completed_at = now();
            $progress->save();

            // Reward points
            $user->points += $totalEarnedPoints;
            $user->save();
        }

        return response()->json([
            'message' => 'Hebat! Kuis telah selesai diselesaikan! 🌟',
            'score' => $finalScore,
            'correct_count' => $correctCount,
            'total_questions' => $totalQuestions,
            'points_earned' => $totalEarnedPoints,
            'total_user_points' => $user ? $user->points : null,
            'results' => $results,
        ]);
    }
}
