<?php

namespace App\Http\Controllers;

use App\Http\Requests\CleanerRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{

  /**
   * @param Request $request
   * @return Response
   */
  public function index(): \Inertia\Response
  {
    return Inertia::render('Notifications/NewJobNotification');
  }

  /**
   * @param Request $request
   * @return Response
   */
  public function sendClient(): \Inertia\Response
  {
    return Inertia::render('Notifications/ClientNotification');
  }

  /**
   * @param Request $request
   * @return Response
   */
  public function sendYou(): \Inertia\Response
  {
    return Inertia::render('Notifications/YourNotification');
  }

  /**
   * @param Request $request
   * @return Response
   */
  public function sendReminder(): \Inertia\Response
  {
    return Inertia::render('Notifications/ReminderNotification');
  }

}
