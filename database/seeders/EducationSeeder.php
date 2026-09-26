<?php

namespace Database\Seeders;

use App\Models\EducationLevel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EducationSeeder extends Seeder
{
    public function run(): void
    {
        $levels = [
            [
                'name' => 'Mahasiswa',
                'fields' => [
                    [
                        'name' => 'Teknik Informatika',
                        'subjects' => ['Programming', 'Database', 'Web Development'],
                    ],
                    [
                        'name' => 'Ilmu Komunikasi',
                        'subjects' => ['Public Speaking', 'Digital Communication', 'Journalism'],
                    ],
                ],
            ],
            [
                'name' => 'SMA',
                'fields' => [
                    [
                        'name' => 'IPA',
                        'subjects' => ['Matematika', 'Fisika', 'Kimia'],
                    ],
                    [
                        'name' => 'IPS',
                        'subjects' => ['Ekonomi', 'Sosiologi', 'Geografi'],
                    ],
                ],
            ],
            [
                'name' => 'SMK',
                'fields' => [
                    [
                        'name' => 'Teknik',
                        'subjects' => ['Pemrograman', 'Jaringan Komputer'],
                    ],
                ],
            ],
        ];

        foreach ($levels as $levelData) {
            $level = EducationLevel::firstOrCreate(
                ['name' => $levelData['name']],
                ['slug' => Str::slug($levelData['name'])]
            );

            if (empty($level->slug)) {
                $level->update(['slug' => Str::slug($levelData['name'])]);
            }

            foreach ($levelData['fields'] as $fieldData) {
                $field = $level->fields()->firstOrCreate(
                    ['name' => $fieldData['name']],
                    ['slug' => Str::slug($fieldData['name'])]
                );

                if (empty($field->slug)) {
                    $field->update(['slug' => Str::slug($fieldData['name'])]);
                }

                foreach ($fieldData['subjects'] as $subjectName) {
                    $subject = $field->subjects()->firstOrCreate(
                        ['name' => $subjectName],
                        ['slug' => Str::slug($subjectName)]
                    );

                    if (empty($subject->slug)) {
                        $subject->update(['slug' => Str::slug($subjectName)]);
                    }
                }
            }
        }
    }
}
