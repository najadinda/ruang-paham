<?php

namespace App\Models;

use Database\Factories\FieldFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $education_level_id
 * @property string $name
 * @property string|null $slug
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read EducationLevel $educationLevel
 * @property-read Collection<int, Subject> $subjects
 */
#[Fillable(['education_level_id', 'name', 'slug', 'description'])]
class Field extends Model
{
    /** @use HasFactory<FieldFactory> */
    use HasFactory;

    protected static function booted(): void
    {
        static::creating(function (self $model): void {
            if (empty($model->slug) && ! empty($model->name)) {
                $model->slug = Str::slug($model->name);
            }
        });
    }

    /**
     * @return BelongsTo<EducationLevel, $this>
     */
    public function educationLevel(): BelongsTo
    {
        return $this->belongsTo(EducationLevel::class);
    }

    /**
     * @return HasMany<Subject, $this>
     */
    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class);
    }
}
