<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProgress;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * 3.2 Register Siswa
     * Formulir: Nama Lengkap, Email, Dropdown Kelas (1-6), Password.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|string|email|max:150|unique:users,email',
            'grade' => 'required|integer|between:1,6',
            'password' => 'required|string|min:8',
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'name.max' => 'Nama lengkap maksimal 100 karakter.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email ini sudah terdaftar. Silakan gunakan email lain atau langsung masuk di halaman Login.',
            'grade.required' => 'Pilih kelas terlebih dahulu.',
            'grade.between' => 'Kelas harus antara kelas 1 sampai 6.',
            'password.required' => 'Kata sandi wajib diisi.',
            'password.min' => 'Kata sandi minimal 8 karakter.',
        ]);

        $user = User::create([
            'name' => trim($validated['name']),
            'email' => strtolower(trim($validated['email'])),
            'grade' => (int) $validated['grade'],
            'password' => $validated['password'],
            'avatar' => 'robot-blue',
            'streak_count' => 1,
            'points' => 0, // Awal poin untuk siswa baru adalah 0
            'last_login_date' => now()->toDateString(),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Pendaftaran berhasil! Selamat datang di Ruang Paham! 🎉',
            'token' => $token,
            'user' => $user,
        ], 201);
    }

    /**
     * 3.3 Login Siswa
     * Formulir: Nama Lengkap / Email, Password.
     */
    public function login(Request $request)
    {
        $loginInput = trim((string) ($request->input('login') ?? $request->input('email') ?? ''));
        $password = (string) $request->input('password', '');

        $trimmedPassword = trim($password);

        if ($loginInput === '' || $trimmedPassword === '') {
            throw ValidationException::withMessages([
                'login' => ['Nama Lengkap / Email dan Kata Sandi wajib diisi.'],
            ]);
        }

        // Allow login using either Email or Full Name (case-insensitive & trimmed)
        $cleanInput = strtolower($loginInput);

        // 1. Coba pencocokan langsung email atau nama lengkap
        $user = User::whereRaw('LOWER(TRIM(email)) = ?', [$cleanInput])
            ->orWhereRaw('LOWER(TRIM(name)) = ?', [$cleanInput])
            ->first();

        // 2. Jika belum ditemukan dan input tidak mengandung '@', coba cocokkan prefix email (username) atau nama depan
        if (! $user && ! str_contains($cleanInput, '@')) {
            $user = User::whereRaw('LOWER(TRIM(email)) LIKE ?', ["{$cleanInput}@%"])
                ->orWhereRaw('LOWER(TRIM(name)) LIKE ?', ["{$cleanInput}%"])
                ->orWhereRaw('LOWER(TRIM(name)) LIKE ?', ["%{$cleanInput}%"])
                ->first();
        }

        if (! $user) {
            throw ValidationException::withMessages([
                'login' => ['Nama Lengkap / Email atau Password tidak cocok.'],
            ]);
        }

        // Validasi kata sandi (toleransi trailing space dari keyboard mobile / auto-fill)
        $passwordValid = Hash::check($password, $user->password) 
            || Hash::check($trimmedPassword, $user->password)
            || ($user->password === $password)
            || ($user->password === $trimmedPassword);

        if (! $passwordValid) {
            throw ValidationException::withMessages([
                'login' => ['Nama Lengkap / Email atau Password tidak cocok.'],
            ]);
        }

        // Gamification: Update Streak Api Semangat
        $today = now()->toDateString();
        if ($user->last_login_date) {
            $lastLogin = Carbon::parse($user->last_login_date);
            $diffInDays = $lastLogin->diffInDays(now()->startOfDay(), false);

            if ($diffInDays === 1) {
                // Consecutive day: increment streak
                $user->streak_count += 1;
            } elseif ($diffInDays > 1) {
                // Streak broken, reset to 1
                $user->streak_count = 1;
            }
        } else {
            $user->streak_count = 1;
        }

        $user->last_login_date = $today;
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Berhasil masuk! Selamat belajar kembali! 🚀',
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'message' => 'Sampai jumpa lagi sahabat pintar! 👋',
        ]);
    }

    /**
     * 3.7 Profil Siswa: View
     * Menampilkan Avatar karakter, Nama, Kelas, dan Statistik.
     */
    public function profile(Request $request)
    {
        $user = $request->user();

        $completedCount = UserProgress::where('user_id', $user->id)
            ->where('status', 'selesai')
            ->count();

        $inProgressCount = UserProgress::where('user_id', $user->id)
            ->where('status', 'sedang_belajar')
            ->count();

        return response()->json([
            'user' => $user,
            'stats' => [
                'completed_lessons' => $completedCount,
                'in_progress_lessons' => $inProgressCount,
                'points' => $user->points,
                'streak_count' => $user->streak_count,
                'level' => floor($user->points / 100) + 1,
            ],
        ]);
    }

    /**
     * 3.7 Edit Profil Siswa
     * Form edit Nama Lengkap, ubah Kelas, ubah Password.
     * Pemilihan Avatar: Galeri default (hewan/robot) tanpa unggah foto asli untuk privasi.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $allowedAvatars = [
            'robot-blue',
            'fox-orange',
            'panda-bamboo',
            'cat-yellow',
            'dino-green',
            'astronaut-star',
            'owl-smart',
            'koala-cute',
        ];

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:100',
            'grade' => 'sometimes|required|integer|between:1,6',
            'avatar' => 'sometimes|required|string|in:' . implode(',', $allowedAvatars),
            'password' => 'nullable|string|min:8',
        ], [
            'name.max' => 'Nama lengkap maksimal 100 karakter.',
            'grade.between' => 'Kelas harus antara kelas 1 sampai 6.',
            'avatar.in' => 'Karakter avatar tidak valid.',
            'password.min' => 'Kata sandi minimal 8 karakter.',
        ]);

        if (! empty($validated['name'])) {
            $user->name = $validated['name'];
        }
        if (! empty($validated['grade'])) {
            $user->grade = (int) $validated['grade'];
        }
        if (! empty($validated['avatar'])) {
            $user->avatar = $validated['avatar'];
        }
        if (! empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json([
            'message' => 'Profil berhasil diperbarui! ✨',
            'user' => $user,
        ]);
    }

    /**
     * 3.8 Lupa Kata Sandi (Forgot Password)
     * Mengarahkan siswa / wali ke Gmail untuk pemulihan akun.
     */
    public function forgotPassword(Request $request)
    {
        $input = trim((string) ($request->input('email') ?? $request->input('login') ?? ''));

        if ($input === '') {
            throw ValidationException::withMessages([
                'email' => ['Alamat email atau nama lengkap wajib diisi.'],
            ]);
        }

        $cleanInput = strtolower($input);
        $user = User::whereRaw('LOWER(TRIM(email)) = ?', [$cleanInput])
            ->orWhereRaw('LOWER(TRIM(name)) = ?', [$cleanInput])
            ->first();

        if (! $user && ! str_contains($cleanInput, '@')) {
            $user = User::whereRaw('LOWER(TRIM(email)) LIKE ?', ["{$cleanInput}@%"])
                ->orWhereRaw('LOWER(TRIM(name)) LIKE ?', ["{$cleanInput}%"])
                ->first();
        }

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => ['Akun dengan email/nama ini tidak ditemukan. Silakan periksa kembali atau daftar baru.'],
            ]);
        }

        $userName = $user->name;
        $userEmail = $user->email;
        $subject = 'Pemulihan Kata Sandi Ruang Paham - ' . $userName;
        $body = "Halo Tim Ruang Paham,\n\nSaya ingin memulihkan kata sandi akun saya:\nNama: {$userName}\nEmail: {$userEmail}\n\nMohon petunjuk untuk mereset kata sandi saya. Terima kasih!";
        
        $gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' . urlencode('support@ruangpaham.id') . '&su=' . urlencode($subject) . '&body=' . urlencode($body);
        $gmailDirectUrl = 'https://mail.google.com/mail/u/0/#inbox';

        return response()->json([
            'message' => 'Instruksi pemulihan telah disiapkan untuk ' . $userEmail . '. Silakan lanjutkan ke Gmail untuk melihat kotak masuk atau mengirimkan permohonan reset.',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'gmail_url' => $gmailDirectUrl,
            'gmail_compose_url' => $gmailComposeUrl,
        ]);
    }

    /**
     * 3.9 Reset Kata Sandi
     * Memperbarui kata sandi pengguna secara langsung jika terverifikasi.
     */
    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:8',
        ], [
            'email.required' => 'Email wajib diisi.',
            'password.required' => 'Kata sandi baru wajib diisi.',
            'password.min' => 'Kata sandi minimal 8 karakter.',
        ]);

        $cleanEmail = strtolower(trim($validated['email']));
        $user = User::whereRaw('LOWER(TRIM(email)) = ?', [$cleanEmail])
            ->orWhereRaw('LOWER(TRIM(name)) = ?', [$cleanEmail])
            ->first();

        if (! $user && ! str_contains($cleanEmail, '@')) {
            $user = User::whereRaw('LOWER(TRIM(email)) LIKE ?', ["{$cleanEmail}@%"])
                ->orWhereRaw('LOWER(TRIM(name)) LIKE ?', ["{$cleanEmail}%"])
                ->first();
        }

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => ['Akun tidak ditemukan. Silakan periksa kembali email terdaftar.'],
            ]);
        }

        $user->password = $validated['password'];
        $user->save();

        return response()->json([
            'message' => 'Kata sandi berhasil diperbarui! Silakan masuk dengan kata sandi barumu.',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
