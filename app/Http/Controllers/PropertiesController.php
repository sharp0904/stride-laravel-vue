<?php

namespace App\Http\Controllers;

use App\Http\Requests\PropertyRequest;
use App\ICal;
use App\Models\Appointment;
use App\Models\Cleaner;
use App\Models\Country;
use App\Models\Host;
use App\Models\Office;
use App\Models\Property;
use App\Models\Attachment;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use DateTime;
use DateInterval;

class PropertiesController extends Controller
{

  public function __construct()
  {
    $this->middleware('permission:view-properties|create-properties|update-properties|delete-properties', ['only' => ['index', 'show']]);
    $this->middleware('permission:create-properties', ['only' => ['create', 'store']]);
    $this->middleware('permission:update-properties', ['only' => ['edit', 'update']]);
    $this->middleware('permission:delete-properties', ['only' => ['destroy']]);
  }

  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   * @return Response | JsonResponse
   */
  public function index(Request $request): Response|JsonResponse
  {
    $columns = [
      'name',
      'address_line_1',
      'address_line_2',
      'zip_code',
      'city',
      'state',
      'country',
      'size',
      'accommodation_size',
    ];
    $q = $request->input('q');
    $host = $request->input('host');
    $cleaner = $request->input('cleaner');
    $auth_user = auth()->user();
    // User table's host_id means host_id for a Host, cleaner_id for a Cleaner
    $auth_cleaner_id = $auth_user->hasRole('Cleaner') ? $auth_user->host_id : null;
    $auth_host_id = $auth_user->hasRole('Host') ? $auth_user->host_id : null;

    $properties = Property::query()
      ->when($q, function ($query, $q) use ($columns) {
        foreach ($columns as $key => $column) {
          $clause = $key == 0 ? 'where' : 'orWhere';
          $query->$clause($column, 'like', "%{$q}%");
        }
      })->when($host, function ($query, $host) {
        $query->where('host_id', $host);
      })->when($cleaner, function ($query, $cleaner) {
        $query->where('primary_cleaner_id', $cleaner)->orWhere('secondary_cleaner_id', $cleaner);
      })->when($auth_user->hasPermissionTo('only-assigned-offices') ||
        $auth_user->hasPermissionTo('only-assigned-regions'), function($query) use($auth_user) {
        // $offices = $auth_user->hasPermissionTo('only-assigned-regions')
        //     ? Office::where('region_id', $auth_user->region_id)->pluck('id') : [$auth_user->office_id];
        // $query->whereIn('office_id', $offices);
        $query->where('company_owner_id', $auth_user->id);
      })->when($auth_cleaner_id, function($query) use($auth_cleaner_id) {
        $query->where('primary_cleaner_id', $auth_cleaner_id)->orWhere('secondary_cleaner_id', $auth_cleaner_id);
      })->when($auth_host_id, function($query) use($auth_host_id) {
        $query->where('host_id', $auth_host_id);
      })
      ->with(['host:id,first_name,last_name', 'office:id,name', 'primaryCleaner', 'secondaryCleaner'])
      ->get()
      ->map(fn($property) => [
        'id' => $property->id,
        'property_number' => $property->property_number,
        'primary_cleaner' => $property->primaryCleaner ? ($property->primaryCleaner->first_name . ' ' . $property->primaryCleaner->last_name) : '',
        'secondary_cleaner' => $property->secondaryCleaner ? ($property->secondaryCleaner->first_name . ' ' . $property->secondaryCleaner->last_name) : '',
        'name' => $property->name,
        'address' => $property->address_line_1,
        'zip_code' => $property->zip_code,
        'city' => $property->city,
        'state' => $property->state,
        'country' => $property->country,
        'host' => $property->host,
        'office' => $property->office
      ]);

    if ($host || $cleaner) {
      return response()->json([
        'properties' => $properties
      ]);
    }
    return Inertia::render('Properties/Index', [
      'properties' => $properties,
      'filters' => [
        'q' => $q
      ]
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return Response
   */
  public function create(): Response
  {
    $hosts = Host::where('company_owner_id', auth()->user()->id)->get()->map(fn($host) => [
      'id' => $host->id,
      'name' => $host->first_name . ' ' . $host->last_name
    ]);
    $auth_user = auth()->user();
    $offices = Office::query()
      ->when($auth_user->hasPermissionTo('only-assigned-offices'), function($query) use($auth_user) {
        // $query->where('id', $auth_user->office_id);
        $query->where('company_owner_id', $auth_user->id);
      })
      // ->when($auth_user->hasPermissionTo('only-assigned-regions'), function($query) use($auth_user) {
      //   $query->whereIn('id', Office::where('region_id', $auth_user->region_id)->pluck('id'));
      // })
      ->get()->map(fn($office) => [
        'id' => $office->id,
        'name' => $office->name
      ]);
    $countries = Country::all();
    return Inertia::render('Properties/Create', [
      'hosts' => $hosts,
      'offices' => $offices,
      'countries' => $countries
    ]);
  }

  private function generatePropertyNumber()
  {
    $count = Property::count();
    return 1000 + $count + 1;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param PropertyRequest $request
   * @return RedirectResponse
   */
  public function store(PropertyRequest $request): RedirectResponse
  {
    try {
      DB::beginTransaction();
      $auth_user = auth()->user();
      $request->merge(['company_owner_id' => $auth_user->id]);
      $input = $request->all();
                  
      $input['property_number'] = $this->generatePropertyNumber();
      $input['pets_allowed'] = $input['pets_allowed'] == "true" ? 1 : 0;
      $input['laundry_needed'] = $input['laundry_needed'] == "true" ? 1 : 0;
      $input['washer_dryer_on_site'] = $input['washer_dryer_on_site'] == "true" ? 1 : 0;
      $property = Property::create($input);
      if ($input['ical_url'] !== "need") {
        $this->importAppointments($request->get('ical_url'), $property);
      }
      if (count($input['attachments']) > 0) {
        if (!$property) {
          return response()->json([
            'error' => 'Property not found'
          ], 400);
        }
        foreach($input['attachments'] as $attachment) {
          $image = $property->attachments()->create([
            'file_name' => $attachment['file_name'],
            'file_size' => $attachment['file_size'],
            'mime_type' => $attachment['mime_type'],
            'url' => 'uploads/images/' . $attachment['file_name']
          ]);
        }
      }
      // $property_id
      DB::commit();

      $recurring = $input['recurring'];
      $start = Carbon::parse($input['start']);

      $givenDate = $input['start'];
      $dateTime = new DateTime($givenDate);
      $dateTime->add(new DateInterval('P2Y'));
      $twoYearsLater = $dateTime->format('Y-m-d');
      $end = Carbon::parse($twoYearsLater);

      if($recurring == 1) {
        $currentDate = clone $start;

        while($currentDate->lte($end)) {
          Appointment::create([
            'property_id' => $property->id,
            'start' => $start,
            'end' => $currentDate,
          ]);
          $currentDate->addWeek();
        }
      } else if($recurring == 2) {
        $currentDate = clone $start;

        while($currentDate->lte($end)) {
          Appointment::create([
            'property_id' => $property->id,
            'start' => $start,
            'end' => $currentDate,
          ]);
          $currentDate->addWeek(2);
        }
      } else if($recurring == 3){
        $currentDate = clone $start;

        while($currentDate->lte($end)) {
          Appointment::create([
            'property_id' => $property->id,
            'start' => $start,
            'end' => $currentDate,
          ]);
          $currentDate->addMonth();
        }
      }
      flash('Record added successfully', 'success');
      return redirect()->route('properties.index');
    } catch (Exception $ex) {
      DB::rollback();
      flash($ex->getMessage(), 'danger');
      return redirect()->back();
    }
  }

  /**
   * Import events from .ics file or link
   */
  public function importAppointments($url, $property): void
  {
    $ical = new ICal();
    $calendar = $ical->initFile($url);
    $events = $calendar->cal['VEVENT'];
    foreach ($events as $event) {
      $desc = empty($event['DESCRIPTION']) ? 'N/A' : $event['DESCRIPTION'];
      $start = Carbon::parse($event['DTSTART'])->format('Y-m-d h:m:s');
      $end = Carbon::parse($event['DTEND']);
      $completed_at = $end->lte(Carbon::now()) ? $end->format('Y-m-d h:m:s') : null;
      $appointment = Appointment::where('property_id', $property->id)
        ->where('uid', $event['UID'])->first();
      if (!$appointment) {
        Appointment::create([
          'property_id' => $property->id,
          'uid' => $event['UID'],
          'description' => $desc,
          'start' => $start,
          'end' => $end->format('Y-m-d h:m:s'),
          'summary' => $event['SUMMARY'],
          'completed_at' => $completed_at
        ]);
      } else {
        $appointment->update([
          'description' => $desc,
          'start' => $start,
          'end' => $end->format('Y-m-d h:m:s'),
          'summary' => $event['SUMMARY'],
          'completed_at' => $appointment->completed_at ?? $completed_at
        ]);
      }
    }
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return RedirectResponse|Response
   */
  public function show(int $id): Response|RedirectResponse
  {
    try {
      $property = Property::with([
        'host:id,first_name,last_name',
        'office:id,name',
        'primaryCleaner:id,first_name,last_name,phone_number',
        'secondaryCleaner:id,first_name,last_name,phone_number',
        'attachments'
      ])->findOrFail($id);

      $attachments = $property->attachments;
      foreach ($attachments as $attachment) {
          $attachment->url = Storage::url($attachment->url);
      }
      $property->attachments = $attachments;

      return Inertia::render('Properties/Show', [
        'property' => $property,
        'primaryCleaner' => $property->primaryCleaner,
        'secondaryCleaner' => $property->secondaryCleaner
      ]);
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param int $id
   * @return RedirectResponse|Response
   */
  public function edit(int $id): Response|RedirectResponse
  {
    try {
      $property = Property::with(['attachments'])->findOrFail($id);

      $attachments = $property->attachments;
      foreach ($attachments as $attachment) {
          $attachment->url = Storage::url($attachment->url);
      }
      $property->attachments = $attachments;

      $hosts = Host::where('company_owner_id', auth()->user()->id)->get()->map(fn($host) => [
        'id' => $host->id,
        'name' => $host->first_name . ' ' . $host->last_name
      ]);
      $auth_user = auth()->user();
      $offices = Office::query()
        ->when($auth_user->hasPermissionTo('only-assigned-offices'), function($query) use($auth_user) {
          // $query->where('id', $auth_user->office_id);
          $query->where('company_owner_id', $auth_user->id);
        })
        // ->when($auth_user->hasPermissionTo('only-assigned-regions'), function($query) use($auth_user) {
        //   $query->whereIn('id', Office::where('region_id', $auth_user->region_id)->pluck('id'));
        // })
        ->get()->map(fn($office) => [
          'id' => $office->id,
          'name' => $office->name
        ]);
      $countries = Country::all();
      return Inertia::render('Properties/Edit', [
        'property' => $property,
        'hosts' => $hosts,
        'offices' => $offices,
        'countries' => $countries
      ]);
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * Update the specified resource in storage.
   *
   * @param PropertyRequest $request
   * @param int $id
   * @return RedirectResponse
   */
  public function update(PropertyRequest $request, int $id): RedirectResponse
  {
    try {
      DB::beginTransaction();
      $property = Property::findOrFail($id);
      $input = $request->all();
      $input['pets_allowed'] = $input['pets_allowed'] == "true" ? 1 : 0;
      $input['laundry_needed'] = $input['laundry_needed'] == "true" ? 1 : 0;
      $input['washer_dryer_on_site'] = $input['washer_dryer_on_site'] == "true" ? 1 : 0;
      if (!empty($input['ical_url'])) {
        $input['ical_link'] = $input['ical_url'];
      }
      $property->update($input);
      if (!empty($request->get('ical_url')) && $request->get('ical_url') !== "need") {
        $this->importAppointments($request->get('ical_url'), $property);
      }
      DB::commit();
      flash('Record updated successfully', 'success');
      return redirect()->route('properties.index');
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
    } catch (Exception $ex) {
      flash($ex->getMessage(), 'danger');
    } finally {
      DB::rollback();
    }
    return redirect()->back();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return RedirectResponse | JsonResponse
   */
  public function destroy(int $id): RedirectResponse|JsonResponse
  {
    $message = '';
    try {
      DB::beginTransaction();
      $property = Property::with('appointments.attachments')->findOrFail($id);
      $appointments = $property->appointments;
      if (count($appointments) > 0) {
        foreach ($appointments as $appointment) {
          $attachments = $appointment->attachments;
          if (count($attachments) > 0) {
            foreach ($attachments as $attachment) {
              // Delete file if exists
              if (Storage::disk('public')->exists($attachment->url)) {
                Storage::disk('public')->delete($attachment->url);
              }
            }
            // Delete all attachments
            $appointment->attachments()->delete();
          }
        }
        // Delete all appointments
        $property->appointments()->delete();
      }
      $property->delete();
      DB::commit();
      if (request()->ajax()) {
        return response()->json([
          'message' => 'Record deleted successfully'
        ]);
      }
      flash('Record deleted successfully', 'success');
      return redirect()->route('properties.index');
    } catch (ModelNotFoundException $ex) {
      $message = 'Model not found!';
    } catch (Exception $ex) {
      $message = $ex->getMessage();
    } finally {
      DB::rollback();
    }
    if (request()->ajax()) {
      return response()->json([
        'message' => $message
      ], 500);
    }
    flash($message, 'danger');
    return redirect()->back();
  }

  public function sync(): void
  {
    $properties = Property::whereNotNull('ical_link')->get();
    foreach ($properties as $property) {
      if ($property->ical_link !== "need") {
        $this->importAppointments($property->ical_link, $property);
      }
    }
  }

  /**
   * Attach image to property
   */
  public function uploadImage(Request $request, int $id)
  {
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

    if ($id) { // when edit a property
      $property = Property::findOrFail($id);
      if (!$property) {
        return response()->json([
          'error' => 'Property not found'
        ], 400);
      }
      $image = $property->attachments()->create([
        'file_name' => $uploadedFile->hashName(),
        'file_size' => $uploadedFile->getSize(),
        'mime_type' => $uploadedFile->getMimeType(),
        'url' => 'uploads/images/' . $uploadedFile->hashName()
      ]);
    } else { // when create a property
      $image = new Attachment;

      $image->file_name = $uploadedFile->hashName();
      $image->file_size = $uploadedFile->getSize();
      $image->mime_type = $uploadedFile->getMimeType();
      $image->url = 'uploads/images/' . $uploadedFile->hashName();
    }

    return $image;
  }

  public function getAllProperties() {
    $auth_user = auth()->user();
    $properties = Property::where('company_owner_id', $auth_user->id)->get()
      ->map(fn($property) => [
        'id' => $property->id,
        'name' => $property->name
      ]);
    return $properties;    
  }
}
