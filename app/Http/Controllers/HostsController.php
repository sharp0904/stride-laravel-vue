<?php

namespace App\Http\Controllers;

use App\Http\Requests\HostRequest;
use App\Models\Host;
use App\Models\User;
use App\Notifications\AccountCreated;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HostsController extends Controller
{

  public function __construct()
  {
    $this->middleware('permission:view-hosts|create-hosts|update-hosts|delete-hosts', ['only' => ['index', 'show']]);
    $this->middleware('permission:create-hosts', ['only' => ['create', 'store']]);
    $this->middleware('permission:update-hosts', ['only' => ['edit', 'update']]);
    $this->middleware('permission:delete-hosts', ['only' => ['destroy']]);
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
      $hosts = Host::query()
      ->withCount('properties')
      ->when($q, function ($query, $q) use ($columns) {
        foreach ($columns as $key => $column) {
          $clause = $key == 0 ? 'where' : 'orWhere';
          $query->$clause($column, 'like', "%{$q}%");
        }
      })
      ->get();
    } else {
      $hosts = Host::query()
      ->withCount('properties')
      ->when($q, function ($query, $q) use ($columns) {
        foreach ($columns as $key => $column) {
          $clause = $key == 0 ? 'where' : 'orWhere';
          $query->$clause($column, 'like', "%{$q}%");
        }
      })
      ->where('company_owner_id', $auth_user->id)
      ->get();
    }

    return Inertia::render('Hosts/Index', [
      'hosts' => $hosts,
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
    return Inertia::render('Hosts/Create');
  }

  /**
   * @param HostRequest $request
   * @return RedirectResponse
   */
  public function store(HostRequest $request): RedirectResponse
  {
    try {
      DB::beginTransaction();
      $auth_user = auth()->user();
      $request->merge(['company_owner_id' => $auth_user->id]);
      $host = Host::create($request->all());

      $password = Str::random(8);
      $userCreated = User::create([
        'region_id' => null,
        'office_id' => null,
        'first_name' => $request->get('first_name'),
        'last_name' => $request->get('last_name'),
        'email' => $request->get('email'),
        'password' => $password,
        'host_id' => $host->id
      ]);
      // Assign "Host" role manually
      $userCreated->assignRole(2);

      // Send email to user
      $userCreated->notify(new AccountCreated(collect([
        'name' => $userCreated->first_name,
        'email' => $userCreated->email,
        'password' => $password
      ])));

      DB::commit();
      flash('Record added successfully', 'success');
      return redirect()->route('hosts.index');
    } catch (Exception $ex) {
      DB::rollback();
      flash($ex->getMessage(), 'danger');
      return redirect()->back();
    }
  }

  /**
   * @param int $id
   * @return Response|RedirectResponse
   */
  public function edit(int $id): Response|RedirectResponse
  {
    try {
      $host = Host::findOrFail($id);
      return Inertia::render('Hosts/Edit', [
        'host' => $host
      ]);
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return Response|RedirectResponse
   */
  public function show(int $id): Response|RedirectResponse
  {
    try {
      $host = Host::findOrFail($id);
      return Inertia::render('Hosts/Show', [
        'host' => $host
      ]);
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * @param HostRequest $request
   * @param int $id
   * @return RedirectResponse
   */
  public function update(HostRequest $request, int $id): RedirectResponse
  {
    try {
      $host = Host::findOrFail($id);
      $host->update($request->all());
      flash('Record updated successfully', 'success');
      return redirect()->route('hosts.index');
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
      Host::findOrFail($id)->delete();
      flash('Record deleted successfully', 'success');
      return redirect()->route('hosts.index');
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }
}
