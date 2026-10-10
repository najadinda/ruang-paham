<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id',
        'grade',
        'chapter_number',
        'title',
        'slug',
        'summary',
        'content_chunks',
        'image_url',
        'video_url',
        'duration_minutes',
    ];

    protected function casts(): array
    {
        return [
            'content_chunks' => 'array',
            'grade' => 'integer',
            'chapter_number' => 'integer',
            'duration_minutes' => 'integer',
        ];
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function progress()
    {
        return $this->hasMany(UserProgress::class);
    }
}
