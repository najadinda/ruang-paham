<?php

namespace App\Models;

use Database\Factories\LessonFactory;
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
 * @property int $material_id
 * @property string $name
 * @property string|null $slug
 * @property string|null $description
 * @property string|null $content
 * @property int $order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Material $material
 * @property-read Collection<int, Concept> $concepts
 */
#[Fillable(['material_id', 'name', 'slug', 'description', 'content', 'order'])]
class Lesson extends Model
{
    /** @use HasFactory<LessonFactory> */
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
     * @return BelongsTo<Material, $this>
     */
    public function material(): BelongsTo
    {
        return $this->belongsTo(Material::class);
    }

    /**
     * @return HasMany<Concept, $this>
     */
    public function concepts(): HasMany
    {
        return $this->hasMany(Concept::class)->orderBy('order');
    }
}
