<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
class UserTableSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'contact_name' =>'Alex',
            'email' =>'alex@mail.com',
            'phone_number'=>'123567498',
            'student_name'=>'Laura',
            'date_of_birth'=>'1979-06-09',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'candidate_number'=>'CN123498',
            'is_authorised'=>1,
        ]);
    }
}
