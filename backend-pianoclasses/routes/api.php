<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::put('/api/users/{userId}/authorization', 'AuthorizerUserController@authorizeUser');

// Route::post('/api/users/{userId}/login', function (Request $request, $userId) {
//     $authorized = $request->input('authorized');

//     if ($authorized) {
//         // El usuario está autorizado, hacer algo aquí
//         return response()->json(['message' => 'Welcome']);
//     } else {
//         // El usuario no está autorizado, devolver un error 403
//         return response()->json(['error' => 'You do not have authorization to log in'], 403);
//     }
// });
Route::post('register', [AuthController::class, 'Register']);
Route::post('login', [AuthController::class, 'Login']);

Route::middleware(['auth:sanctum'])->group(function () {
Route::post('logout', [AuthController::class, 'Logout']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users', 'App\Http\Controllers\Api\UsersController@index');
Route::get('users/{user}', 'App\Http\Controllers\Api\UsersController@show');
Route::post('users','App\Http\Controllers\Api\UsersController@store');
Route::put('users/{user}','App\Http\Controllers\Api\UsersController@update');
Route::delete('users/{user}', 'App\Http\Controllers\Api\UsersController@delete');

Route::controller(LessonController::class)->group(function(){
    Route::get('lessons', 'App\Http\Controllers\Api\LessonController@index');
    Route::get('lesson/{id}', 'App\Http\Controllers\Api\LessonController@show');
    Route::post('lessons','App\Http\Controllers\Api\LessonController@store');
    Route::put('lesson/{id}','App\Http\Controllers\Api\LessonController@update');
    
});
