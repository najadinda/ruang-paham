<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Subject::truncate();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $subjects = [
            [
                'id' => 1,
                'name' => 'IPAS (Sains & Sosial)',
                'slug' => 'ipas',
                'grade' => null,
                'icon' => 'Atom',
                'theme_color' => '#3B82F6',
                'description' => 'Ayo jelajahi panca indra, daur hidup hewan, wujud benda, fotosintesis, tata surya, dan sejarah sosial nusantara!',
            ],
            [
                'id' => 2,
                'name' => 'Matematika (Numerasi & Logika)',
                'slug' => 'matematika',
                'grade' => null,
                'icon' => 'Calculator',
                'theme_color' => '#10B981',
                'description' => 'Belajar berhitung seru, bilangan cacah, perkalian bersusun, pecahan senilai, geometri, dan logika angka!',
            ],
            [
                'id' => 3,
                'name' => 'Bahasa Indonesia (Literasi & Sastra)',
                'slug' => 'bahasa-indonesia',
                'grade' => null,
                'icon' => 'BookOpen',
                'theme_color' => '#F59E0B',
                'description' => 'Membaca dongeng fabel, kalimat santun, ide pokok paragraf, puisi anak, pantun nasehat, dan teks eksplanasi.',
            ],
            [
                'id' => 4,
                'name' => 'Pendidikan Pancasila / PKn',
                'slug' => 'pancasila',
                'grade' => null,
                'icon' => 'ShieldCheck',
                'theme_color' => '#EF4444',
                'description' => 'Makna simbol Garuda Pancasila, aturan di rumah & sekolah, hak dan kewajiban anak, serta persatuan NKRI.',
            ],
            [
                'id' => 5,
                'name' => 'Bahasa Inggris (English for Kids)',
                'slug' => 'bahasa-inggris',
                'grade' => null,
                'icon' => 'Languages',
                'theme_color' => '#06B6D4',
                'description' => 'Learn alphabet, cheerful colors, animals, telling time, prepositions, professions, and daily conversations!',
            ],
            [
                'id' => 6,
                'name' => 'SBdP (Seni Budaya & Prakarya)',
                'slug' => 'sbdp',
                'grade' => null,
                'icon' => 'Palette',
                'theme_color' => '#EC4899',
                'description' => 'Berekspresi lewat warna primer, karya kolase bahan alam, origami kreatif, tempo musik, dan komik bergambar.',
            ],
            [
                'id' => 7,
                'name' => 'PJOK (Pendidikan Jasmani & Kesehatan)',
                'slug' => 'pjok',
                'grade' => null,
                'icon' => 'HeartPulse',
                'theme_color' => '#8B5CF6',
                'description' => 'Gerak lokomotor ceria, senam irama, permainan bola, senam lantai, dan budaya hidup bersih sehat.',
            ],
            [
                'id' => 8,
                'name' => 'Pendidikan Agama & Budi Pekerti',
                'slug' => 'pendidikan-agama',
                'grade' => null,
                'icon' => 'Sparkles',
                'theme_color' => '#14B8A6',
                'description' => 'Mengenal keagungan Tuhan, doa harian, adab sopan santun kepada orang tua & guru, serta kisah teladan mulia.',
            ],
        ];

        foreach ($subjects as $subject) {
            Subject::updateOrCreate(['id' => $subject['id']], $subject);
        }
    }
}
