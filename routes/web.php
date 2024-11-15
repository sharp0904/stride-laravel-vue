<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GeneralController;
use App\Http\Controllers\HostsController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\OfficesController;
use App\Http\Controllers\RegionsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\PropertiesController;
use App\Http\Controllers\CleanersController;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\StripeController;

Route::get('/', function () {
    return redirect()->to('calendar');
});

Route::group(['middleware' => 'guest'], function() {
    Route::get('/login', [LoginController::class, 'login'])->name('login');
    Route::post('/login', [LoginController::class, 'authenticate']);
    Route::get('/register', [RegisterController::class, 'showRegisterForm'])->name('register.request');
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
    Route::get('/forgot-password', [ForgotPasswordController::class, 'showForgotPasswordForm'])->name('password.request');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'requestPasswordResetLink'])->name('password.email');
    Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetPasswordForm'])->name('password.reset');
    Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword'])->name('password.update');
    Route::get('/stripe', [StripeController::class, 'showStripeForm'])->name('stripe.show');
    Route::post('stripe/initiate', [StripeController::class, 'initiatePayment'])->name('stripe.initiate');
    Route::post('stripe/complete', [StripeController::class, 'completePayment'])->name('stripe.complete');
    Route::post('stripe/failure', [StripeController::class, 'failPayment'])->name('stripe.failure');
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    // Route::get('/dashboard', [PagesController::class, 'dashboard'])->name('dashboard');
    
    // Profile
    Route::get('/profile', [UsersController::class, 'showProfile'])->name('profile');
    Route::put('/profile', [UsersController::class, 'updateProfile'])->name('update-profile');
    Route::put('/users/update/password', [UsersController::class, 'updatePassword'])->name('update-password');

    // Calendar
    Route::get('/calendar', [AppointmentsController::class, 'index'])->name('calendar');
    Route::get('/calendar/events', [AppointmentsController::class, 'events'])->name('calendar-events');
    Route::post('/calendar/appointments/{id}/upload', [AppointmentsController::class, 'uploadImage'])->name('appointments.upload-image');
    Route::delete('/calendar/appointments/attachments/{id}/delete', [GeneralController::class, 'deleteFile'])->name('appointments.delete-image');
    Route::post('/calendar/appointments', [AppointmentsController::class, 'store'])->name('appointments.store');
    Route::post('/calendar/add_job', [AppointmentsController::class, 'addJob'])->name('appointments.add-job');
    Route::post('/calendar/assign_clenaer', [AppointmentsController::class, 'assignCleaner'])->name('appointments.assign-cleaner');
    Route::put('/calendar/appointments/{id}', [AppointmentsController::class, 'update'])->name('appointments.update');
    Route::put('/calendar/appointments/{id}/mark/completed', [AppointmentsController::class, 'markAppointmentCompleted'])->name('appointments.mark-completed');
    Route::put('/calendar/appointments/{id}/start', [AppointmentsController::class, 'startAppointment'])->name('appointments.start-completed');
    Route::delete('/calendar/appointments/{id}', [AppointmentsController::class, 'destroy'])->name('appointments.destroy');
    Route::get('/calendar/appointments/{id}/checklists', [AppointmentsController::class, 'checklists'])->name('appointments.checklists');
    Route::post('/calendar/appointments/{id}/save/checklists', [AppointmentsController::class, 'saveChecklists'])->name('appointments.save-checklists');

    // Host
    Route::resource('hosts', HostsController::class);

    // Property
    Route::resource('properties', PropertiesController::class);
    Route::post('/property/attachments/{id}/upload', [PropertiesController::class, 'uploadImage'])->name('properties.upload-image');
    Route::get('/property/getAllProperties', [PropertiesController::class, 'getAllProperties'])->name('properties.getAllProperties');
    Route::delete('/property/attachments/{id}/delete', [GeneralController::class, 'deleteFile'])->name('properties.delete-image');

    // Cleaner
    Route::resource('cleaners', CleanersController::class);
    Route::post('/cleaner/{id}/upload_agreement', [CleanersController::class, 'uploadAgreement'])->name('cleaner-upload-agreement');
    Route::post('/cleaner/{id}/upload_insurance', [CleanersController::class, 'uploadInsurance'])->name('cleaner-upload-insurance');
    Route::post('/cleaner/{id}/upload_other', [CleanersController::class, 'uploadOther'])->name('cleaner-upload-other');
    Route::delete('/cleaner/{id}/delete_file', [GeneralController::class, 'deleteFile'])->name('cleaner-delete-file');
    Route::get('/cleaner/get_by_office/{id}', [CleanersController::class, 'getCleanersByOffice'])->name('cleaner-by-office');
    Route::get('/cleaner/getAllCleaners', [CleanersController::class, 'getAllCleaners'])->name('cleaner.getAllCleaners');

    // UsersList
    Route::get('/users_list', [UsersController::class, 'getUsersList'])->name('users.list');

    //Notification
    Route::get('/notification/new_job', [NotificationController::class, 'index'])->name('notification.new_job');
    Route::get('/notification/client', [NotificationController::class, 'sendClient'])->name('notification.client');
    Route::get('/notification/you', [NotificationController::class, 'sendYou'])->name('notification.you');
    Route::get('/notification/reminder', [NotificationController::class, 'sendReminder'])->name('notification.reminder');

    // Settings
    Route::group(['prefix' => 'settings'], function() {
        Route::resource('roles', RolesController::class);
        Route::get('offices/region/{regionId}', [App\Http\Controllers\OfficesController::class, 'getOfficesByRegion']);
        Route::resource('offices', OfficesController::class);
        Route::resource('regions', RegionsController::class);
        Route::resource('users', UsersController::class);
    });
});
