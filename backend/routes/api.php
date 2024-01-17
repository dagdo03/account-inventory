<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataController;
use App\Http\Controllers\UserController;

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

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function(){
    Route::get('/me', [UserController::class, 'getme']);
    Route::patch('/data/{id}', [DataController::class, 'updateData'])->whereNumber('id');
    Route::delete('/data/{id}', [DataController::class, 'deleteData'])->whereNumber('id');
    Route::post('/newdata', [DataController::class, 'addAccount']);
    Route::get('/data', [DataController::class, 'showData']);
    Route::get('/logout', [UserController::class, 'logout']);
});


