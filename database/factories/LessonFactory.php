<?php

namespace Database\Factories;

use App\Models\Lesson;
use App\Models\Material;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->word();

        return [
            'material_id' => Material::factory(),
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => fake()->sentence(),
            'content' => fake()->paragraphs(3, true),
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}
