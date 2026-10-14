<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Lesson::truncate();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $lessons = [
            // =========================================================================
            // 1. IPAS / IPA & IPS (SAINS & PENGETAHUAN SOSIAL) - subject_id: 1
            // =========================================================================
            [
                'id' => 1,
                'subject_id' => 1,
                'grade' => 1,
                'chapter_number' => 1,
                'title' => 'Mengenal Panca Indra Kita & Kebersihan Diri',
                'slug' => 'mengenal-panca-indra-kita',
                'summary' => 'Tubuh kita memiliki 5 indra hebat untuk melihat, mendengar, mencium, mengecap, dan meraba keindahan dunia!',
                'content_chunks' => [
                    [
                        'title' => 'Apa itu Panca Indra?',
                        'text' => "Hai sahabat kecil! Di tubuh kita ada 5 indra ajaib.\nMata untuk melihat pelangi yang indah.\nTelinga untuk mendengar kicau burung dan musik riang.",
                        'highlight' => 'Mata (Melihat) & Telinga (Mendengar)'
                    ],
                    [
                        'title' => 'Hidung dan Lidah yang Hebat',
                        'text' => "Hidung kita mencium aroma kue bolu mama yang harum.\nLidah kita mengecap manisnya madu dan segarnya buah jeruk.",
                        'highlight' => 'Hidung (Membau) & Lidah (Mengecap Rasa)'
                    ],
                    [
                        'title' => 'Kulit Lembut & Merawat Kebersihan',
                        'text' => "Kulit kita meraba halusnya bulu kelinci dan dinginnya es.\nJangan lupa mandi 2 kali sehari dan cuci tangan sebelum makan!",
                        'highlight' => 'Kulit (Meraba) & Rajin Cuci Tangan'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/g3yW7B0bZ_Y',
                'duration_minutes' => 7,
            ],
            [
                'id' => 2,
                'subject_id' => 1,
                'grade' => 1,
                'chapter_number' => 2,
                'title' => 'Membedakan Benda Hidup dan Benda Mati',
                'slug' => 'benda-hidup-dan-benda-mati',
                'summary' => 'Di sekitar kita ada benda hidup yang bisa tumbuh dan bernapas, serta benda mati yang tidak membutuhkan makanan.',
                'content_chunks' => [
                    [
                        'title' => 'Ciri Khas Makhluk Hidup',
                        'text' => "Kucing yang lincah, pohon mangga, dan adik bayi adalah makhluk hidup.\nMereka bernapas, makan, minum, dan bisa bertambah besar!",
                        'highlight' => 'Makhluk hidup butuh makan dan bisa tumbuh'
                    ],
                    [
                        'title' => 'Benda Mati di Rumah Kita',
                        'text' => "Meja belajar, pensil warna, dan bola sepak adalah benda mati.\nBenda mati tidak bisa bergerak sendiri dan tidak butuh makan.",
                        'highlight' => 'Benda mati tidak bernapas dan tidak tumbuh'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/WbHj9fM_fO0',
                'duration_minutes' => 6,
            ],
            [
                'id' => 3,
                'subject_id' => 1,
                'grade' => 2,
                'chapter_number' => 1,
                'title' => 'Silsilah Keluarga & Peran Anggota Keluarga',
                'slug' => 'silsilah-keluarga-dan-peran-anggota',
                'summary' => 'Keluarga adalah rumah penuh cinta kasih. Mengenal peran ayah, ibu, kakak, dan adik yang saling tolong-menolong.',
                'content_chunks' => [
                    [
                        'title' => 'Pohon Silsilah Keluarga',
                        'text' => "Kakek dan nenek memiliki anak, yaitu ayah dan ibu kita.\nAyah dan ibu melahirkan kita, kakak, dan adik tercinta.",
                        'highlight' => 'Kakek, Nenek, Orang Tua, dan Anak'
                    ],
                    [
                        'title' => 'Tugas & Kerjasama di Rumah',
                        'text' => "Ayah mencari nafkah, ibu mengasuh dan membimbing kita.\nAnak-anak bertugas belajar rajin dan merapikan mainan sendiri.",
                        'highlight' => 'Saling menyayangi dan membantu pekerjaan rumah'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 8,
            ],
            [
                'id' => 4,
                'subject_id' => 1,
                'grade' => 3,
                'chapter_number' => 1,
                'title' => 'Siklus Daur Hidup Kupu-Kupu (Metamorfosis)',
                'slug' => 'siklus-daur-hidup-kupu-kupu',
                'summary' => 'Dari telur mungil di atas daun, ulat rakus pemakan daun, kepompong tidur pulas, hingga menjadi kupu-kupu indah!',
                'content_chunks' => [
                    [
                        'title' => 'Telur Menetas Menjadi Ulat',
                        'text' => "Kupu-kupu betina meletakkan telur di bawah daun hijau.\nSetelah beberapa hari, telur menetas menjadi ulat (larva) yang lapar.",
                        'highlight' => 'Telur -> Ulat (Larva)'
                    ],
                    [
                        'title' => 'Tidur Damai dalam Kepompong',
                        'text' => "Ulat yang kenyang akan menggantung dan membungkus diri menjadi kepompong (pupa).\nDi dalam kepompong, tubuhnya berubah menjadi bersayap.",
                        'highlight' => 'Kepompong (Pupa)'
                    ],
                    [
                        'title' => 'Kupu-Kupu Dewasa Terbang Riang',
                        'text' => "Kepompong terbuka dan keluarlah kupu-kupu cantik (imago)!\nKupu-kupu terbang menghisap nektar madu bunga yang manis.",
                        'highlight' => 'Kupu-Kupu Dewasa (Imago)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 10,
            ],
            [
                'id' => 5,
                'subject_id' => 1,
                'grade' => 3,
                'chapter_number' => 2,
                'title' => 'Bagian Tubuh Tumbuhan & Dapur Fotosintesis',
                'slug' => 'bagian-tumbuhan-dan-fotosintesis',
                'summary' => 'Akar menyerap air, batang mengalirkan zat hara, dan daun hijau memasak makanan sendiri dengan sinar matahari!',
                'content_chunks' => [
                    [
                        'title' => 'Akar, Batang, dan Daun Hijau',
                        'text' => "Akar mencengkeram tanah dan menyerap air serta mineral.\nBatang berdiri kokoh menopang daun, bunga, dan buah segar.",
                        'highlight' => 'Akar Menyerap Air, Batang Menopang Ranting'
                    ],
                    [
                        'title' => 'Klorofil dan Sinar Matahari Pagi',
                        'text' => "Daun memiliki zat hijau bernama klorofil untuk menangkap cahaya matahari.\nDaun memasak air dan karbondioksida menjadi makanan tumbuhan.",
                        'highlight' => 'Fotosintesis = Memasak Makanan Sendiri'
                    ],
                    [
                        'title' => 'Menghasilkan Oksigen Segar',
                        'text' => "Proses fotosintesis melepaskan oksigen (O2) ke udara bebas.\nOksigen inilah yang kita hirup agar tubuh tetap bugar dan sehat!",
                        'highlight' => 'Tumbuhan Membuat Udara Jadi Sejuk'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/D1Ymc311XS8',
                'duration_minutes' => 10,
            ],
            [
                'id' => 6,
                'subject_id' => 1,
                'grade' => 4,
                'chapter_number' => 1,
                'title' => 'Materi & Tiga Wujud Benda serta Perubahannya',
                'slug' => 'wujud-benda-dan-perubahannya',
                'summary' => 'Segala sesuatu di alam berwujud padat, cair, atau gas. Benda dapat mencair, membeku, menguap, dan mengembun!',
                'content_chunks' => [
                    [
                        'title' => 'Mengenal Padat, Cair, dan Gas',
                        'text' => "Batu dan kayu berwujud padat dengan bentuk tetap.\nAir minum berwujud cair mengikuti bentuk wadahnya.\nUdara di dalam balon adalah gas yang mengisi seluruh ruangan.",
                        'highlight' => 'Padat (Bentuk Tetap), Cair (Mengalir), Gas (Menempati Ruang)'
                    ],
                    [
                        'title' => 'Mencair dan Membeku',
                        'text' => "Es batu dipanaskan akan mencair menjadi air jernih.\nAir dimasukkan ke dalam freezer kulkas akan membeku menjadi es batu keras.",
                        'highlight' => 'Mencair (Padat ke Cair) & Membeku (Cair ke Padat)'
                    ],
                    [
                        'title' => 'Menguap dan Mengembun',
                        'text' => "Air yang dimasak mendidih akan menguap menjadi uap air.\nTitik-titik embun di dedaunan pagi hari adalah peristiwa mengembun.",
                        'highlight' => 'Menguap (Cair ke Gas) & Mengembun (Gas ke Cair)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 11,
            ],
            [
                'id' => 7,
                'subject_id' => 1,
                'grade' => 4,
                'chapter_number' => 2,
                'title' => 'Gaya, Gerak Benda & Macam Perubahan Energi',
                'slug' => 'gaya-dan-perubahan-energi',
                'summary' => 'Dorongan dan tarikan disebut gaya. Energi listrik bisa berubah menjadi cahaya, panas, dan gerak yang berguna.',
                'content_chunks' => [
                    [
                        'title' => 'Gaya Otot, Gesek, dan Magnet',
                        'text' => "Kita memakai gaya otot saat menendang bola dan mengangkat buku.\nGaya gesek pada rem sepeda membantu kita berhenti dengan aman.\nMagnet bisa menarik klip kertas besi tanpa disentuh!",
                        'highlight' => 'Gaya = Tarikan atau Dorongan pada Benda'
                    ],
                    [
                        'title' => 'Keajaiban Perubahan Energi',
                        'text' => "Setrika mengubah energi listrik menjadi panas untuk merapikan baju.\nKipas angin mengubah energi listrik menjadi gerak putar yang sejuk.\nLampu belajar mengubah listrik menjadi cahaya yang terang.",
                        'highlight' => 'Energi Listrik -> Gerak, Panas, dan Cahaya'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/libKPrr9QDA',
                'duration_minutes' => 9,
            ],
            [
                'id' => 8,
                'subject_id' => 1,
                'grade' => 4,
                'chapter_number' => 3,
                'title' => 'Denah, 8 Arah Mata Angin & Peninggalan Sejarah',
                'slug' => 'denah-mata-angin-sejarah-lokal',
                'summary' => 'Membaca arah kompas agar tidak tersesat, membedakan lingkungan alam dan buatan, serta melestarikan cagar budaya lokal.',
                'content_chunks' => [
                    [
                        'title' => 'Arah Mata Angin dan Kompas',
                        'text' => "Matahari terbit di sebelah Timur dan tenggelam di sebelah Barat.\nJika menghadap Timur, tangan kiri kita menunjuk Utara dan tangan kanan Selatan.",
                        'highlight' => 'Utara, Timur, Selatan, Barat'
                    ],
                    [
                        'title' => 'Lingkungan Alam vs Buatan',
                        'text' => "Gunung, sungai, dan pantai adalah lingkungan alam anugerah Tuhan.\nWaduk, jembatan, dan gedung sekolah adalah lingkungan buatan manusia.",
                        'highlight' => 'Alam (Terbentuk Sendiri) vs Buatan (Dibuat Manusia)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/2N4Xh4hN-6Y',
                'duration_minutes' => 8,
            ],
            [
                'id' => 9,
                'subject_id' => 1,
                'grade' => 5,
                'chapter_number' => 1,
                'title' => 'Sistem Organ Pencernaan & Pernapasan Manusia',
                'slug' => 'sistem-organ-manusia',
                'summary' => 'Jelajahi perjalanan makanan di mulut, lambung, dan usus, serta kerja paru-paru dan pembuluh darah kita!',
                'content_chunks' => [
                    [
                        'title' => 'Perjalanan Makanan dalam Tubuh',
                        'text' => "Gigi mengunyah makanan di mulut dibantu air liur.\nMakanan meluncur lewat kerongkongan menuju lambung yang mencerna makanan halus.",
                        'highlight' => 'Mulut -> Kerongkongan -> Lambung -> Usus'
                    ],
                    [
                        'title' => 'Penyerapan Zat Gizi di Usus Halus',
                        'text' => "Usus halus menyerap nutrisi penting ke dalam aliran darah.\nSisa makanan yang tidak terpakai diteruskan ke usus besar.",
                        'highlight' => 'Nutrisi Menjadi Energi Bermain dan Belajar'
                    ],
                    [
                        'title' => 'Paru-Paru Penjaga Oksigen Kita',
                        'text' => "Saat menarik napas, hidung menyaring udara kotor.\nUdara masuk ke paru-paru dan terjadi pertukaran oksigen di gelembung alveolus.",
                        'highlight' => 'Alveolus = Tempat Pertukaran Oksigen & Karbondioksida'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/g3yW7B0bZ_Y',
                'duration_minutes' => 12,
            ],
            [
                'id' => 10,
                'subject_id' => 1,
                'grade' => 5,
                'chapter_number' => 2,
                'title' => 'Ekosistem, Jaring Makanan & Keseimbangan Alam',
                'slug' => 'ekosistem-dan-jaring-makanan',
                'summary' => 'Di sawah dan hutan, tumbuhan dan hewan saling membutuhkan dalam rantai makanan yang menjaga keseimbangan bumi.',
                'content_chunks' => [
                    [
                        'title' => 'Produsen dan Konsumen',
                        'text' => "Tumbuhan hijau bertindak sebagai produsen karena membuat makanan sendiri.\nHewan pemakan tumbuhan seperti belalang disebut konsumen tingkat 1.",
                        'highlight' => 'Padi (Produsen) -> Belalang (Konsumen 1)'
                    ],
                    [
                        'title' => 'Pemangsa Puncak dan Pengurai',
                        'text' => "Katak memakan belalang, ular memakan katak, dan burung elang memakan ular.\nKetika elang mati, jamur dan bakteri pengurai mengembalikan zat hara ke tanah.",
                        'highlight' => 'Konsumen Puncak (Elang) & Pengurai (Jamur/Bakteri)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/WbHj9fM_fO0',
                'duration_minutes' => 10,
            ],
            [
                'id' => 11,
                'subject_id' => 1,
                'grade' => 6,
                'chapter_number' => 1,
                'title' => 'Menjelajahi Tata Surya, Planet & Peristiwa Gerhana',
                'slug' => 'menjelajahi-tata-surya-dan-planet',
                'summary' => 'Naik roket antariksa mengitari matahari, menjelajahi 8 planet megah, dan menyaksikan gerhana bulan yang spektakuler!',
                'content_chunks' => [
                    [
                        'title' => 'Matahari & 8 Planet Pengorbit',
                        'text' => "Matahari adalah bintang raksasa yang menjadi pusat gravitasi tata surya.\nPlanet terdekat adalah Merkurius, disusul Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus.",
                        'highlight' => 'Jupiter Terbesar, Saturnus Punya Cincin Indah'
                    ],
                    [
                        'title' => 'Rotasi dan Revolusi Bumi',
                        'text' => "Bumi berputar pada porosnya (rotasi) selama 24 jam menyebabkan siang dan malam.\nBumi mengelilingi matahari (revolusi) selama 1 tahun menyebabkan pergantian musim.",
                        'highlight' => 'Rotasi (Siang & Malam), Revolusi (Pergantian Musim)'
                    ],
                    [
                        'title' => 'Gerhana Bulan dan Gerhana Matahari',
                        'text' => "Ketika bumi berada tepat di antara matahari dan bulan, terjadilah gerhana bulan.\nKetika bulan berada di antara matahari dan bumi, sinar matahari terhalang menjadi gerhana matahari.",
                        'highlight' => 'Posisi Garis Lurus Matahari, Bumi, dan Bulan'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/libKPrr9QDA',
                'duration_minutes' => 14,
            ],
            [
                'id' => 12,
                'subject_id' => 1,
                'grade' => 6,
                'chapter_number' => 2,
                'title' => 'Fisika Dasar: Sifat Cahaya, Gelombang Bunyi & Magnet',
                'slug' => 'sifat-cahaya-bunyi-magnet',
                'summary' => 'Cahaya merambat lurus dan dapat dibiaskan, bunyi dihasilkan dari getaran benda, dan magnet memiliki kutub utara-selatan.',
                'content_chunks' => [
                    [
                        'title' => 'Keajaiban Sifat Cahaya',
                        'text' => "Cahaya merambat lurus dan menembus benda bening seperti kaca jendela.\nCahaya dapat dibiaskan air sehingga pensil di gelas tampak patah, dan membentuk pelangi!",
                        'highlight' => 'Cahaya Merambat Lurus, Menembus Benda Bening, & Dibiaskan'
                    ],
                    [
                        'title' => 'Getaran Bunyi dan Resonansi',
                        'text' => "Petikan senar gitar dan pukulan drum membuat udara bergetar menghasilkan bunyi.\nBunyi merambat melalui udara, benda padat, dan zat cair, tetapi tidak di ruang hampa.",
                        'highlight' => 'Bunyi Berasal dari Benda yang Bergetar'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/D1Ymc311XS8',
                'duration_minutes' => 11,
            ],
            [
                'id' => 13,
                'subject_id' => 1,
                'grade' => 6,
                'chapter_number' => 3,
                'title' => 'Geografi Nusantara, Proklamasi & Kerjasama ASEAN',
                'slug' => 'geografi-proklamasi-asean',
                'summary' => 'Kekayaan letak geografis Indonesia, detik-detik kemerdekaan 17 Agustus 1945, dan persahabatan negara Asia Tenggara!',
                'content_chunks' => [
                    [
                        'title' => 'Letak Silang Geografis Indonesia',
                        'text' => "Indonesia berada di antara Benua Asia dan Australia, serta Samudra Hindia dan Pasifik.\nIklim tropis membuat tanah kita subur kaya rempah-rempah.",
                        'highlight' => 'Zamrud Khatulistiwa di Jalur Perdagangan Dunia'
                    ],
                    [
                        'title' => 'Detik-Detik Proklamasi Kemerdekaan',
                        'text' => "Pada 17 Agustus 1945, Ir. Soekarno dan Drs. Mohammad Hatta membacakan teks proklamasi.\nBendera Merah Putih dikibarkan dengan khidmat diiringi lagu Indonesia Raya.",
                        'highlight' => '17 Agustus 1945 = Hari Kemerdekaan Indonesia'
                    ],
                    [
                        'title' => 'Persahabatan Negara Anggota ASEAN',
                        'text' => "Indonesia adalah salah satu pendiri ASEAN bersama Malaysia, Singapura, Filipina, dan Thailand.\nKita bekerjasama menjaga perdamaian, ekonomi, dan pendidikan yang maju.",
                        'highlight' => 'ASEAN = Perhimpunan Bangsa Asia Tenggara'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/41fS2G4d538',
                'duration_minutes' => 12,
            ],

            // =========================================================================
            // 2. MATEMATIKA (NUMERASI & LOGIKA) - subject_id: 2
            // =========================================================================
            [
                'id' => 14,
                'subject_id' => 2,
                'grade' => 1,
                'chapter_number' => 1,
                'title' => 'Bilangan Cacah & Membandingkan Angka 1-100',
                'slug' => 'bilangan-cacah-dan-membandingkan-angka',
                'summary' => 'Belajar menghafal angka 1 sampai 100, menghitung maju mundur, serta membandingkan lebih banyak dan lebih sedikit.',
                'content_chunks' => [
                    [
                        'title' => 'Mengenal Lambang Angka 1-20',
                        'text' => "Ayo hitung jari tangan dan kancing bajumu!\nAngka 1, 2, 3, 4, 5 sampai 20 punya bentuk yang unik dan mudah diingat.",
                        'highlight' => 'Menulis dan Membaca Angka Dasar'
                    ],
                    [
                        'title' => 'Membandingkan Banyak Benda',
                        'text' => "Kelinci punya 8 wortel, sedangkan kura-kura punya 5 wortel.\n8 wortel LEBIH BANYAK daripada 5 wortel kelinci!",
                        'highlight' => 'Lebih Banyak, Lebih Sedikit, atau Sama Banyak'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 6,
            ],
            [
                'id' => 15,
                'subject_id' => 2,
                'grade' => 1,
                'chapter_number' => 2,
                'title' => 'Penjumlahan & Pengurangan Ceria Buah Segar',
                'slug' => 'penjumlahan-dan-pengurangan-dasar',
                'summary' => 'Menghitung apel manis di keranjang memakai tanda tambah (+) dan menghitung sisa kue dengan tanda kurang (-).',
                'content_chunks' => [
                    [
                        'title' => 'Kelinci Menghitung Apel Merah (+)',
                        'text' => "Ada 3 apel di atas meja, lalu ibu menaruh 2 apel lagi.\n3 apel + 2 apel = 5 apel manis terkumpul!",
                        'highlight' => '3 + 2 = 5 Buah Apel Segar'
                    ],
                    [
                        'title' => 'Kue Donat Berkurang (-)',
                        'text' => "Kakak punya 6 buah donat cokelat yang lezat.\n2 donat diberikan kepada adik tercinta.\n6 - 2 = 4 donat yang tersisa di piring.",
                        'highlight' => '6 - 2 = 4 Donat Tersisa'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 7,
            ],
            [
                'id' => 16,
                'subject_id' => 2,
                'grade' => 2,
                'chapter_number' => 1,
                'title' => 'Membaca Jam Tepat & Mengenal Uang Rupiah',
                'slug' => 'membaca-jam-dan-uang-rupiah',
                'summary' => 'Kapan waktu berangkat sekolah? Belajar membaca jarum jam dinding dan mengenal uang koin serta kertas rupiah!',
                'content_chunks' => [
                    [
                        'title' => 'Jarum Pendek & Jarum Panjang Jam',
                        'text' => "Jarum pendek menunjuk angka jam, jarum panjang menunjuk menit.\nJika jarum pendek di angka 7 dan jarum panjang di angka 12, maka sekarang pukul 07.00 tepat!",
                        'highlight' => 'Pukul 07.00 = Waktu Masuk Sekolah'
                    ],
                    [
                        'title' => 'Mengenal Pecahan Uang Rupiah',
                        'text' => "Ada uang koin Rp500 dan Rp1.000 dari logam berkilau.\nAda juga uang kertas Rp2.000, Rp5.000, hingga Rp10.000 untuk jajan sehat di kantin.",
                        'highlight' => 'Rupiah (Rp) adalah Mata Uang Indonesia'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 8,
            ],
            [
                'id' => 17,
                'subject_id' => 2,
                'grade' => 2,
                'chapter_number' => 2,
                'title' => 'Geometri Dasar: Segitiga, Persegi & Lingkaran',
                'slug' => 'geometri-dasar-bangun-datar',
                'summary' => 'Buku kita berbentuk persegi panjang, roda sepeda bundar seperti lingkaran, dan potongan pizza mirip segitiga!',
                'content_chunks' => [
                    [
                        'title' => 'Segitiga, Persegi, dan Lingkaran',
                        'text' => "Segitiga memiliki 3 sisi dan 3 titik sudut.\nPersegi memiliki 4 sisi yang sama panjang.\nLingkaran tidak memiliki sudut, bentuknya bulat mulus seperti roda sepeda.",
                        'highlight' => 'Mengenal Sisi dan Sudut Bangun Datar'
                    ],
                    [
                        'title' => 'Bangun Ruang Sederhana',
                        'text' => "Kotak kado berbentuk kubus dan kardus pasta gigi berbentuk balok.\nBola kasti berbentuk bulat sempurna yang bisa menggelinding cepat.",
                        'highlight' => 'Kubus, Balok, dan Bola'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 8,
            ],
            [
                'id' => 18,
                'subject_id' => 2,
                'grade' => 2,
                'chapter_number' => 3,
                'title' => 'Pengukuran Panjang & Berat dengan Alat Baku',
                'slug' => 'pengukuran-panjang-dan-berat',
                'summary' => 'Mengukur panjang meja dengan jengkal tangan vs penggaris sentimeter, serta menimbang berat semangka dengan kilogram!',
                'content_chunks' => [
                    [
                        'title' => 'Alat Ukur Panjang Tidak Baku & Baku',
                        'text' => "Jengkal jari tangan dan langkah kaki adalah alat ukur tidak baku karena ukuran tangan tiap anak berbeda.\nPenggaris dan meteran adalah alat ukur baku bersatuan sentimeter (cm) dan meter (m).",
                        'highlight' => '1 Meter (m) = 100 Sentimeter (cm)'
                    ],
                    [
                        'title' => 'Menimbang Berat dengan Kilogram (kg)',
                        'text' => "Timbangan digunakan untuk mengukur berat beras, buah, dan tubuh kita.\nSatuan berat baku yang sering kita gunakan adalah gram (g) dan kilogram (kg).",
                        'highlight' => '1 Kilogram (kg) = 1.000 Gram (g)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 8,
            ],
            [
                'id' => 19,
                'subject_id' => 2,
                'grade' => 3,
                'chapter_number' => 1,
                'title' => 'Bilangan Ribuan & Mengenal Pecahan (1/2, 1/3, 1/4)',
                'slug' => 'bilangan-ribuan-dan-pecahan-senilai',
                'summary' => 'Membaca angka hingga 10.000 dan membagi seloyang pizza secara adil dengan pecahan setengah, sepertiga, dan seperempat!',
                'content_chunks' => [
                    [
                        'title' => 'Membaca Nilai Tempat Ribuan',
                        'text' => "Pada angka 4.520, angka 4 menempati ribuan, 5 ratusan, 2 puluhan, dan 0 satuan.\nDibaca 'Empat ribu lima ratus dua puluh'.",
                        'highlight' => 'Ribuan, Ratusan, Puluhan, Satuan'
                    ],
                    [
                        'title' => 'Memotong Pizza Jadi Pecahan (1/2 & 1/4)',
                        'text' => "Jika 1 pizza dipotong 2 bagian sama besar, satu potong bernilai 1/2 (setengah).\nJika dipotong 4 bagian sama besar, satu potong bernilai 1/4 (seperempat).",
                        'highlight' => '1/2 sama besarnya dengan 2/4 (Pecahan Senilai)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 10,
            ],
            [
                'id' => 20,
                'subject_id' => 2,
                'grade' => 3,
                'chapter_number' => 2,
                'title' => 'Perkalian & Pembagian Bersusun yang Menyenangkan',
                'slug' => 'perkalian-dan-pembagian-bersusun',
                'summary' => 'Perkalian adalah penjumlahan berulang, sedangkan pembagian adalah membagi sama rata secara bersusun!',
                'content_chunks' => [
                    [
                        'title' => 'Perkalian sebagai Penjumlahan Berulang',
                        'text' => "4 x 3 artinya 3 + 3 + 3 + 3 = 12.\nDengan menghafal tabel perkalian 1 sampai 10, berhitung menjadi sangat cepat!",
                        'highlight' => '4 x 3 = 12 (Tiga Ditambahkan Sebanyak 4 Kali)'
                    ],
                    [
                        'title' => 'Pembagian Porogapit Bersusun',
                        'text' => "Ada 24 kelereng yang ingin dibagikan kepada 4 teman sama rata.\n24 dibagi 4 = 6 kelereng untuk tiap teman tanpa ada sisa.",
                        'highlight' => '24 : 4 = 6'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 10,
            ],
            [
                'id' => 21,
                'subject_id' => 2,
                'grade' => 4,
                'chapter_number' => 1,
                'title' => 'KPK dan FPB Dasar Menggunakan Pohon Faktor',
                'slug' => 'kpk-dan-fpb-dasar',
                'summary' => 'Temukan kelipatan terkecil dan faktor persekutuan terbesar bilangan memakai pohon faktor bilangan prima!',
                'content_chunks' => [
                    [
                        'title' => 'Mengenal Bilangan Prima & Faktor',
                        'text' => "Bilangan prima adalah bilangan yang hanya bisa dibagi 1 dan dirinya sendiri: 2, 3, 5, 7, 11...\nFaktor dari 12 adalah 1, 2, 3, 4, 6, dan 12.",
                        'highlight' => 'Bilangan Prima: 2, 3, 5, 7, 11, 13...'
                    ],
                    [
                        'title' => 'Menentukan KPK dan FPB',
                        'text' => "KPK dicari dari perkalian semua faktor prima dengan pangkat terbesar.\nFPB dicari dari faktor prima yang sama dengan pangkat terkecil.",
                        'highlight' => 'KPK (Kelipatan Persekutuan Terkecil) & FPB (Faktor Terbesar)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 11,
            ],
            [
                'id' => 22,
                'subject_id' => 2,
                'grade' => 4,
                'chapter_number' => 2,
                'title' => 'Keliling & Luas Persegi, Persegi Panjang, Segitiga',
                'slug' => 'keliling-dan-luas-bangun-datar',
                'summary' => 'Mengelilingi batas lapangan sepak bola dan menghitung luas ubin lantai dengan rumus perkalian praktis!',
                'content_chunks' => [
                    [
                        'title' => 'Keliling Bangun Datar',
                        'text' => "Keliling adalah jumlah panjang seluruh sisi terluar bangun datar.\nKeliling persegi = 4 x sisi. Keliling persegi panjang = 2 x (panjang + lebar).",
                        'highlight' => 'Keliling = Menjumlahkan Semua Batas Sisi'
                    ],
                    [
                        'title' => 'Luas Bangun Datar',
                        'text' => "Luas persegi = sisi x sisi.\nLuas persegi panjang = panjang x lebar.\nLuas segitiga = (alas x tinggi) : 2.",
                        'highlight' => 'Luas = Mengukur Seluruh Permukaan Bagian Dalam'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 11,
            ],
            [
                'id' => 23,
                'subject_id' => 2,
                'grade' => 4,
                'chapter_number' => 3,
                'title' => 'Garis, Sudut & Menyajikan Diagram Batang',
                'slug' => 'garis-sudut-dan-pengolahan-data',
                'summary' => 'Mengenal sudut siku-siku 90 derajat, sudut lancip, tumpul, serta menyajikan data hobi teman dalam diagram batang!',
                'content_chunks' => [
                    [
                        'title' => 'Macam-Macam Besar Sudut',
                        'text' => "Sudut siku-siku besarnya tepat 90 derajat (seperti pojok buku).\nSudut lancip lebih kecil dari 90 derajat.\nSudut tumpul lebih besar dari 90 derajat.",
                        'highlight' => 'Sudut Lancip (<90°), Siku-Siku (90°), Tumpul (>90°)'
                    ],
                    [
                        'title' => 'Membaca Diagram Batang',
                        'text' => "Tinggi batang tegak menunjukkan banyaknya jumlah data.\nDengan diagram batang, kita bisa langsung melihat hobi apa yang paling disukai teman-teman!",
                        'highlight' => 'Diagram Batang Memudahkan Kita Membaca Informasi'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 10,
            ],
            [
                'id' => 24,
                'subject_id' => 2,
                'grade' => 5,
                'chapter_number' => 1,
                'title' => 'Operasi Hitung Campuran & Bilangan Bulat Negatif',
                'slug' => 'operasi-hitung-campuran-dan-bilangan-bulat',
                'summary' => 'Jelajahi garis bilangan di bawah angka nol (negatif) dan urutan pengerjaan operasi hitung kurung, kali, bagi, tambah, kurang.',
                'content_chunks' => [
                    [
                        'title' => 'Garis Bilangan Bulat Positif dan Negatif',
                        'text' => "Angka di sebelah kanan nol bernilai positif (1, 2, 3...).\nAngka di sebelah kiri nol bernilai negatif (-1, -2, -3...), seperti suhu es beku di bawah nol derajat.",
                        'highlight' => 'Makin ke kiri nilai makin kecil, makin ke kanan makin besar'
                    ],
                    [
                        'title' => 'Aturan Urutan Operasi Hitung',
                        'text' => "Kerjakan tanda kurung terlebih dahulu.\nLalu operasi kali (x) dan bagi (:) yang setingkat.\nTerakhir kerjakan operasi tambah (+) dan kurang (-).",
                        'highlight' => 'Kurung -> Kali & Bagi -> Tambah & Kurang'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 12,
            ],
            [
                'id' => 25,
                'subject_id' => 2,
                'grade' => 5,
                'chapter_number' => 2,
                'title' => 'Pecahan Beda Penyebut, Desimal & Persentase (%)',
                'slug' => 'pecahan-beda-penyebut-dan-persen',
                'summary' => 'Menyamakan penyebut dengan KPK, mengubah pecahan ke desimal berkoma, dan menghitung diskon belanja dengan persen.',
                'content_chunks' => [
                    [
                        'title' => 'Menjumlahkan Pecahan Beda Penyebut',
                        'text' => "Untuk menghitung 1/2 + 1/3, kita harus menyamakan penyebutnya menggunakan KPK dari 2 dan 3, yaitu 6.\n1/2 menjadi 3/6, dan 1/3 menjadi 2/6. Hasilnya adalah 5/6!",
                        'highlight' => '1/2 + 1/3 = 3/6 + 2/6 = 5/6'
                    ],
                    [
                        'title' => 'Desimal dan Persentase (%)',
                        'text' => "Pecahan 1/2 sama dengan desimal 0,5 atau 50%.\nPecahan 1/4 sama dengan desimal 0,25 atau 25%.",
                        'highlight' => 'Persen (%) artinya Per Seratus (/100)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 12,
            ],
            [
                'id' => 26,
                'subject_id' => 2,
                'grade' => 5,
                'chapter_number' => 3,
                'title' => 'Skala Peta, Jarak Sebenarnya & Kecepatan Tempuh',
                'slug' => 'skala-jarak-dan-kecepatan',
                'summary' => 'Membaca skala peta 1:1.000.000 untuk mengetahui jarak kota yang sebenarnya, serta menghitung kecepatan laju kendaraan.',
                'content_chunks' => [
                    [
                        'title' => 'Memahami Skala Peta',
                        'text' => "Skala 1 : 100.000 artinya 1 cm di peta mewakili 100.000 cm (atau 1 km) jarak sebenarnya di bumi.\nJarak Sebenarnya = Jarak Peta x Skala.",
                        'highlight' => 'Skala = Jarak pada Peta : Jarak Sebenarnya'
                    ],
                    [
                        'title' => 'Segitiga Rumus Kecepatan (J = K x W)',
                        'text' => "Kecepatan adalah jarak yang ditempuh per satuan waktu (km/jam).\nJika mobil melaju 60 km/jam selama 2 jam, maka jarak yang ditempuh adalah 120 km.",
                        'highlight' => 'Jarak = Kecepatan x Waktu'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/2N4Xh4hN-6Y',
                'duration_minutes' => 11,
            ],
            [
                'id' => 27,
                'subject_id' => 2,
                'grade' => 6,
                'chapter_number' => 1,
                'title' => 'Volume & Luas Permukaan Bangun Ruang (Kubus s/d Tabung)',
                'slug' => 'volume-bangun-ruang',
                'summary' => 'Menghitung muatan air dalam bak kubus, volume kardus balok, kaleng tabung, dan kerucut es krim dengan rumus teruji!',
                'content_chunks' => [
                    [
                        'title' => 'Volume Kubus dan Balok',
                        'text' => "Volume Kubus = rusuk x rusuk x rusuk (s x s x s).\nVolume Balok = panjang x lebar x tinggi (p x l x t).\nSatuan volume dinyatakan dalam sentimeter kubik (cm³) atau liter.",
                        'highlight' => '1 Liter = 1 Desimeter Kubik (dm³)'
                    ],
                    [
                        'title' => 'Volume Tabung dan Kerucut',
                        'text' => "Volume Tabung = luas alas x tinggi = pi x r x r x t.\nVolume Kerucut adalah sepertiga dari tabung = 1/3 x pi x r x r x t.",
                        'highlight' => 'Tabung (Alas Lingkaran) & Kerucut (1/3 Volume Tabung)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 13,
            ],
            [
                'id' => 28,
                'subject_id' => 2,
                'grade' => 6,
                'chapter_number' => 2,
                'title' => 'Unsur Lingkaran & Statistika (Mean, Median, Modus)',
                'slug' => 'lingkaran-dan-statistika-data',
                'summary' => 'Menghitung luas lingkaran dengan rumus pi x r x r, serta menemukan nilai rata-rata (mean), nilai tengah, dan modus data.',
                'content_chunks' => [
                    [
                        'title' => 'Unsur Lingkaran (Jari-Jari & Diameter)',
                        'text' => "Diameter (d) adalah garis lurus yang membelah lingkaran melewati titik pusat.\nJari-jari (r) adalah setengah dari diameter. Keliling = 2 x pi x r. Luas = pi x r².",
                        'highlight' => 'Nilai pi adalah 22/7 atau 3,14'
                    ],
                    [
                        'title' => 'Mean, Median, dan Modus',
                        'text' => "Mean = Rata-rata (jumlah semua nilai dibagi banyak data).\nMedian = Nilai yang berada tepat di tengah setelah data diurutkan.\nModus = Nilai angka yang paling sering muncul.",
                        'highlight' => 'Mean (Rata-rata), Median (Nilai Tengah), Modus (Sering Muncul)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/n0FZhQ_GkKw',
                'duration_minutes' => 13,
            ],

            // =========================================================================
            // 3. BAHASA INDONESIA (LITERASI & SASTRA) - subject_id: 3
            // =========================================================================
            [
                'id' => 29,
                'subject_id' => 3,
                'grade' => 1,
                'chapter_number' => 1,
                'title' => 'Membaca Permulaan: Huruf Vokal, Konsonan & Suku Kata',
                'slug' => 'membaca-permulaan-dan-suku-kata',
                'summary' => 'Mengenal huruf vokal a-i-u-e-o, menggabungkannya dengan huruf konsonan, dan membaca kata pertama dengan riang!',
                'content_chunks' => [
                    [
                        'title' => '5 Huruf Vokal yang Ramah',
                        'text' => "Huruf vokal adalah: A, I, U, E, dan O.\nApel, Ikan, Udang, Elang, dan Onta diawali huruf vokal yang ceria!",
                        'highlight' => 'A - I - U - E - O'
                    ],
                    [
                        'title' => 'Menggabungkan Suku Kata Menjadi Kata',
                        'text' => "B-A dibaca BA, C-A dibaca CA. BA-CA menjadi BACA!\nB-U dibaca BU, K-U dibaca KU. BU-KU menjadi BUKU!\nKamu hebat sudah bisa membaca kata pertamamu!",
                        'highlight' => 'Ba-ca Bu-ku = Baca Buku'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 7,
            ],
            [
                'id' => 30,
                'subject_id' => 3,
                'grade' => 1,
                'chapter_number' => 2,
                'title' => 'Tanda Baca Titik, Huruf Kapital & Tiga Kata Ajaib',
                'slug' => 'tanda-baca-dasar-dan-tiga-kata-ajaib',
                'summary' => 'Kapan memakai huruf kapital dan tanda titik? Serta membiasakan tiga kata ajaib: maaf, tolong, dan terima kasih.',
                'content_chunks' => [
                    [
                        'title' => 'Huruf Kapital dan Tanda Titik (.)',
                        'text' => "Huruf awal kalimat dan nama orang harus memakai huruf besar (kapital).\nDi akhir kalimat berita, selalu bubuhkan tanda titik (.) sebagai tanda berhenti membaca.",
                        'highlight' => 'Contoh: Budi menyiram tanaman.'
                    ],
                    [
                        'title' => 'Tiga Kata Ajaib Anak Santun',
                        'text' => "Katakan 'Tolong' saat meminta bantuan teman.\nKatakan 'Maaf' saat berbuat kekeliruan secara tidak sengaja.\nKatakan 'Terima kasih' saat menerima pertolongan atau hadiah.",
                        'highlight' => 'Tolong, Maaf, dan Terima Kasih'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 7,
            ],
            [
                'id' => 31,
                'subject_id' => 3,
                'grade' => 2,
                'chapter_number' => 1,
                'title' => 'Mendeskripsikan Ciri Benda & Dongeng Fabel Kancil',
                'slug' => 'mendeskripsikan-benda-dan-fabel',
                'summary' => 'Belajar menjelaskan bentuk, warna, dan kegunaan benda kesayangan, serta memetik pesan moral dari cerita fabel hewan.',
                'content_chunks' => [
                    [
                        'title' => 'Mendeskripsikan Benda di Sekitar',
                        'text' => "Tas sekolahku berwarna biru tua, memiliki dua kantong, dan dipakai untuk membawa buku tulis.\nMenjelaskan ciri benda membantu teman mengenali benda yang kita maksud.",
                        'highlight' => 'Sebutkan Bentuk, Warna, dan Kegunaannya'
                    ],
                    [
                        'title' => 'Dongeng Fabel Hewan Penuh Pesan Moral',
                        'text' => "Fabel adalah cerita fiksi dengan tokoh binatang yang bisa berbicara seperti manusia.\nKancil yang cerdik mengajarkan kita untuk memakai akal sehat dan tidak boleh bersikap sombong.",
                        'highlight' => 'Fabel = Cerita Tokoh Hewan yang Bijaksana'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 8,
            ],
            [
                'id' => 32,
                'subject_id' => 3,
                'grade' => 3,
                'chapter_number' => 1,
                'title' => 'Menemukan Gagasan Pokok & Kalimat Pendukung',
                'slug' => 'ide-pokok-dan-kalimat-pendukung',
                'summary' => 'Rahasia menemukan ide utama dalam paragraf bacaan dan membedakannya dengan kalimat penjelas yang menyertainya.',
                'content_chunks' => [
                    [
                        'title' => 'Apa itu Gagasan Pokok?',
                        'text' => "Gagasan pokok adalah inti sari masalah yang dibahas dalam suatu paragraf.\nBiasanya terletak di kalimat pertama (deduktif) atau di akhir paragraf (induktif).",
                        'highlight' => 'Gagasan Pokok = Inti Pembahasan Paragraf'
                    ],
                    [
                        'title' => 'Kalimat Pendukung / Penjelas',
                        'text' => "Kalimat pendukung bertugas menjelaskan gagasan pokok dengan contoh, alasan, dan rincian yang lebih lengkap.",
                        'highlight' => 'Kalimat Pendukung Memperjelas Ide Utama'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 9,
            ],
            [
                'id' => 33,
                'subject_id' => 3,
                'grade' => 3,
                'chapter_number' => 2,
                'title' => 'Teks Petunjuk Prosedur & Menulis Surat Pribadi',
                'slug' => 'teks-petunjuk-dan-surat-pribadi',
                'summary' => 'Menyusun langkah membuat layang-layang secara urut dan menulis surat kabar penuh rindu untuk kakek-nenek.',
                'content_chunks' => [
                    [
                        'title' => 'Menyusun Teks Petunjuk (Prosedur)',
                        'text' => "Teks petunjuk memuat langkah-langkah kerja yang berurutan menggunakan kalimat perintah yang santun dan jelas.\nContoh: 'Pertama, rekatkan bambu dengan benang, lalu tempelkan kertas minyak.'",
                        'highlight' => 'Langkah-Langkah Harus Runtut dan Jelas'
                    ],
                    [
                        'title' => 'Menulis Surat untuk Sahabat / Keluarga',
                        'text' => "Surat pribadi diawali tanggal surat, salam pembuka, kabar cerita menyenangkan, dan salam penutup yang manis.",
                        'highlight' => 'Salam Pembuka -> Isi Cerita -> Salam Penutup'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 9,
            ],
            [
                'id' => 34,
                'subject_id' => 3,
                'grade' => 4,
                'chapter_number' => 1,
                'title' => 'Mendeklamasikan Puisi Anak & Karakter Tokoh Fiksi',
                'slug' => 'puisi-anak-dan-tokoh-fiksi',
                'summary' => 'Membaca bait puisi indah dengan mimik wajah riang, intonasi tepat, serta mengenali watak tokoh dalam cerpen.',
                'content_chunks' => [
                    [
                        'title' => 'Keindahan Bait Puisi Anak',
                        'text' => "Puisi disusun dari bait-bait kata yang berima dan penuh ungkapan hati.\nSaat membacakan puisi, perhatikan lafal, jeda, intonasi, dan ekspresi wajah yang pas.",
                        'highlight' => 'Lafal, Intonasi, Jeda, dan Ekspresi Wajah'
                    ],
                    [
                        'title' => 'Tokoh Protagonis dan Antagonis',
                        'text' => "Tokoh protagonis adalah tokoh berwatak baik yang disukai pembaca.\nTokoh antagonis adalah tokoh penentang yang berwatak kurang baik.",
                        'highlight' => 'Protagonis (Baik) vs Antagonis (Penentang)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 10,
            ],
            [
                'id' => 35,
                'subject_id' => 3,
                'grade' => 5,
                'chapter_number' => 1,
                'title' => 'Teks Eksplanasi Fenomena Alam & Fakta Sejarah',
                'slug' => 'teks-eksplanasi-dan-nonfiksi',
                'summary' => 'Mencari fakta sebab-akibat terjadinya pelangi, letusan gunung berapi, serta peristiwa bersejarah yang nyata.',
                'content_chunks' => [
                    [
                        'title' => 'Struktur Teks Eksplanasi Ilmiah',
                        'text' => "Teks eksplanasi menjelaskan proses terjadinya fenomena alam atau sosial secara ilmiah.\nStrukturnya terdiri dari pernyataan umum, deretan penjelasan sebab-akibat, dan kesimpulan interpretasi.",
                        'highlight' => 'Pernyataan Umum -> Sebab-Akibat -> Kesimpulan'
                    ],
                    [
                        'title' => 'Membedakan Fakta dan Opini',
                        'text' => "Fakta adalah kenyataan yang benar-benar terjadi dan dapat dibuktikan kebenarannya.\nOpini adalah pendapat atau perkiraan seseorang yang belum tentu terjadi.",
                        'highlight' => 'Fakta (Kenyataan Nyata) vs Opini (Pendapat Pribadi)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 11,
            ],
            [
                'id' => 36,
                'subject_id' => 3,
                'grade' => 5,
                'chapter_number' => 2,
                'title' => 'Struktur Pantun Nasehat Bersajak a-b-a-b & Makna Kias',
                'slug' => 'pantun-nasehat-dan-puisi',
                'summary' => 'Membedah sampiran dan isi pantun nusantara, membuat pantun berbalas jenaka, dan memahami ungkapan kiasan.',
                'content_chunks' => [
                    [
                        'title' => 'Ciri-Ciri Khas Pantun Indonesia',
                        'text' => "Satu bait pantun terdiri dari 4 baris dengan rima persajakan a-b-a-b.\nBaris 1 dan 2 disebut sampiran, sedangkan baris 3 dan 4 adalah isi pantun yang memuat nasehat berharga.",
                        'highlight' => 'Baris 1-2 (Sampiran), Baris 3-4 (Isi Pantun)'
                    ],
                    [
                        'title' => 'Makna Kiasan Penuh Makna',
                        'text' => "Ungkapan kiasan seperti 'ringan tangan' artinya suka menolong teman.\n'Besar kepala' artinya sombong, sedangkan 'rendah hati' artinya tidak sombong.",
                        'highlight' => 'Rendah Hati (Tidak Sombong) & Ringan Tangan (Suka Menolong)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 10,
            ],
            [
                'id' => 37,
                'subject_id' => 3,
                'grade' => 6,
                'chapter_number' => 1,
                'title' => 'Menyusun Naskah Pidato & Menganalisis Pesan Iklan',
                'slug' => 'naskah-pidato-dan-pesan-iklan',
                'summary' => 'Belajar berbicara di depan umum dengan naskah pidato terstruktur, serta menganalisis pesan ajakan pada iklan media.',
                'content_chunks' => [
                    [
                        'title' => 'Struktur Teks Pidato yang Baik',
                        'text' => "Pidato diawali salam pembuka dan rasa syukur kepada Tuhan.\nBagian isi memuat pesan inti ajakan, lalu diakhiri permohonan maaf dan salam penutup yang santun.",
                        'highlight' => 'Pembuka -> Isi Pidato -> Penutup'
                    ],
                    [
                        'title' => 'Iklan Layanan Masyarakat',
                        'text' => "Iklan layanan masyarakat mengajak masyarakat melakukan kebaikan bersama.\nContoh: ajakan menghemat air bersih, membuang sampah pada tempatnya, dan gemar membaca buku.",
                        'highlight' => 'Iklan Bersifat Persuasif (Mengajak dan Membujuk)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 11,
            ],

            // =========================================================================
            // 4. PENDIDIKAN PANCASILA / PKn - subject_id: 4
            // =========================================================================
            [
                'id' => 38,
                'subject_id' => 4,
                'grade' => 1,
                'chapter_number' => 1,
                'title' => '5 Simbol Sila Pancasila di Perisai Burung Garuda',
                'slug' => 'simbol-pancasila-dan-hidup-rukun',
                'summary' => 'Mengenal Bintang emas, Rantai baja, Pohon Beringin, Kepala Banteng, dan Padi-Kapas sebagai lambang kebanggaan!',
                'content_chunks' => [
                    [
                        'title' => 'Burung Garuda Lambang Negara Kita',
                        'text' => "Garuda Pancasila adalah lambang negara Indonesia yang gagah perkasa.\nDi dadanya ada perisai yang memuat 5 simbol sila yang luhur.",
                        'highlight' => 'Garuda Pancasila Lambang Negara Indonesia'
                    ],
                    [
                        'title' => '5 Simbol Sila Pancasila',
                        'text' => "Sila 1: Bintang emas berkilau.\nSila 2: Rantai emas yang tersambung erat.\nSila 3: Pohon Beringin yang rindang teduh.\nSila 4: Kepala Banteng perkasa.\nSila 5: Padi dan Kapas kemakmuran.",
                        'highlight' => 'Bintang, Rantai, Beringin, Banteng, Padi & Kapas'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/41fS2G4d538',
                'duration_minutes' => 8,
            ],
            [
                'id' => 39,
                'subject_id' => 4,
                'grade' => 2,
                'chapter_number' => 1,
                'title' => 'Tata Tertib di Rumah & Menjaga Aturan Kelas',
                'slug' => 'aturan-rumah-dan-sekolah',
                'summary' => 'Aturan dibuat agar hidup kita tertib, aman, dan tenteram. Menepati janji serta menghargai waktu belajar di sekolah.',
                'content_chunks' => [
                    [
                        'title' => 'Aturan Disiplin di Rumah',
                        'text' => "Bangun pagi tepat waktu, merapikan selimut tempat tidur, dan mencuci piring setelah makan.\nAturan di rumah membuat keluarga rukun dan rumah selalu bersih rapi.",
                        'highlight' => 'Aturan Membuat Kehidupan Jadi Tertib'
                    ],
                    [
                        'title' => 'Tertib Saat Berada di Kelas',
                        'text' => "Mendengarkan penjelasan bapak dan ibu guru dengan saksama.\nMengangkat tangan terlebih dahulu sebelum bertanya atau berpendapat.",
                        'highlight' => 'Saling Menghormati Antara Guru dan Murid'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/41fS2G4d538',
                'duration_minutes' => 8,
            ],
            [
                'id' => 40,
                'subject_id' => 4,
                'grade' => 3,
                'chapter_number' => 1,
                'title' => 'Makna Ikrar Sumpah Pemuda & Keragaman Budaya',
                'slug' => 'sumpah-pemuda-dan-keragaman-budaya',
                'summary' => 'Satu nusa, satu bangsa, satu bahasa persatuan Indonesia! Menghargai ribuan suku, tarian adat, dan pakaian daerah.',
                'content_chunks' => [
                    [
                        'title' => 'Peristiwa Bersejarah 28 Oktober 1928',
                        'text' => "Para pemuda dari berbagai daerah berkumpul mengikrarkan janji Sumpah Pemuda.\nKita bersumpah menjunjung tanah air yang satu, bangsa yang satu, dan bahasa persatuan Indonesia.",
                        'highlight' => '28 Oktober = Hari Sumpah Pemuda'
                    ],
                    [
                        'title' => 'Kekayaan Suku dan Tarian Nusantara',
                        'text' => "Dari Sabang sampai Merauke ada suku Jawa, Sunda, Batak, Dayak, Bugis, hingga Papua.\nPerbedaan suku membuat Indonesia kaya warna dan sangat indah!",
                        'highlight' => 'Beragam Suku, Satu Keluarga Besar Indonesia'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/41fS2G4d538',
                'duration_minutes' => 9,
            ],
            [
                'id' => 41,
                'subject_id' => 4,
                'grade' => 4,
                'chapter_number' => 1,
                'title' => 'Hak dan Kewajiban Anak di Rumah & Sekolah',
                'slug' => 'hak-dan-kewajiban-anak',
                'summary' => 'Kewajiban harus dikerjakan dengan penuh tanggung jawab sebelum kita menuntut hak yang kita miliki.',
                'content_chunks' => [
                    [
                        'title' => 'Apa itu Hak dan Kewajiban?',
                        'text' => "Kewajiban adalah sesuatu yang harus kita laksanakan dengan penuh tanggung jawab.\nHak adalah sesuatu yang patut kita terima setelah menuntaskan kewajiban.",
                        'highlight' => 'Kewajiban Dulu, Baru Menuntut Hak'
                    ],
                    [
                        'title' => 'Contoh Nyata di Sekolah',
                        'text' => "Kewajiban murid adalah belajar giat dan menjaga kebersihan sekolah.\nHak murid adalah mendapatkan bimbingan guru dan fasilitas belajar yang nyaman.",
                        'highlight' => 'Keseimbangan Antara Hak dan Kewajiban'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/41fS2G4d538',
                'duration_minutes' => 9,
            ],
            [
                'id' => 42,
                'subject_id' => 4,
                'grade' => 5,
                'chapter_number' => 1,
                'title' => 'Semangat Gotong Royong & Sejarah BPUPKI/PPKI',
                'slug' => 'gotong-royong-dan-sejarah-pancasila',
                'summary' => 'Kisah tokoh bangsa merumuskan dasar negara Pancasila dan indahnya budaya gotong royong membersihkan kampung.',
                'content_chunks' => [
                    [
                        'title' => 'Sejarah Lahirnya Pancasila',
                        'text' => "BPUPKI dibentuk untuk mempersiapkan kemerdekaan Indonesia.\nPada 1 Juni 1945, Ir. Soekarno menyampaikan gagasan dasar negara yang dinamakan Pancasila.",
                        'highlight' => '1 Juni = Hari Lahir Pancasila'
                    ],
                    [
                        'title' => 'Nilai Luhur Gotong Royong',
                        'text' => "Berat sama dipikul, ringan sama dijinjing.\nGotong royong membuat pekerjaan berat menjadi cepat selesai dan mempererat tali persaudaraan.",
                        'highlight' => 'Berat Sama Dipikul, Ringan Sama Dijinjing'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/41fS2G4d538',
                'duration_minutes' => 10,
            ],
            [
                'id' => 43,
                'subject_id' => 4,
                'grade' => 6,
                'chapter_number' => 1,
                'title' => 'Menjaga Persatuan & Keutuhan NKRI Bhinneka Tunggal Ika',
                'slug' => 'persatuan-nkri-dan-bhinneka-tunggal-ika',
                'summary' => 'Berbeda-beda tetapi tetap satu jua. Menjaga kerukunan antarumat beragama dan rasa bangga terhadap bangsa Indonesia!',
                'content_chunks' => [
                    [
                        'title' => 'Makna Semboyan Bhinneka Tunggal Ika',
                        'text' => "Semboyan ini berasal dari Kitab Sutasoma karya Mpu Tantular.\nArtinya 'Meskipun berbeda-beda, pada hakikatnya bangsa Indonesia tetap satu kesatuan.'",
                        'highlight' => 'Berbeda-beda Tetapi Tetap Satu Jua'
                    ],
                    [
                        'title' => 'Peran Pelajar Menjaga Persatuan',
                        'text' => "Tidak mengejek teman yang berbeda suku atau agama, menjauhi pertikaian, dan giat mengukir prestasi demi mengharumkan nama bangsa.",
                        'highlight' => 'Toleransi Adalah Kunci Kerukunan Bangsa'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/41fS2G4d538',
                'duration_minutes' => 10,
            ],

            // =========================================================================
            // 5. BAHASA INGGRIS (ENGLISH FOR KIDS) - subject_id: 5
            // =========================================================================
            [
                'id' => 44,
                'subject_id' => 5,
                'grade' => 1,
                'chapter_number' => 1,
                'title' => 'Alphabet Song, Friendly Greetings & Cheerful Colors',
                'slug' => 'alphabet-greetings-and-colors',
                'summary' => 'Sing the ABC song happily, say Good Morning to your friends, and name vibrant rainbow colors in English!',
                'content_chunks' => [
                    [
                        'title' => 'Friendly English Greetings',
                        'text' => "Good morning! (Selamat pagi)\nGood afternoon! (Selamat siang/sore)\nHow are you? I am fine, thank you!",
                        'highlight' => 'Good Morning, Good Afternoon, Hello & Goodbye'
                    ],
                    [
                        'title' => 'Colors of the Rainbow',
                        'text' => "Red is merah, Blue is biru, Yellow is kuning.\nGreen is hijau, Pink is merah muda, and White is putih!",
                        'highlight' => 'Red, Blue, Yellow, Green, Pink, Purple'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 7,
            ],
            [
                'id' => 45,
                'subject_id' => 5,
                'grade' => 2,
                'chapter_number' => 1,
                'title' => 'Numbers 1-20, Farm Animals & Sweet Fresh Fruits',
                'slug' => 'numbers-animals-and-fruits',
                'summary' => 'Count one to twenty with ease, name cute animals like cat and duck, and yummy fruits like apples and bananas!',
                'content_chunks' => [
                    [
                        'title' => 'Counting Numbers 1 to 20',
                        'text' => "One, two, three, four, five, six, seven, eight, nine, ten!\nEleven, twelve, thirteen, fourteen, fifteen... up to twenty!",
                        'highlight' => 'One (1) to Twenty (20)'
                    ],
                    [
                        'title' => 'Cute Animals and Fruits',
                        'text' => "Cat is kucing, Dog is anjing, Bird is burung, Rabbit is kelinci.\nApple is apel, Banana is pisang, Orange is jeruk, and Grape is anggur.",
                        'highlight' => 'Cat, Rabbit, Apple, Banana, Orange'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 7,
            ],
            [
                'id' => 46,
                'subject_id' => 5,
                'grade' => 3,
                'chapter_number' => 1,
                'title' => 'Days of the Week, 12 Months & Telling the Time',
                'slug' => 'days-months-and-telling-time',
                'summary' => 'Sunday, Monday, Tuesday... learn the days of the week, calendar months, and ask "What time is it?" with confidence!',
                'content_chunks' => [
                    [
                        'title' => '7 Days of the Week',
                        'text' => "Sunday (Minggu), Monday (Senin), Tuesday (Selasa), Wednesday (Rabu),\nThursday (Kamis), Friday (Jumat), and Saturday (Sabtu).",
                        'highlight' => 'Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday'
                    ],
                    [
                        'title' => 'Telling Time with O\'clock',
                        'text' => "What time is it? (Jam berapa sekarang?)\nIt is seven o'clock (Sekarang jam tujuh tepat).\nIt is half past eight (Sekarang jam setengah sembilan).",
                        'highlight' => 'O\'clock (Tepat) & Half past (Lewat 30 Menit)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 8,
            ],
            [
                'id' => 47,
                'subject_id' => 5,
                'grade' => 4,
                'chapter_number' => 1,
                'title' => 'Things in Classroom, Family Tree & Prepositions',
                'slug' => 'classroom-family-and-prepositions',
                'summary' => 'Look inside your school bag, introduce your lovely family members, and master position words: in, on, under, behind!',
                'content_chunks' => [
                    [
                        'title' => 'Things in the Classroom',
                        'text' => "Book (buku), Pencil (pensil), Eraser (penghapus), Ruler (penggaris),\nDesk (meja), Chair (kursi), and Whiteboard (papan tulis putih).",
                        'highlight' => 'Pencil, Book, Bag, Ruler, Eraser'
                    ],
                    [
                        'title' => 'Prepositions of Place (In, On, Under)',
                        'text' => "The apple is ON the table (Apel di atas meja).\nThe book is IN the bag (Buku di dalam tas).\nThe cat is UNDER the chair (Kucing di bawah kursi).",
                        'highlight' => 'In (Di dalam), On (Di atas), Under (Di bawah)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 9,
            ],
            [
                'id' => 48,
                'subject_id' => 5,
                'grade' => 5,
                'chapter_number' => 1,
                'title' => 'My Daily Routine & Exploring Inspiring Professions',
                'slug' => 'daily-routine-and-professions',
                'summary' => 'Describe your day using Simple Present Tense, and explore future dream jobs: doctor, pilot, scientist, and teacher!',
                'content_chunks' => [
                    [
                        'title' => 'My Cheerful Daily Routine',
                        'text' => "I wake up at six o'clock every morning.\nI take a bath, brush my teeth, have breakfast, and go to school by bicycle.",
                        'highlight' => 'Wake up, Take a bath, Have breakfast, Go to school'
                    ],
                    [
                        'title' => 'What Do You Want to Be?',
                        'text' => "A doctor heals sick patients in the hospital.\nA teacher educates smart students at school.\nA pilot flies airplanes across the world sky!",
                        'highlight' => 'Doctor, Teacher, Pilot, Firefighter, Scientist'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 10,
            ],
            [
                'id' => 49,
                'subject_id' => 5,
                'grade' => 6,
                'chapter_number' => 1,
                'title' => 'Asking for Directions, Feelings & Simple Past Tense',
                'slug' => 'directions-feelings-and-past-tense',
                'summary' => 'How to ask where the bookstore is (turn left/right), describe happy emotions, and tell past stories using regular verbs!',
                'content_chunks' => [
                    [
                        'title' => 'Giving and Asking for Directions',
                        'text' => "Excuse me, where is the library?\nGo straight, and then turn left! It is next to the science laboratory.",
                        'highlight' => 'Turn left (Belok kiri), Turn right (Belok kanan), Go straight (Lurus)'
                    ],
                    [
                        'title' => 'Simple Past Tense (Telling Past Events)',
                        'text' => "Yesterday, I played football with my best friends.\nLast Sunday, we visited our grandparents in the green countryside.",
                        'highlight' => 'Play -> Played, Visit -> Visited, Watch -> Watched'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 10,
            ],

            // =========================================================================
            // 6. SBdP (SENI BUDAYA DAN PRAKARYA) - subject_id: 6
            // =========================================================================
            [
                'id' => 50,
                'subject_id' => 6,
                'grade' => 1,
                'chapter_number' => 1,
                'title' => 'Mengenal Warna Primer & Seni Melipat Origami',
                'slug' => 'warna-primer-dan-seni-origami',
                'summary' => 'Tiga warna pokok: merah, kuning, biru dapat melahirkan warna baru! Dan serunya melipat kertas origami menjadi burung terbang.',
                'content_chunks' => [
                    [
                        'title' => 'Tiga Warna Primer yang Ajaib',
                        'text' => "Warna primer adalah warna dasar: Merah, Kuning, dan Biru.\nMerah dicampur Kuning menghasilkan warna Oranye.\nKuning dicampur Biru menghasilkan warna Hijau segar!",
                        'highlight' => 'Merah + Kuning = Oranye, Kuning + Biru = Hijau'
                    ],
                    [
                        'title' => 'Seni Melipat Kertas Origami',
                        'text' => "Origami adalah seni melipat kertas indah dari Jepang.\nDengan mengikuti lipatan garis diagonal, kita bisa membuat katak loncat dan perahu layar!",
                        'highlight' => 'Origami Melatih Ketelitian dan Kreativitas Tangan'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 8,
            ],
            [
                'id' => 51,
                'subject_id' => 6,
                'grade' => 2,
                'chapter_number' => 1,
                'title' => 'Panjang Pendek Nada Ketukan & Gerak Tari Alam',
                'slug' => 'panjang-pendek-nada-dan-tari-alam',
                'summary' => 'Menyanyikan lagu anak dengan birama 2/4 dan 3/4, serta menirukan gerakan ranting pohon dan kupu-kupu menari.',
                'content_chunks' => [
                    [
                        'title' => 'Panjang dan Pendek Nada Musik',
                        'text' => "Nada adalah bunyi yang beraturan.\nNada panjang dibunyikan lebih lama, sedangkan nada pendek dibunyikan sekejap mengikuti ketukan birama lagu.",
                        'highlight' => 'Ketukan Musik Membuat Lagu Terdengar Harmonis'
                    ],
                    [
                        'title' => 'Gerak Tari Menirukan Alam',
                        'text' => "Melambaikan kedua tangan ke atas menirukan dahan pohon tertiup angin sepoi.\nMengayunkan tangan perlahan menirukan kepakan sayap kupu-kupu di taman bunga.",
                        'highlight' => 'Menari Melatih Kelenturan Tubuh yang Gemulai'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 8,
            ],
            [
                'id' => 52,
                'subject_id' => 6,
                'grade' => 3,
                'chapter_number' => 1,
                'title' => 'Gambar Dekoratif & Karya Kolase/Mozaik Alami',
                'slug' => 'gambar-dekoratif-dan-karya-kolase',
                'summary' => 'Menghias gambar hewan dengan motif batik dekoratif dan menempelkan biji jagung serta daun kering menjadi karya kolase indah.',
                'content_chunks' => [
                    [
                        'title' => 'Seni Gambar Dekoratif',
                        'text' => "Gambar dekoratif adalah gambar hiasan berpola garis, lingkaran, dan motif alam tanpa meninggalkan bentuk aslinya.",
                        'highlight' => 'Gambar Dekoratif Indah Dipandang Mata'
                    ],
                    [
                        'title' => 'Karya Seni Kolase dan Mozaik',
                        'text' => "Kolase dibuat dengan menempelkan potongan bahan alam (biji-bijian, daun kering, cangkang telur) ke atas pola gambar.\nMozaik dibuat dari potongan kertas origami berwarna-warni.",
                        'highlight' => 'Menempel Bahan Alami dengan Lem Rapi'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 9,
            ],
            [
                'id' => 53,
                'subject_id' => 6,
                'grade' => 4,
                'chapter_number' => 1,
                'title' => 'Tempo Lagu Anak & Ragam Alat Musik Tradisional',
                'slug' => 'tempo-lagu-dan-alat-musik-tradisional',
                'summary' => 'Mengenal tempo cepat (allegro), sedang (moderato), dan lambat (andante), serta alunan merdu angklung dan gamelan.',
                'content_chunks' => [
                    [
                        'title' => 'Macam-Macam Tempo Musik',
                        'text' => "Tempo adalah cepat lambatnya suatu lagu dinyanyikan.\nLagu bertema ceria biasanya bertempo cepat, sedangkan lagu nina bobo bertempo lambat dan tenang.",
                        'highlight' => 'Tempo Allegro (Cepat), Moderato (Sedang), Andante (Lambat)'
                    ],
                    [
                        'title' => 'Alat Musik Tradisional Nusantara',
                        'text' => "Angklung dari Jawa Barat dimainkan dengan cara digoyangkan.\nGamelan dari Jawa dimainkan dengan dipukul.\nSasando dari NTT dimainkan dengan dipetik indah.",
                        'highlight' => 'Angklung (Digoyang), Gamelan (Dipukul), Sasando (Dipetik)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 9,
            ],
            [
                'id' => 54,
                'subject_id' => 6,
                'grade' => 5,
                'chapter_number' => 1,
                'title' => 'Gambar Ilustrasi, Komik Ceria & Cerita Bergambar',
                'slug' => 'gambar-ilustrasi-dan-komik',
                'summary' => 'Membuat karakter kartun yang ekspresif, balon dialog kata, dan alur panel komik yang seru untuk dibaca kawan!',
                'content_chunks' => [
                    [
                        'title' => 'Unsur Gambar Cerita (Ilustrasi)',
                        'text' => "Gambar ilustrasi berfungsi memperjelas isi cerita atau naskah buku.\nKomik adalah gambar berurutan yang membentuk alur cerita lengkap dengan balon kata dialog tokoh.",
                        'highlight' => 'Panel Gambar + Balon Kata = Komik Seru'
                    ],
                    [
                        'title' => 'Teknik Pewarnaan Kering dan Basah',
                        'text' => "Pewarnaan kering menggunakan pensil warna dan krayon tanpa air.\nPewarnaan basah menggunakan cat air dan kuas di atas kertas gambar tebal.",
                        'highlight' => 'Krayon & Pensil Warna (Kering) vs Cat Air (Basah)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 10,
            ],
            [
                'id' => 55,
                'subject_id' => 6,
                'grade' => 6,
                'chapter_number' => 1,
                'title' => 'Tangga Nada Diatonis Mayor-Minor & Seni Patung 3D',
                'slug' => 'tangga-nada-dan-seni-patung',
                'summary' => 'Ciri khas lagu bertangga nada mayor yang bersemangat dan minor yang syahdu, serta teknik membentuk patung tiga dimensi.',
                'content_chunks' => [
                    [
                        'title' => 'Tangga Nada Diatonis Mayor dan Minor',
                        'text' => "Tangga nada mayor berjarak 1 - 1 - 1/2 - 1 - 1 - 1 - 1/2, bernada riang gembira dan bersemangat (contoh: Halo-Halo Bandung).\nTangga nada minor bernada syahdu dan sedih (contoh: Gugur Bunga).",
                        'highlight' => 'Mayor (Bersemangat) vs Minor (Khidmat/Syahdu)'
                    ],
                    [
                        'title' => 'Seni Patung Tiga Dimensi (3D)',
                        'text' => "Karya seni 3 dimensi memiliki panjang, lebar, dan ruang volume yang dapat dilihat dari berbagai arah.\nBahan lunak seperti plastisin dan tanah liat dibentuk memakai teknik membutsir.",
                        'highlight' => 'Memiliki Panjang, Lebar, dan Ruang Volume'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1569172122301-bc500f309134?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/ocWgSgMGxKA',
                'duration_minutes' => 11,
            ],

            // =========================================================================
            // 7. PJOK (PENDIDIKAN JASMANI, OLAHRAGA & KESEHATAN) - subject_id: 7
            // =========================================================================
            [
                'id' => 56,
                'subject_id' => 7,
                'grade' => 1,
                'chapter_number' => 1,
                'title' => 'Gerak Dasar Lokomotor, Non-Lokomotor & Manipulatif',
                'slug' => 'gerak-dasar-lokomotor-nonlokomotor',
                'summary' => 'Berlari lincah (lokomotor), memutar badan di tempat (non-lokomotor), dan melempar-menangkap bola kasti (manipulatif)!',
                'content_chunks' => [
                    [
                        'title' => 'Gerak Lokomotor (Berpindah Tempat)',
                        'text' => "Gerak lokomotor adalah gerakan yang berpindah tempat dari satu titik ke titik lain.\nContohnya: berjalan santai, berlari cepat, dan melompat rintangan.",
                        'highlight' => 'Lokomotor = Berpindah Tempat (Lari, Lompat, Jalan)'
                    ],
                    [
                        'title' => 'Gerak Non-Lokomotor & Manipulatif',
                        'text' => "Gerak non-lokomotor dilakukan di tempat: menekuk lutut dan memutar pinggang.\nGerak manipulatif melibatkan benda: melempar dan menangkap bola kasti.",
                        'highlight' => 'Non-Lokomotor (Di Tempat) & Manipulatif (Memakai Benda/Bola)'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/g3yW7B0bZ_Y',
                'duration_minutes' => 7,
            ],
            [
                'id' => 57,
                'subject_id' => 7,
                'grade' => 2,
                'chapter_number' => 1,
                'title' => 'Senam Irama Ceria & Kebiasaan 6 Langkah Cuci Tangan',
                'slug' => 'senam-irama-dan-kebersihan-tubuh',
                'summary' => 'Melangkah dan mengayun tangan berirama musik riang, serta mempraktikkan cara mencuci tangan dengan sabun yang higienis.',
                'content_chunks' => [
                    [
                        'title' => 'Senam Irama Penuh Semangat',
                        'text' => "Senam irama menggabungkan gerakan langkah kaki dan ayunan lengan mengikuti irama ketukan musik.\nSenam membuat jantung sehat dan otot tubuh menjadi lentur.",
                        'highlight' => 'Gerak Tubuh Selaras Irama Musik'
                    ],
                    [
                        'title' => '6 Langkah Mencuci Tangan Bersih',
                        'text' => "Gunakan air mengalir dan sabun busa.\nGosok telapak, punggung tangan, sela-sela jari, ujung kuku, dan ibu jari selama 20 detik agar kuman kabur!",
                        'highlight' => 'Cuci Tangan Memakai Sabun dan Air Mengalir'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/g3yW7B0bZ_Y',
                'duration_minutes' => 7,
            ],
            [
                'id' => 58,
                'subject_id' => 7,
                'grade' => 3,
                'chapter_number' => 1,
                'title' => 'Permainan Gobak Sodor & Latihan Kelincahan Kaki',
                'slug' => 'gobak-sodor-dan-kelincahan-kaki',
                'summary' => 'Serunya permainan tradisional gobak sodor untuk melatih kelincahan gerak, kecepatan lari, dan kekompakan tim regu!',
                'content_chunks' => [
                    [
                        'title' => 'Aturan Permainan Gobak Sodor',
                        'text' => "Permainan beregu yang dimainkan di lapangan bergaris petak.\nSatu regu berjaga di garis batas, regu penyerang berusaha melewati garis tanpa tersentuh tangan penjaga.",
                        'highlight' => 'Melatih Kerja Sama Tim dan Kecepatan Berlari'
                    ],
                    [
                        'title' => 'Latihan Kelincahan dan Kebugaran',
                        'text' => "Lari zig-zag melewati corong melatih kaki agar lincah berbelok tanpa terjatuh.\nMinum air putih secukupnya setelah berolahraga agar tubuh tidak lemas.",
                        'highlight' => 'Lari Zig-Zag Melatih Refleks dan Kelincahan'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/g3yW7B0bZ_Y',
                'duration_minutes' => 8,
            ],
            [
                'id' => 59,
                'subject_id' => 7,
                'grade' => 4,
                'chapter_number' => 1,
                'title' => 'Teknik Dasar Bola Besar: Sepak Bola & Bola Voli',
                'slug' => 'teknik-sepakbola-dan-bolavoli',
                'summary' => 'Mengoper bola dengan kaki bagian dalam, passing bawah bola voli yang stabil, serta menjunjung tinggi sportivitas di lapangan!',
                'content_chunks' => [
                    [
                        'title' => 'Teknik Mengoper Sepak Bola (Passing)',
                        'text' => "Gunakan kaki bagian dalam untuk mengoper bola mendatar ke kaki rekan setim.\nPosisikan badan seimbang dan pandangan tertuju ke arah sasaran operan.",
                        'highlight' => 'Passing Kaki Bagian Dalam = Operan Akurat'
                    ],
                    [
                        'title' => 'Passing Bawah Bola Voli & Sportivitas',
                        'text' => "Rapatkan kedua tangan dan luruskan siku saat menyambut bola voli yang melambung.\nKalah atau menang tetap bersalaman dan saling menghormati lawan.",
                        'highlight' => 'Sportivitas = Saling Menghormati dan Jujur'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/g3yW7B0bZ_Y',
                'duration_minutes' => 9,
            ],
            [
                'id' => 60,
                'subject_id' => 7,
                'grade' => 5,
                'chapter_number' => 1,
                'title' => 'Senam Lantai Guling Depan, Renang Dasar & P3K',
                'slug' => 'senam-lantai-renang-dan-p3k',
                'summary' => 'Cara aman berguling ke depan di matras, meluncur di kolam renang, dan mengobati luka lecet memakai obat antiseptik.',
                'content_chunks' => [
                    [
                        'title' => 'Teknik Aman Guling Depan (Forward Roll)',
                        'text' => "Lakukan pemanasan terlebih dahulu.\nTumpukan telapak tangan di matras, tekuk dagu menempel ke dada, dan gulingkan badan dengan lembut.",
                        'highlight' => 'Dagu Menempel Dada Menjaga Leher Tetap Aman'
                    ],
                    [
                        'title' => 'Keselamatan di Kolam & Kotak P3K',
                        'text' => "Jangan berlari di tepi kolam karena licin.\nJika lutut tergores lecet, bersihkan dengan air mengalir lalu oleskan cairan antiseptik dari kotak P3K.",
                        'highlight' => 'P3K = Pertolongan Pertama Pada Kecelakaan'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/g3yW7B0bZ_Y',
                'duration_minutes' => 10,
            ],
            [
                'id' => 61,
                'subject_id' => 7,
                'grade' => 6,
                'chapter_number' => 1,
                'title' => 'Latihan Daya Tahan Jantung & Menolak Bahaya Rokok',
                'slug' => 'daya-tahan-jantung-dan-bahaya-rokok',
                'summary' => 'Meningkatkan kapasitas paru-paru dengan jogging santai, push-up anak, serta komitmen kuat menjauhi asap rokok dan NAPZA.',
                'content_chunks' => [
                    [
                        'title' => 'Latihan Daya Tahan Jantung dan Paru',
                        'text' => "Lari pelan (jogging) selama 15 menit memperkuat otot jantung memompa darah segar.\nLatihan push-up dan sit-up memperkuat otot lengan dan perut kita.",
                        'highlight' => 'Kebugaran Jasmani Menangkal Berbagai Penyakit'
                    ],
                    [
                        'title' => 'Katakan Tidak pada Asap Rokok & NAPZA!',
                        'text' => "Rokok mengandung zat racun nikotin dan tar yang merusak paru-paru dan jantung.\nJadilah anak cerdas yang berani menolak ajakan merokok demi masa depan gemilang!",
                        'highlight' => 'Paru-Paru Bersih, Hidup Sehat dan Berprestasi'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/g3yW7B0bZ_Y',
                'duration_minutes' => 10,
            ],

            // =========================================================================
            // 8. PENDIDIKAN AGAMA & BUDI PEKERTI - subject_id: 8
            // =========================================================================
            [
                'id' => 62,
                'subject_id' => 8,
                'grade' => 1,
                'chapter_number' => 1,
                'title' => 'Mengenal Tuhan Yang Maha Esa & Mensyukuri Ciptaan-Nya',
                'slug' => 'mengenal-tuhan-dan-mensyukuri-ciptaan',
                'summary' => 'Tuhan menciptakan matahari hangat, pepohonan rindang, dan tubuh kita yang sehat. Mari bersyukur setiap hari!',
                'content_chunks' => [
                    [
                        'title' => 'Tuhan Maha Pencipta Alam Semesta',
                        'text' => "Langit biru, bintang berkelap-kelip, dan lautan luas adalah ciptaan Tuhan Yang Maha Esa.\nTuhan Maha Pengasih dan Maha Penyayang kepada semua makhluk.",
                        'highlight' => 'Tuhan Maha Pencipta Seluruh Alam Semesta'
                    ],
                    [
                        'title' => 'Wujud Syukur dalam Keseharian',
                        'text' => "Bersyukur dilakukan dengan merawat tanaman, tidak menyakiti binatang, serta menjaga kesehatan tubuh anugerah Tuhan.",
                        'highlight' => 'Menyayangi Alam Adalah Wujud Syukur'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 7,
            ],
            [
                'id' => 63,
                'subject_id' => 8,
                'grade' => 2,
                'chapter_number' => 1,
                'title' => 'Tata Cara Ibadah Wajib & Doa Harian Anak Beriman',
                'slug' => 'tata-cara-ibadah-dan-doa-harian',
                'summary' => 'Berdoa sebelum makan, doa sebelum tidur, serta mengenal 6 tempat ibadah yang tenang dan suci di nusantara.',
                'content_chunks' => [
                    [
                        'title' => 'Membiasakan Berdoa Sehari-hari',
                        'text' => "Awali makan minum dengan doa syukur agar berkah.\nBerdoalah sebelum tidur di malam hari agar dilindungi dan bangun dengan ceria.",
                        'highlight' => 'Doa Menenangkan Hati dan Membawa Kebaikan'
                    ],
                    [
                        'title' => 'Mengenal Rumah Ibadah di Indonesia',
                        'text' => "Masjid untuk umat Islam, Gereja untuk umat Kristen dan Katolik,\nPura untuk umat Hindu, Vihara untuk umat Buddha, dan Klenteng untuk umat Khonghucu.",
                        'highlight' => 'Menghormati Seluruh Rumah Ibadah Sahabat Kita'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1548625361-19597c55cb52?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 8,
            ],
            [
                'id' => 64,
                'subject_id' => 8,
                'grade' => 3,
                'chapter_number' => 1,
                'title' => 'Akhlak Mulia: Kejujuran & Menghormati Orang Tua',
                'slug' => 'akhlak-mulia-dan-kejujuran',
                'summary' => 'Indahnya berbicara jujur, tidak mengambil milik orang lain, serta patuh dan berbakti kepada ayah-ibu dan bapak-ibu guru.',
                'content_chunks' => [
                    [
                        'title' => 'Kejujuran Membawa Ketenangan Hati',
                        'text' => "Anak yang jujur selalu mengatakan yang sebenarnya tanpa berbohong.\nOrang jujur dicintai Tuhan dan dipercaya oleh semua sahabatnya.",
                        'highlight' => 'Jujur Adalah Mahkota Perilaku Terpuji'
                    ],
                    [
                        'title' => 'Hormat dan Patuh kepada Orang Tua & Guru',
                        'text' => "Bicara dengan suara lembut kepada ayah dan ibu.\nMendengarkan nasehat guru dengan patuh dan mendoakan kebaikan bagi mereka.",
                        'highlight' => 'Berbakti Kepada Orang Tua dan Menghormati Guru'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 8,
            ],
            [
                'id' => 65,
                'subject_id' => 8,
                'grade' => 4,
                'chapter_number' => 1,
                'title' => 'Kisah Teladan Tokoh Suci Penuh Kasih Sayang & Toleransi',
                'slug' => 'kisah-teladan-dan-toleransi',
                'summary' => 'Meneladani sifat sabar para nabi, rasul, dan tokoh suci yang dermawan, rendah hati, dan cinta damai.',
                'content_chunks' => [
                    [
                        'title' => 'Keteladanan Sifat Sabar dan Pemaaf',
                        'text' => "Tokoh suci tidak pernah membalas kejahatan dengan kejahatan, melainkan dengan senyuman dan doa kebaikan.\nSifat pemaaf dan dermawan membuat hati damai sentosa.",
                        'highlight' => 'Membalas Keburukan dengan Kebaikan yang Tulus'
                    ],
                    [
                        'title' => 'Sikap Toleransi Antarumat Beragama',
                        'text' => "Tidak mengganggu sahabat yang sedang beribadah sesuai keyakinannya.\nSaling berbagi kebahagiaan dan tolong-menolong saat tetangga ditimpa musibah.",
                        'highlight' => 'Toleransi Menjaga Perdamaian dan Kasih Sayang'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 9,
            ],
            [
                'id' => 66,
                'subject_id' => 8,
                'grade' => 5,
                'chapter_number' => 1,
                'title' => 'Meneladani Nilai Integritas, Amanah & Menghormati Guru',
                'slug' => 'integritas-amanah-dan-menghormati-guru',
                'summary' => 'Mempelajari arti penting bersikap jujur dalam perkataan dan perbuatan, menjaga amanah titipan, serta memuliakan guru yang telah membimbing kita.',
                'content_chunks' => [
                    [
                        'title' => 'Integritas dan Kejujuran Budi Pekerti',
                        'text' => "Integritas adalah keselarasan yang utuh antara hati nurani, perkataan jujur, dan tindakan nyata sehari-hari.\nAnak yang memiliki integritas tidak akan berbuat curang meskipun tidak ada orang lain yang melihatnya.",
                        'highlight' => 'Kejujuran Mencerminkan Ketinggian Moral Anak Bangsa'
                    ],
                    [
                        'title' => 'Menjaga Amanah dan Menepati Janji',
                        'text' => "Amanah berarti memegang teguh dan menjaga kepercayaan yang diberikan orang lain kepada kita.\nSaat diberi titipan pesan, barang berharga, atau tugas kepemimpinan, laksanakanlah dengan rasa tanggung jawab tinggi.",
                        'highlight' => 'Amanah Membawa Kemuliaan dan Kepercayaan Abadi'
                    ],
                    [
                        'title' => 'Menghormati dan Memuliakan Guru',
                        'text' => "Guru adalah orang tua kedua kita di sekolah yang dengan sabar membimbing dan mencurahkan ilmu bermanfaat.\nAdab santun berbicara dan mendengarkan penjelasan guru membuka pintu keberkahan dalam menuntut ilmu.",
                        'highlight' => 'Berbakti dan Berterima Kasih kepada Pahlawan Tanpa Tanda Jasa'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 10,
            ],
            [
                'id' => 67,
                'subject_id' => 8,
                'grade' => 6,
                'chapter_number' => 1,
                'title' => 'Indahnya Toleransi, Kerukunan Beragama & Kepedulian Sosial',
                'slug' => 'toleransi-kerukunan-dan-kepedulian-sosial',
                'summary' => 'Menumbuhkan sikap saling menghargai perbedaan keyakinan, menjunjung tinggi toleransi dalam bingkai Bhinneka Tunggal Ika, dan gemar menolong sesama.',
                'content_chunks' => [
                    [
                        'title' => 'Hakikat Toleransi Antarumat Beragama',
                        'text' => "Toleransi adalah sikap saling menghormati dan menghargai perbedaan keyakinan tanpa mengorbankan prinsip aqidah masing-masing.\nMemberikan kenyamanan bagi tetangga berbeda agama untuk beribadah adalah tanda kedewasaan budi pekerti.",
                        'highlight' => 'Menjunjung Tinggi Sikap Saling Menghormati dalam Keberagaman'
                    ],
                    [
                        'title' => 'Bhinneka Tunggal Ika: Berbeda Tetap Satu Jua',
                        'text' => "Indonesia diberkahi oleh Tuhan Yang Maha Esa dengan keberagaman suku bangsa, ras, bahasa daerah, dan agama.\nPersaudaraan sebangsa yang kokoh dibangun atas dasar saling mengasihi dan gotong royong tanpa sekat perbedaan.",
                        'highlight' => 'Persatuan Nusantara di Bawah Panji Pancasila'
                    ],
                    [
                        'title' => 'Kepedulian Sosial dan Kasih Sayang Universal',
                        'text' => "Seluruh ajaran agama mewajibkan umatnya untuk peduli kepada sesama, terutama kaum dhuafa, yatim piatu, dan orang yang tertimpa musibah.\nTangan yang ringan menolong orang lain akan senantiasa diberkahi kemudahan rezeki dan kebahagiaan hati.",
                        'highlight' => 'Tolong-Menolong Menghadirkan Kedamaian di Muka Bumi'
                    ],
                ],
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
                'video_url' => 'https://www.youtube.com/embed/Fe8u2I3vmHU',
                'duration_minutes' => 10,
            ],
        ];

        foreach ($lessons as $lesson) {
            Lesson::updateOrCreate(['id' => $lesson['id']], $lesson);
        }
    }
}
