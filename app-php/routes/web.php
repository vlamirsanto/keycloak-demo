<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [AdminController::class, 'index']);
Route::get('/public', [AdminController::class, 'renderPublic']);
Route::middleware('keycloak-web')->get('/private', [AdminController::class, 'renderPrivate']);

// Route::get('/admin', [AdminController::class, 'index'])->middleware('keycloak-web');
// Route::middleware('keycloak-web')->get('/gate', 'PageController@renderGate');
// Route::middleware('keycloak-web')->get('/private', 'PageController@renderPrivate');
// Route::middleware('keycloak-web')->get('/private/examples', 'PageController@renderExamples');
// Route::middleware('keycloak-web')->get('/private/examples/{example}', 'PageController@renderExample')->name('example');
