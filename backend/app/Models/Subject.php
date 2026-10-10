<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'grade',
        'icon',
        'theme_color',
        'description',
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('chapter_number', 'asc');
    }
}
