<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('lessons') -> insert ([
            'user_id' =>1,
            'title' =>'Alex',
            'start'=>'2023-03-24 11:00:00',
            'end'=>'2023-03-24 12:00:00',
            'is_confirmed'=>0,
        ]);
    }
}
