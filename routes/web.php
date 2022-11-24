<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\BlogsController;
use App\Http\Controllers\CkeditorController;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::post('ckeditor/image_upload', [CkeditorController::class, 'upload'])->name('upload');
Route::post('image-upload', [CkeditorController::class, 'storeImage'])->name('image.upload');
Route::get('assets/{path}', function ($path) {
    return response()->file(public_path("assets/$path"));
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function() {
        return Inertia::render('Admin/HomeAdmin');
    })->name('dashboard');

    // path for category admin
    Route::get('/categories', [CategoriesController::class, 'index'])->name('categories');
    Route::post('/categories/add', [CategoriesController::class, 'store'])->name('categories-add');
    Route::post('/categories/update/{id}', [CategoriesController::class, 'update'])->name('categories-update');
    Route::delete('/categories/delete/{id}', [CategoriesController::class, 'destroy'])->name('categories-delete');
    // path for blog admin
    Route::get('/blogs', [BlogsController::class, 'index'])->name('blogs');
    Route::post('/blogs/add', [BlogsController::class, 'store'])->name('blogs-add');
    Route::get('/blogs/show/{id}', [BlogsController::class, 'showBlog'])->name('blogs-show');
    Route::post('/blogs/update/{id}', [BlogsController::class, 'update'])->name('blogs-update');
    Route::delete('/blogs/delete/{id}', [BlogsController::class, 'destroy'])->name('blogs-delete');
});

require __DIR__.'/auth.php';
