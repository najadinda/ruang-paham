<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add columns to users table
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedTinyInteger('grade')->default(1)->after('email');
            $table->string('avatar')->default('robot-blue')->after('grade');
            $table->unsignedInteger('streak_count')->default(1)->after('avatar');
            $table->unsignedInteger('points')->default(0)->after('streak_count');
            $table->date('last_login_date')->nullable()->after('points');
        });

        // Subjects table
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->unsignedTinyInteger('grade')->nullable(); // nullable if subject applies to multiple grades
            $table->string('icon'); // Lucide icon identifier or image URL
            $table->string('theme_color')->default('#3B82F6');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Lessons table
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('grade')->default(1);
            $table->unsignedInteger('chapter_number')->default(1);
            $table->string('title');
            $table->string('slug');
            $table->string('summary')->nullable();
            $table->json('content_chunks'); // Chunked text for kids (max 3-4 lines each) + highlights
            $table->string('image_url')->nullable();
            $table->string('video_url')->nullable();
            $table->unsignedInteger('duration_minutes')->default(10);
            $table->timestamps();
        });

        // Quizzes table
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->text('question');
            $table->string('option_a');
            $table->string('option_b');
            $table->string('option_c');
            $table->string('option_d');
            $table->char('correct_option', 1); // 'A', 'B', 'C', 'D'
            $table->text('explanation'); // Kid-friendly encouraging explanation
            $table->unsignedInteger('points')->default(10);
            $table->timestamps();
        });

        // User Progress table (tracking user_id and lesson_id with status)
        Schema::create('user_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['belum_mulai', 'sedang_belajar', 'selesai'])->default('belum_mulai');
            $table->unsignedInteger('score')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'lesson_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_progress');
        Schema::dropIfExists('quizzes');
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('subjects');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['grade', 'avatar', 'streak_count', 'points', 'last_login_date']);
        });
    }
};
