<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Attachment;
use App\Models\Office;
use App\Models\Property;
use App\Models\Checklist;
use App\Notifications\JobCompleted;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\AppointmentRequest;

class AppointmentsController extends Controller
{

  public function __construct()
  {
    $this->middleware('permission:view-appointments|create-appointments|update-appointments|delete-appointments', ['only' => ['index', 'events']]);
    $this->middleware('permission:create-appointments', ['only' => ['store']]);
    $this->middleware('permission:update-appointments', ['only' => ['markAppointmentCompleted', 'uploadImage', 'update']]);
    $this->middleware('permission:delete-appointments', ['only' => ['deleteImage', 'destroy']]);
  }

  /**
   * Display a listing of the resource.
   *
   * @return Response
   */
  public function index(): Response
  {
    $auth_user = auth()->user();
    // User table's host_id means host_id for a Host, cleaner_id for a Cleaner
    $auth_cleaner_id = $auth_user->hasRole('Cleaner') ? $auth_user->host_id : null;

    $properties = Property::query()
      ->when($auth_user->hasPermissionTo('only-assigned-regions')
        || $auth_user->hasPermissionTo('only-assigned-offices'), function($query) use($auth_user) {
        if ($auth_user->hasPermissionTo('only-assigned-regions')) {
          // $query->whereIn('office_id', Office::where('region_id', $auth_user->region_id)->pluck('id'));
          $query->where('company_owner_id', $auth_user->id);
        } else {
          $query->where('office_id', $auth_user->office_id);
        }
      })->when($auth_cleaner_id, function($query) use($auth_cleaner_id) {
        $query->where('primary_cleaner_id', $auth_cleaner_id)->orWhere('secondary_cleaner_id', $auth_cleaner_id);
      })->get()->map(fn($property) => [
        'id' => $property->id,
        'name' => $property->name
      ]);
    return Inertia::render('Calendar/Calendar', [
      'properties' => $properties
    ]);
  }

