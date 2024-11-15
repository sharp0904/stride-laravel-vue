<?php

namespace App\Http\Controllers;

use App\Http\Requests\CleanerRequest;
use App\Models\Cleaner;
use App\Models\Region;
use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Mail;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Notifications\AccountCreated;
use Illuminate\Support\Str;

class CleanersController extends Controller
{

  public function __construct()
  {
    $this->middleware('permission:view-cleaners|create-cleaners|update-cleaners|delete-cleaners', ['only' => ['index', 'show']]);
    $this->middleware('permission:create-cleaners', ['only' => ['create', 'store']]);
    $this->middleware('permission:update-cleaners', ['only' => ['edit', 'update']]);
    $this->middleware('permission:delete-cleaners', ['only' => ['destroy']]);
  }

  /**
   * @param Request $request
   * @return Response
   */
  public function index(Request $request): Response
  {
    $columns = [
      'first_name',
      'last_name',
      'email',
      'phone_number'
    ];
    $q = $request->input('q');
    $auth_user = auth()->user();

    if($auth_user->id == 1){
      $cleaners = Cleaner::query()
      ->with(['office.region', 'primaryProperties', 'secondaryProperties'])
      ->when($q, function ($query, $q) use ($columns) {
        foreach ($columns as $key => $column) {
          $clause = $key == 0 ? 'where' : 'orWhere';
          $query->$clause($column, 'like', "%{$q}%");
        }
      })
      ->get();
    } else {
      $cleaners = Cleaner::query()
      ->with(['office.region', 'primaryProperties', 'secondaryProperties'])
      ->when($q, function ($query, $q) use ($columns) {
        foreach ($columns as $key => $column) {
          $clause = $key == 0 ? 'where' : 'orWhere';
          $query->$clause($column, 'like', "%{$q}%");
        }
      })
      ->where('company_owner_id', $auth_user->id)
      ->get();
    }
    
    $cleaners = $cleaners->map(function ($cleaner) {
      $cleaner->office_name = $cleaner->office->name;
      $cleaner->region_name = $cleaner->office->region->region_name;
      $cleaner->property_number = $cleaner->primaryProperties->count() + $cleaner->secondaryProperties->count();
      unset($cleaner->office); // remove because not needed in the response

      return $cleaner;
    });

    return Inertia::render('Cleaners/Index', [
      'cleaners' => $cleaners,
      'filters' => [
        'q' => $q
      ]
    ]);
  }

