<?php

namespace App\Http\Controllers;

use App\Http\Requests\OfficeRequest;
use App\Models\Country;
use App\Models\Office;
use App\Models\Region;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class OfficesController extends Controller
{

  public function __construct()
  {
    $this->middleware('permission:view-offices|create-offices|update-offices|delete-offices', ['only' => ['index', 'show']]);
    $this->middleware('permission:create-offices', ['only' => ['create', 'store']]);
    $this->middleware('permission:update-offices', ['only' => ['edit', 'update']]);
    $this->middleware('permission:delete-offices', ['only' => ['destroy']]);
  }

  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   * @return Response
   */
  public function index(Request $request): Response
  {
    $columns = [
      'name',
      'email',
      'phone_number',
      'address_line_1',
      'address_line_2',
      'zip_code',
      'city',
      'state',
      'country'
    ];
    $q = $request->input('q');
    $offices = Office::query()
      ->when($q, function ($query, $q) use ($columns) {
        foreach ($columns as $key => $column) {
          $clause = $key == 0 ? 'where' : 'orWhere';
          $query->$clause($column, 'like', "%{$q}%");
        }
      })->when(auth()->user()->hasPermissionTo('only-assigned-offices'), function($query) {
        // $query->where('id', auth()->user()->office_id);
        $query->where('company_owner_id', auth()->user()->id);
      })
      ->with('region:id,region_name')
      ->paginate()
      ->withQueryString();
    return Inertia::render('Settings/Offices/Index', [
      'offices' => $offices,
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
    $countries = Country::all();
    $auth_user = auth()->user();
    $regions = Region::query()
      // ->when($auth_user->hasPermissionTo('only-assigned-regions'), function($query) use($auth_user) {
      //   $query->whereId($auth_user->region_id);
      // })
      ->get()->map(fn($region) => [
      'id' => $region->id,
      'name' => $region->region_name
    ]);
    return Inertia::render('Settings/Offices/Create', [
      'countries' => $countries,
      'regions' => $regions
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param OfficeRequest $request
   * @return RedirectResponse
   */
  public function store(OfficeRequest $request): RedirectResponse
  {
    $auth_user = auth()->user();
    $request->merge(['company_owner_id' => $auth_user->id]);
    Office::create($request->all());
    flash('Record added successfully', 'success');
    return redirect()->route('offices.index');
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
      $office = Office::findOrFail($id);
      $countries = Country::all();
      $auth_user = auth()->user();
      $regions = Region::query()
        ->when($auth_user->hasPermissionTo('only-assigned-regions'), function($query) use($auth_user) {
          $query->whereId($auth_user->region_id);
        })
        ->get()->map(fn($region) => [
          'id' => $region->id,
          'name' => $region->region_name
        ]);
      return Inertia::render('Settings/Offices/Edit', [
        'office' => $office,
        'countries' => $countries,
        'regions' => $regions
      ]);
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * Update the specified resource in storage.
   *
   * @param OfficeRequest $request
   * @param int $id
   * @return RedirectResponse
   */
  public function update(OfficeRequest $request, int $id): RedirectResponse
  {
    try {
      $office = Office::findOrFail($id);
      $office->update($request->all());
      flash('Record updated successfully', 'success');
      return redirect()->route('offices.index');
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return RedirectResponse
   */
  public function destroy(int $id): RedirectResponse
  {
    try {
      Office::findOrFail($id)->delete();
      flash('Record deleted successfully', 'success');
      return redirect()->route('offices.index');
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * Fetch and return offices based on regionId.
   * If no regionId is provided, it will return all offices.
   *
   * @param  int $regionId The id of the region (optional)
   * @return \Illuminate\Http\JsonResponse It returns a JSON response with offices data
   */
  public function getOfficesByRegion($regionId = null): JsonResponse {
      // Check if a regionId is provided
      if ($regionId) {
          // If a regionId is provided, fetch offices with corresponding regionId
          $offices = Office::where('region_id', $regionId)->where('company_owner_id', auth()->user()->id)->get();
      } else {
          // If no regionId is provided, fetch all offices
          $offices = Office::all();
      }

      // Return the fetched offices as a JSON response
      return response()->json($offices);
  }

}
