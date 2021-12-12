<?php

use App\Http\Controllers\api\BlogController;
use App\Http\Controllers\API\FileUploadController;
use App\Http\Controllers\API\ForgotPasswordController;
use App\Http\Controllers\API\LayoutController;
use App\Http\Controllers\API\PageController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\api\TemplateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});


// API route for login and register user
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);

// API route for forgotpassword user
Route::post('forget-password', [ForgotPasswordController::class, 'submitForgetPasswordForm'])->name('forget.password.post'); // for sending request
Route::get('reset-password/{token}', [ForgotPasswordController::class, 'showResetPasswordForm'])->name('reset.password.get'); // when user open the link via email
Route::post('reset-password', [ForgotPasswordController::class, 'submitResetPasswordForm'])->name('reset.password.post'); // new and confirm password

// API routes For Admin
Route::group(['prefix' => 'admin', 'as' => 'admin'], function(){
// API route for user crud
    Route::get('/show/user', [\App\Http\Controllers\API\UserController::class, 'show'])->name('admin.show.user');
    Route::post('/store/user', [\App\Http\Controllers\API\UserController::class, 'store'])->name('admin.store.user');
    Route::post('/update/user/{id?}', [\App\Http\Controllers\API\UserController::class, 'update'])->name('admin.update.user');
    Route::post('/delete/user/{id?}', [\App\Http\Controllers\API\UserController::class, 'delete'])->name('admin.delete.user');

// API route for layouts crud
    Route::get('/show/layout', [LayoutController::class, 'show'])->name('admin.show.layout');
    Route::post('/store/layout', [LayoutController::class, 'store'])->name('admin.store.layout');
    Route::post('/update/layout/{id?}', [LayoutController::class, 'update'])->name('admin.update.layout');
    Route::post('/delete/layout/{id?}', [LayoutController::class, 'delete'])->name('admin.delete.layout');

// API route for pages crud
    Route::get('/show/page', [PageController::class, 'show'])->name('admin.show.page');
    Route::post('/store/page', [PageController::class, 'store'])->name('admin.store.page');
    Route::post('/update/page/{id?}', [PageController::class, 'update'])->name('admin.update.page');
    Route::post('/delete/page/{id?}', [PageController::class, 'delete'])->name('admin.delete.page');

    // API route for blogs crud
    Route::get('/show/blog', [BlogController::class, 'show'])->name('admin.show.blog');
    Route::post('/store/blog', [BlogController::class, 'store'])->name('admin.store.blog');
    Route::post('/update/blog/{id?}', [BlogController::class, 'update'])->name('admin.update.blog');
    Route::post('/delete/blog/{id?}', [BlogController::class, 'delete'])->name('admin.delete.blog');

    // API route for blogs crud
    Route::get('/show/tag', [TagController::class, 'show'])->name('admin.show.tag');
    Route::post('/store/tag', [TagController::class, 'store'])->name('admin.store.tag');
    Route::post('/update/tag/{id?}', [TagController::class, 'update'])->name('admin.update.tag');
    Route::post('/delete/tag/{id?}', [TagController::class, 'delete'])->name('admin.delete.tag');

    // API route for Template CRUD
    Route::get('/show/template', [TemplateController::class, 'show'])->name('admin.show.template');
    Route::post('/store/template', [TemplateController::class, 'store'])->name('admin.store.template');
    Route::post('/update/template/{id}', [TemplateController::class, 'update'])->name('admin.update.template');
    Route::post('/delete/template/{id?}', [TemplateController::class, 'delete'])->name('admin.delete.template');
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    // API route for logout user
    Route::post('/logout', [App\Http\Controllers\API\RegisterController::class, 'logout']);
});
