<?php

namespace App\Models;

use Database\Factories\EducationLevelFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $name
 * @property string|null $slug
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Field> $fields
 * @property-read Collection<int, Subject> $subjects
 */
#[Fillable(['name', 'slug', 'description'])]
class EducationLevel extends Model
{
    /** @use HasFactory<EducationLevelFactory> */
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
     * @return HasMany<Field, $this>
     */
    public function fields(): HasMany
    {
        return $this->hasMany(Field::class);
    }

    /**
     * @return HasManyThrough<Subject, Field, $this>
     */
    public function subjects(): HasManyThrough
    {
        return $this->hasManyThrough(Subject::class, Field::class);
    }
}
