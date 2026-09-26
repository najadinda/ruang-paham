<?php

namespace App\Models;

use Database\Factories\ConceptFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $lesson_id
 * @property string $name
 * @property string|null $slug
 * @property string|null $description
 * @property string|null $content
 * @property int $order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Lesson $lesson
 */
#[Fillable(['lesson_id', 'name', 'slug', 'description', 'content', 'order'])]
class Concept extends Model
{
    /** @use HasFactory<ConceptFactory> */
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
     * @return BelongsTo<Lesson, $this>
     */
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }
}