  /**
   * @return Response
   */
  public function create(): Response
  {
    try {
      $auth_user = auth()->user();
      $regions = $this->getRegions($auth_user);

      return Inertia::render('Cleaners/Create', [
        'regions' => $regions
      ]);
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * @param CleanerRequest $request
   * @return RedirectResponse
   */
  public function store(CleanerRequest $request): RedirectResponse
  {
    $auth_user = auth()->user();
    $userRequest = $request;
    
    $request->merge(['company_owner_id' => $auth_user->id]);
    Cleaner::create($request->all());

    $password = Str::random(8);
    $userRequest->merge(['password' => $password]);
    $user = User::create($request->all());
    
    $user->assignRole(3);

    $user->notify(new AccountCreated(collect([
      'name' => $user->first_name,
      'email' => $user->email,
      'password' => $password
    ])));

    flash('Record added successfully', 'success');
    return redirect()->route('cleaners.index');
  }

  /**
   * @param int $id
   * @return Response|RedirectResponse
   */
  public function edit(int $id): Response|RedirectResponse
  {
    try {
      // Get cleaner with office.
      $cleaner = Cleaner::with(['office', 'agreements', 'insurances', 'others'])->findOrFail($id);
      $cleaner->load(['office.region'=>function($query){
          return $query->with('offices');
      }]);

      // Get regions by auth user.
      $regions = $this->getRegions(auth()->user());

      return Inertia::render('Cleaners/Edit', [
          'cleaner' => $cleaner,
          'regions' => $regions,
          'offices'  => $cleaner->office->region->offices,
      ]);
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * @param CleanerRequest $request
   * @param int $id
   * @return RedirectResponse
   */
  public function update(CleanerRequest $request, int $id): RedirectResponse
  {
    try {
      $cleaner = Cleaner::findOrFail($id);
      $cleaner->update($request->all());
      flash('Record updated successfully', 'success');
      return redirect()->route('cleaners.index');
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * @param int $id
   * @return RedirectResponse
   */
  public function destroy(int $id): RedirectResponse
  {
    try {
      Cleaner::findOrFail($id)->delete();
      flash('Record deleted successfully', 'success');
      return redirect()->route('cleaners.index');
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * @param int $office_id
   * @return JsonResponse
   */
  public function getCleanersByOffice(int $office_id = null): JsonResponse
  {
    // Check if an office_id is provided
    if ($office_id) {
      // If an office_id is provided, fetch cleaners with corresponding office_id
      $cleaners = Cleaner::where('office_id', $office_id)->get()
        ->map(fn($cleaner) => [
          'id' => $cleaner->id,
          'name' => $cleaner->first_name . ' ' . $cleaner->last_name
        ]);
    } else {
      // If no office_id is provided, fetch all offices
      $cleaners = Cleaner::all()
        ->map(fn($cleaner) => [
          'id' => $cleaner->id,
          'name' => $cleaner->first_name . ' ' . $cleaner->last_name
        ]);
    }

    // Return the fetched cleaners as a JSON response
    return response()->json($cleaners);
  }

  public function uploadAgreement(Request $request, int $id)
  {
    $cleaner = Cleaner::findOrFail($id);
    if (!$cleaner) {
      return response()->json([
        'error' => 'Cleaner not found'
      ], 400);
    }
    if (!$request->hasFile('pond_agreement')) {
      return response()->json([
        'error' => 'File is missing'
      ], 400);
    }
    $request->validate([
      'pond_agreement' => 'required|mimes:jpg,jpeg,png,doc,docx,pdf,txt,rtf'
    ]);
    $path = $request->file('pond_agreement')->store('public/uploads/files');
    if (!$path) {
      return response()->json([
        'error' => 'The file could not be saved'
      ], 500);
    }
    $uploadedFile = $request->file('pond_agreement');

    $file = $cleaner->agreements()->create([
      'sub_type' => 'cleaner_agreement',
      'file_name' => $uploadedFile->hashName(),
      'file_size' => $uploadedFile->getSize(),
      'mime_type' => $uploadedFile->getMimeType(),
      'url' => 'uploads/files/' . $uploadedFile->hashName()
    ]);
    return $file;
  }

  public function uploadInsurance(Request $request, int $id)
  {
    $cleaner = Cleaner::findOrFail($id);
    if (!$cleaner) {
      return response()->json([
        'error' => 'Cleaner not found'
      ], 400);
    }
    if (!$request->hasFile('pond_insurance')) {
      return response()->json([
        'error' => 'File is missing'
      ], 400);
    }
    $request->validate([
      'pond_insurance' => 'required|mimes:jpg,jpeg,png,doc,docx,pdf,txt,rtf'
    ]);
    $path = $request->file('pond_insurance')->store('public/uploads/files');
    if (!$path) {
      return response()->json([
        'error' => 'The file could not be saved'
      ], 500);
    }
    $uploadedFile = $request->file('pond_insurance');

    $file = $cleaner->insurances()->create([
      'sub_type' => 'cleaner_insurance',
      'file_name' => $uploadedFile->hashName(),
      'file_size' => $uploadedFile->getSize(),
      'mime_type' => $uploadedFile->getMimeType(),
      'url' => 'uploads/files/' . $uploadedFile->hashName()
    ]);
    return $file;
  }

  public function uploadOther(Request $request, int $id)
  {
    $cleaner = Cleaner::findOrFail($id);
    if (!$cleaner) {
      return response()->json([
        'error' => 'Cleaner not found'
      ], 400);
    }
    if (!$request->hasFile('pond_other')) {
      return response()->json([
        'error' => 'File is missing'
      ], 400);
    }
    $request->validate([
      'pond_other' => 'required|mimes:jpg,jpeg,png,doc,docx,pdf,txt,rtf'
    ]);
    $path = $request->file('pond_other')->store('public/uploads/files');
    if (!$path) {
      return response()->json([
        'error' => 'The file could not be saved'
      ], 500);
    }
    $uploadedFile = $request->file('pond_other');

    $file = $cleaner->others()->create([
      'sub_type' => 'cleaner_other',
      'file_name' => $uploadedFile->hashName(),
      'file_size' => $uploadedFile->getSize(),
      'mime_type' => $uploadedFile->getMimeType(),
      'url' => 'uploads/files/' . $uploadedFile->hashName()
    ]);
    return $file;
  }

 /**
 * This function retrieves the regions associated with the authenticated user.
 *
 * @param  User  $auth_user The authenticated user
 * @return Collection Returns a collection of regions where each region is represented as an array that includes its 'id' and 'name'
 */
  private function getRegions($auth_user)
  {
    return Region::query()
        // ->when($auth_user->hasPermissionTo('only-assigned-regions'), function($query) use($auth_user) {
        //   $query->whereId($auth_user->region_id);
        // })
        ->get()->map(fn($region) => [
          'id' => $region->id,
          'name' => $region->region_name
        ]);
  }

  public function getAllCleaners() {
    $user = auth()->user();
    if($user->id == 1) {
      $cleaners = Cleaner::all()
      ->map(fn($cleaner) => [
        'id' => $cleaner->id,
        'name' => $cleaner->first_name . ' ' . $cleaner->last_name
      ]);
    } else{
      $cleaners = Cleaner::where('company_owner_id', $user->id)->get()
      ->map(fn($cleaner) => [
        'id' => $cleaner->id,
        'name' => $cleaner->first_name . ' ' . $cleaner->last_name
      ]);
    }
    
    return $cleaners;    
  }
}
