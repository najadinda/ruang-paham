<?php

namespace App\Models;

use Database\Factories\MaterialFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $subject_id
 * @property string $name
 * @property string|null $slug
 * @property string|null $description
 * @property int $order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Subject $subject
 * @property-read Collection<int, Lesson> $lessons
 * @property-read Collection<int, Concept> $concepts
 */
#[Fillable(['subject_id', 'name', 'slug', 'description', 'order'])]
class Material extends Model
{
    /** @use HasFactory<MaterialFactory> */
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
     * @return BelongsTo<Subject, $this>
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * @return HasMany<Lesson, $this>
     */
    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    /**
     * @return HasManyThrough<Concept, Lesson, $this>
     */
    public function concepts(): HasManyThrough
    {
        return $this->hasManyThrough(Concept::class, Lesson::class);
    }
}