  /**
   * @param Request $request
   * @return JsonResponse
   */
  public function events(Request $request): JsonResponse
  {
    $auth_user = auth()->user();
    // User table's host_id means host_id for a Host, cleaner_id for a Cleaner
    $auth_cleaner_id = $auth_user->hasRole('Cleaner') ? $auth_user->host_id : null;
    $auth_host_id = $auth_user->hasRole('Host') ? $auth_user->host_id : null;

    $start = Carbon::parse($request->get('start'))->format('Y-m-d');
    $end = Carbon::parse($request->get('end'))->format('Y-m-d');
    $events = Appointment::query()
      ->from('appointments as a1')
      ->select('a1.*', DB::raw('(SELECT MIN(a2.start) FROM appointments a2 WHERE a2.property_id = a1.property_id AND a2.start > a1.start) as next_start'))
      ->with(['property:id,name,property_number,address_line_1,address_line_2,zip_code,city,state,beds,baths,check_out_time,check_in_time,notes', 'property.attachments'])
      ->when($auth_user->hasPermissionTo('only-assigned-regions')
        || $auth_user->hasPermissionTo('only-assigned-offices'), function($query) use($auth_user) {
        // if ($auth_user->hasPermissionTo('only-assigned-regions')) {
        //   $offices = Office::where('region_id', $auth_user->region_id)->pluck('id')->toArray();
        // } else {
        //   $offices = [$auth_user->office_id];
        // }
        // $query->whereIn('property_id', DB::table('properties')->whereIn('office_id', $offices)->pluck('id'));
        $query->whereIn('property_id', DB::table('properties')->where('company_owner_id', $auth_user->id)->pluck('id'));
      })->when($auth_cleaner_id, function($query) use($auth_cleaner_id) {
        $query->whereIn('a1.property_id', DB::table('properties')->select('id')->where('primary_cleaner_id', $auth_cleaner_id)->orWhere('secondary_cleaner_id', $auth_cleaner_id)->pluck('id'));
      })->when($auth_host_id, function($query) use($auth_host_id) {
        $query->whereIn('a1.property_id', DB::table('properties')->select('id')->where('host_id', $auth_host_id)->pluck('id'));
      })
      // ->whereDate('a1.start', '>=', $start)
      // ->whereDate('a1.end', '<=', $end)
      ->get()
      ->map(fn($event) => [
        'id' => $event->id,
        'uid' => $event->uid,
        'title' => $event->property->property_number . ' - ' . $event->property->name,
        'date' => $event->end,
        'start_time' => $event->start,
        'end_time' => $event->end,
        'next_start' => $event->next_start,
        'address' => $event->property->address_line_1 . ' ' . $event->property->address_line_2 . ' ' . $event->property->city . ', ' . $event->property->state . ', ' . $event->property->zip_code,
        'property' => $event->property,
        'description' => nl2br(stripcslashes($event->description)),
        'summary' => $event->summary,
        'started_at' => $event->started_at,
        'completed_at' => $event->completed_at,
        'attachments' => $event->property->attachments->map(fn($attachment) => [
          'id' => $attachment->id,
          'name' => $attachment->file_name,
          'size' => $attachment->file_size,
          'url' => config('app.url') . "/storage/" . $attachment->url,
          'mime_type' => $attachment->mime_type
        ]),
        'backgroundColor' => $event->completed_at !== null ? '#00b54b' : ($event->started_at !== null ? '#fecb00' : '#4a6bdc'),
        'borderColor' => $event->completed_at !== null ? '#00b54b' : ($event->started_at !== null ? '#fecb00' : '#4a6bdc'),
        'assigned_to' => $event->assigned_to,
        'cleaner' => $event->cleaner
      ]);
    return response()->json($events);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param Request $request
   * @return JsonResponse|\Illuminate\Http\Response
   */
  public function store(Request $request): \Illuminate\Http\Response|JsonResponse
  {
    $validator = Validator::make($request->all(), [
      'property_id' => 'required',
      'description' => 'required|min:3',
      'start' => 'required|date|after_or_equal:now',
      'end' => 'required|date|after_or_equal:start',
      'summary' => 'nullable'
    ]);
    if ($validator->fails()) {
      $formatted_errors = [];
      foreach (collect($validator->errors()) as $key => $errors) {
        $formatted_errors[$key] = $errors[0];
      }
      return response()->json([
        'errors' => $formatted_errors
      ], 422);
    }
    // Check if no appointment exists in the current range
    $appointment = Appointment::where(function ($query) use ($request) {
      $start = Carbon::parse($request->get('start'))->format('Y-m-d');
      $end = Carbon::parse($request->get('end'))->format('Y-m-d');
      $query->whereBetween(DB::raw('DATE(`start`)'), [$start, $end])
        ->orWhereBetween(DB::raw('DATE(`end`)'), [$start, $end]);
    })->first();
    if ($appointment) {
      $start = Carbon::parse($appointment->start)->format('Y-m-d');
      $end = Carbon::parse($appointment->end)->format('Y-m-d');
      return response()->json([
        'error' => "Property already booked between {$start} to {$end}"
      ], 409);
    }
    Appointment::create($request->all());
    return response()->json([
      'message' => 'Appointment created successfully'
    ]);
  }

  public function addJob(Request $request): \Illuminate\Http\Response|JsonResponse
  {
    Appointment::create($request->all());
    return response()->json([
      'message' => 'Appointment created successfully'
    ]);
  }

  public function assignCleaner(Request $request): \Illuminate\Http\Response|JsonResponse
  {
    $appointment = Appointment::findOrFail($request['id']);
    
    $appointment->update($request->all());
    return response()->json([
      'message' => 'Appointment was assigned successfully'
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param Request $request
   * @param int $id
   * @return JsonResponse|\Illuminate\Http\Response
   */
  public function update(Request $request, int $id): \Illuminate\Http\Response|JsonResponse
  {
    try {
      $validator = Validator::make($request->all(), [
        'property_id' => 'required|numeric',
        'description' => 'required|min:3',
        'start' => 'required|date|after_or_equal:now',
        'end' => 'required|date|after_or_equal:start',
        'summary' => 'nullable'
      ]);
      if ($validator->fails()) {
        $formatted_errors = [];
        foreach (collect($validator->errors()) as $key => $errors) {
          $formatted_errors[$key] = $errors[0];
        }
        return response()->json([
          'errors' => $formatted_errors
        ], 422);
      }
      // Check if no appointment exists in the current range
      $appointment = Appointment::where(function ($query) use ($request) {
        $start = Carbon::parse($request->get('start'))->format('Y-m-d');
        $end = Carbon::parse($request->get('end'))->format('Y-m-d');
        $query->whereBetween(DB::raw('DATE(`start`)'), [$start, $end])
          ->orWhereBetween(DB::raw('DATE(`end`)'), [$start, $end]);
      })->where('id', '!=', $id)->first();
      if ($appointment) {
        $start = Carbon::parse($appointment->start)->format('Y-m-d');
        $end = Carbon::parse($appointment->end)->format('Y-m-d');
        return response()->json([
          'error' => "Property already booked between {$start} to {$end}"
        ], 409);
      }
      $appointment = Appointment::findOrFail($id);
      $appointment->update($request->all());
      return response()->json([
        'message' => 'Appointment updated successfully'
      ]);
    } catch (ModelNotFoundException $ex) {
      return response()->json([
        'error' => 'Model not found!'
      ], 404);
    }
  }

  /**
   * @param int $id
   * @return JsonResponse
   */
  public function markAppointmentCompleted(int $id): JsonResponse
  {
    try {
      $appointment = Appointment::with(['attachments', 'property.host', 'checklists'])
        ->where('id', $id)->first();
      if (!$appointment) {
        return response()->json([
          'error' => 'Model not found!'
        ], 404);
      }

      // $checklist = count($appointment->checklists) > 0 ? $appointment->checklists[0] : null;
      // if (!$checklist ||
      //   !$checklist->begin_check_damage ||
      //   !$checklist->begin_personal_belongings ||
      //   !$checklist->begin_temperature ||
      //   !$checklist->begin_washing_linen ||
      //   !$checklist->kitchen_dishwasher ||
      //   !$checklist->kitchen_leftover_food ||
      //   !$checklist->kitchen_trash ||
      //   !$checklist->kitchen_clean_disinfect ||
      //   !$checklist->kitchen_backsplashes ||
      //   !$checklist->kitchen_appliances ||
      //   !$checklist->kitchen_freezer ||
      //   !$checklist->kitchen_floor ||
      //   !$checklist->kitchen_towels ||
      //   !$checklist->bedrooms_sheets_pillowcases ||
      //   !$checklist->bedrooms_floor_beds ||
      //   !$checklist->bedrooms_trash ||
      //   !$checklist->bedrooms_mirrors ||
      //   !$checklist->livingroom_tv ||
      //   !$checklist->livingroom_floors ||
      //   !$checklist->livingroom_cushions_couches ||
      //   !$checklist->livingroom_pillows_blankets ||
      //   !$checklist->livingroom_games_movies ||
      //   !$checklist->livingroom_furniture ||
      //   !$checklist->bathrooms_backsplashes ||
      //   !$checklist->bathrooms_mirrors ||
      //   !$checklist->bathrooms_toilets ||
      //   !$checklist->bathrooms_trash ||
      //   !$checklist->bathrooms_soap ||
      //   !$checklist->bathrooms_toilet_paper ||
      //   !$checklist->bathrooms_drawers_cabinets ||
      //   !$checklist->bathrooms_floors ||
      //   !$checklist->end_walkthrough_check_in_ready ||
      //   !$checklist->end_walkthrough_submit_photos ||
      //   !$checklist->end_walkthrough_trash_doors ||
      //   !$checklist->inventory_kitchen_garbage ||
      //   !$checklist->inventory_kitchen_paper_towels ||
      //   !$checklist->inventory_kitchen_hand_soap ||
      //   !$checklist->inventory_kitchen_dishwasher_pods ||
      //   !$checklist->inventory_bathrooms_hand_soap ||
      //   !$checklist->inventory_bathrooms_toilet_paper ||
      //   !$checklist->inventory_bathrooms_shampoo ||
      //   !$checklist->inventory_bathrooms_body_wash ||
      //   !$checklist->inventory_misc_laundry ||
      //   !$checklist->photos_bathroom ||
      //   !$checklist->photos_bedroom ||
      //   !$checklist->photos_living_room ||
      //   !$checklist->photos_kitchen ||
      //   !$checklist->photos_fridge ||
      //   !$checklist->photos_microwave
      // ) {
      //   return response()->json([
      //     'warning' => 'All checklists must be completed.'
      //   ]);
      // }

      DB::beginTransaction();
      $appointment->update([
        'completed_at' => Carbon::now()
      ]);

//       $host = $appointment->property->host;
//       $next = Appointment::whereDate('start', '>', Carbon::parse($appointment->start)->format('Y-m-d'))
//         ->whereIn('property_id', function ($query) use ($host) {
//           $query->select('id')->from('properties')->where('host_id', $host->id);
//         })->orderBy('start')->first();
//       $host->notify(new JobCompleted([
//         'name' => $host->first_name,
//         'job_number' => $appointment->id,
//         'next_job_date' => $next ? Carbon::parse($next->start)->format('Y-m-d') : null
//       ], $appointment->attachments));
      DB::commit();
      return response()->json([
        'message' => 'Appointment finished successfully'
      ]);
    } catch (Exception $ex) {
      DB::rollback();
      return response()->json([
        'error' => $ex->getMessage()
      ]);
    }
  }

  public function startAppointment(int $id): JsonResponse
  {
    try {
      $appointment = Appointment::where('id', $id)->first();
      if (!$appointment) {
        return response()->json([
          'error' => 'Model not found!'
        ], 404);
      }
      DB::beginTransaction();
      $appointment->update([
        'started_at' => Carbon::now()
      ]);
      DB::commit();
      return response()->json([
        'message' => 'Appointment started cleaning'
      ]);
    } catch (Exception $ex) {
      DB::rollback();
      return response()->json([
        'error' => $ex->getMessage()
      ]);
    }
  }

  /**
   * Attach image to appointment
   */
  public function uploadImage(Request $request, int $id)
  {
    $appointment = Appointment::findOrFail($id);
    if (!$appointment) {
      return response()->json([
        'error' => 'Appointment not found'
      ], 400);
    }
    if (!$request->hasFile('image')) {
      return response()->json([
        'error' => 'Image file is missing'
      ], 400);
    }
    $request->validate([
      'image' => 'required|image|mimes:jpg,jpeg,png'
    ]);
    $path = $request->file('image')->store('public/uploads/images');
    if (!$path) {
      return response()->json([
        'error' => 'The file could not be saved'
      ], 500);
    }
    $uploadedFile = $request->file('image');

    $image = $appointment->attachments()->create([
      'file_name' => $uploadedFile->hashName(),
      'file_size' => $uploadedFile->getSize(),
      'mime_type' => $uploadedFile->getMimeType(),
      'url' => 'uploads/images/' . $uploadedFile->hashName()
    ]);
    return $image;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return JsonResponse|\Illuminate\Http\Response
   */
  public function destroy(int $id): \Illuminate\Http\Response|JsonResponse
  {
    try {
      $appointment = Appointment::with('attachments')->findOrFail($id);
      foreach ($appointment->attachments as $attachment) {
        if (Storage::disk('public')->exists($attachment->url)) {
          Storage::disk('public')->delete($attachment->url);
        }
        $attachment->delete();
      }
      $appointment->delete();
      return response()->json([
        'message' => 'Appointment deleted successfully'
      ], 200);
    } catch (ModelNotFoundException $ex) {
      return response()->json([
        'error' => 'Model not found'
      ], 404);
    }
  }

  /**
   * Retrieves the first checklist associated with a specific appointment.
   *
   * @param int|null $appointment_id The ID of the appointment for which to fetch the checklist. Defaults to null.
   *
   * @return JsonResponse Returns a JSON response containing the checklist data.
   */
  public function checklists(int $appointment_id = null): JsonResponse
  {
    $checklists = Checklist::query()
      ->where('model_id', $appointment_id)
      ->first();

    return response()->json($checklists);
  }

  /**
   * Save checklists associated with an appointment.
   *
   * @param int|null $appointment_id The id of the appointment for the which checklists are being saved. Optional, defaults to null.
   * @return JsonResponse A JSON response containing a success message if save was successful or error message otherwise.
   */
  public function saveChecklists(Request $request, int $appointment_id = null)
  {
    if ($appointment_id) {
      // Check if no checklists exists for the appointment
      $checklist = Checklist::where(function ($query) use ($appointment_id) {
        $query->where('model_id', $appointment_id);
      })->first();

      $data = $request->all();

      if ($checklist) {
        $checklist->update($data);

        return response()->json([
          'message' => 'Checklist updated successfully'
        ]);
      } else {
        Checklist::create(array_merge($data, ['model_id' => $appointment_id, 'model_type' => 'App\Models\Appointment']));

        return response()->json([
          'message' => 'Checklist created successfully'
        ]);
      }
    } else {
      return response()->json([
        'error' => "Appointment not found"
      ], 400);
    }
  }
}
