<?php

namespace Database\Factories;

use App\Models\Concept;
use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Concept>
 */
class ConceptFactory extends Factory
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
            'lesson_id' => Lesson::factory(),
            'name' => ucfirst($name),
            'slug' => Str::slug($name),
            'description' => fake()->sentence(),
            'content' => fake()->paragraphs(2, true),
            'order' => fake()->numberBetween(1, 10),
        ];
    }
}
