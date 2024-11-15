<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegionRequest;
use App\Models\Office;
use App\Models\Region;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RegionsController extends Controller
{
  public function __construct()
  {
    $this->middleware('permission:view-regions|create-regions|update-regions|delete-regions', ['only' => ['index', 'show']]);
    $this->middleware('permission:create-regions', ['only' => ['create', 'store']]);
    $this->middleware('permission:update-regions', ['only' => ['edit', 'update']]);
    $this->middleware('permission:delete-regions', ['only' => ['destroy']]);
  }

  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   * @return Response
   */
  public function index(Request $request): Response
  {
    $q = $request->input('q');
    $regions = Region::query()
      ->when($q, function ($query, $q) {
        $query->where('region_name', 'like', "%{$q}%");
      })
      // ->when(auth()->user()->hasPermissionTo('only-assigned-regions'), function($query) {
      //   $query->whereIn('id', auth()->user()->regions()->pluck('regions.id'));
      // })
      ->paginate()
      ->withQueryString();
    return Inertia::render('Settings/Regions/Index', [
      'regions' => $regions,
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
    return Inertia::render('Settings/Regions/Create');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param RegionRequest $request
   * @return RedirectResponse
   */
  public function store(RegionRequest $request): RedirectResponse
  {
    Region::create($request->all());
    flash('Record added successfully', 'success');
    return redirect()->route('regions.index');
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
      $region = Region::findOrFail($id);
      return Inertia::render('Settings/Regions/Edit', [
        'region' => $region
      ]);
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * Update the specified resource in storage.
   *
   * @param RegionRequest $request
   * @param int $id
   * @return RedirectResponse
   */
  public function update(RegionRequest $request, int $id): RedirectResponse
  {
    try {
      $region = Region::findOrFail($id);
      $region->update($request->all());
      flash('Record updated successfully', 'success');
      return redirect()->route('regions.index');
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
      Region::findOrFail($id)->delete();
      flash('Record deleted successfully', 'success');
      return redirect()->route('regions.index');
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }
}
