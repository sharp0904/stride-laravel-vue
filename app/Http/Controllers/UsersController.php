<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Office;
use App\Models\Region;
use App\Models\User;
use App\Models\UserPlan;
use App\Notifications\AccountCreated;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param Request $request
   * @return \Inertia\Response
   */
  public function index(Request $request): \Inertia\Response
  {
    $q = $request->input('q');
    $users = User::query()
      ->when($q, function ($query, $q) {
        $query->where('first_name', 'like', "%{$q}%")
          ->orWhere('last_name', 'like', "%{$q}%")
          ->orWhere('email', 'like', "%{$q}%");
      })
      ->with(['roles', 'office:id,name', 'region:id,region_name'])
      ->paginate()
      ->withQueryString()
      ->through(fn($user) => [
        'id' => $user->id,
        'name' => $user->first_name . ' ' . $user->last_name,
        'email' => $user->email,
        'roles' => $user->roles->map(fn($role) => [
          'name' => $role->name
        ]),
        'office' => $user->office,
        'region' => $user->region
      ]);
    return Inertia::render('Settings/Users/Index', [
      'users' => $users,
      'filters' => [
        'q' => $q
      ]
    ]);
  }

  public function getUsersList(Request $request): \Inertia\Response
  {
    $q = $request->input('q');
    $users = User::query()
      ->when($q, function ($query, $q) {
        $query->where('first_name', 'like', "%{$q}%")
          ->orWhere('last_name', 'like', "%{$q}%")
          ->orWhere('email', 'like', "%{$q}%");
      })
      ->with(['roles', 'office:id,name', 'region:id,region_name'])
      ->paginate()
      ->withQueryString()
      ->through(fn($user) => [
        'id' => $user->id,
        'name' => $user->first_name . ' ' . $user->last_name,
        'email' => $user->email,
        'roles' => $user->roles->map(fn($role) => [
          'name' => $role->name
        ]),
        'office' => $user->office,
        'region' => $user->region,
        'createdDate' => $user->created_at,
        'phone' => $user->phone,
        'rate' => $user->monthly_base_rate,
        'acct' => $user->acct,
        'registerDate' => $user->register_date,
        'lastLoginDate' => $user->last_login_date,
        'cancelDate' => $user->cancel_date
      ]);
    return Inertia::render('UsersList/Index', [
      'users' => $users,
      'filters' => [
        'q' => $q
      ]
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Inertia\Response
   */
  public function create(): \Inertia\Response
  {
    $roles = Role::with('permissions')->get()->map(fn($role) => [
      'id' => $role->id,
      'name' => $role->name,
      'permissions' => $role->permissions->pluck('name')
    ]);
    $auth_user = auth()->user();
    $regions = Region::query()
      ->when($auth_user->hasPermissionTo('only-assigned-regions'), function($query) use($auth_user) {
        $query->whereId($auth_user->region_id);
      })
      ->with('offices')->get()->map(fn($region) => [
      'id' => $region->id,
      'name' => $region->region_name,
      'offices' => $region->offices->map(fn($office) => [
        'id' => $office->id,
        'name' => $office->name
      ])
    ]);
    return Inertia::render('Settings/Users/Create', [
      'roles' => $roles,
      'regions' => $regions
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param UserRequest $request
   * @return RedirectResponse|Response
   */
  public function store(UserRequest $request): Response|RedirectResponse
  {
    try {
      DB::beginTransaction();
      $password = Str::random(8);
      $userCreated = User::create([
        'region_id' => $request->has('region_id') ? $request->get('region_id') : null,
        'office_id' => $request->has('office_id') ? $request->get('office_id') : null,
        'first_name' => $request->get('first_name'),
        'last_name' => $request->get('last_name'),
        'email' => $request->get('email'),
        'password' => $password
      ]);
      // Assign role(s)
      $userCreated->assignRole($request->get('role'));
      // Send email to user
      $userCreated->notify(new AccountCreated(collect([
        'name' => $userCreated->first_name,
        'email' => $userCreated->email,
        'password' => $password
      ])));
      DB::commit();
      flash('Record added successfully', 'success');
      return redirect()->route('users.index');
    } catch (Exception $ex) {
      DB::rollback();
      flash($ex->getMessage(), 'danger');
      return redirect()->back();
    }
  }

  /**
   * @param int $id
   * @return \Inertia\Response|RedirectResponse
   */
  public function show(int $id): \Inertia\Response|RedirectResponse
  {
    try {
      $selectedUser = User::with(['roles', 'office', 'region'])->findOrFail($id);
      return Inertia::render('Settings/Users/Show', [
        'selectedUser' => $selectedUser
      ]);
    } catch (ModelNotFoundException $exception) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param int $id
   * @return RedirectResponse|\Inertia\Response
   */
  public function edit(int $id): \Inertia\Response|RedirectResponse
  {
    try {
      $selectedUser = User::with(['roles'])->findOrFail($id);
      $roles = Role::with('permissions')->get()->map(fn($role) => [
        'id' => $role->id,
        'name' => $role->name,
        'permissions' => $role->permissions->pluck('name')
      ]);
      $auth_user = auth()->user();
      $regions = Region::query()
        ->when($auth_user->hasPermissionTo('only-assigned-regions'), function($query) use($auth_user) {
          $query->whereId($auth_user->region_id);
        })
        ->with('offices')->get()->map(fn($region) => [
          'id' => $region->id,
          'name' => $region->region_name,
          'offices' => $region->offices->map(fn($office) => [
            'id' => $office->id,
            'name' => $office->name
          ])
        ]);
      return Inertia::render('Settings/Users/Edit', [
        'selectedUser' => [
          'id' => $selectedUser->id,
          'region_id' => $selectedUser->region_id,
          'office_id' => $selectedUser->office_id,
          'first_name' => $selectedUser->first_name,
          'last_name' => $selectedUser->last_name,
          'email' => $selectedUser->email,
          'role' => count($selectedUser->roles) > 0 ? $selectedUser->roles->first()->id : null
        ],
        'roles' => $roles,
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
   * @param UserRequest $request
   * @param int $id
   * @return RedirectResponse
   */
  public function update(UserRequest $request, int $id): RedirectResponse
  {
    try {
      DB::beginTransaction();
      $user = User::findOrFail($id);
      $payload = [
        'region_id' => $request->get('region_id'),
        'office_id' => $request->get('office_id'),
        'first_name' => $request->get('first_name'),
        'last_name' => $request->get('last_name'),
        'email' => $request->get('email')
      ];
      if ($request->has('password') && !empty($request->get('password'))) {
        $payload['password'] = $request->get('password');
      }
      $user->update($payload);
      // Assign role(s)
      $user->syncRoles($request->get('role'));
      DB::commit();
      flash('Record updated successfully', 'success');
      return redirect()->route('users.index');
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
   * @return \Inertia\Response
   */
  public function showProfile(): \Inertia\Response
  {
    return Inertia::render('Settings/Profile/Profile');
  }

  /**
   * Update logged in user profile
   */
  public function updateProfile(Request $request): RedirectResponse
  {
    $validated = $request->validate([
      'first_name' => 'required|min:3',
      'last_name' => 'required|min:3'
    ]);
    auth()->user()->update($validated);
    flash('Profile updated successfully', 'success');
    return redirect()->back();
  }

  public function updatePassword(Request $request): RedirectResponse
  {
    $input = $request->all();
    $user = auth()->user();
    $validator = Validator::make($input, [
      'current_password' => ['required', 'string'],
      'password' => 'required|min:8|confirmed',
    ])->after(function ($validator) use ($user, $input) {
      if (!isset($input['current_password']) || !Hash::check($input['current_password'], $user->password)) {
        $validator->errors()->add('current_password', __('The provided password does not match your current password.'));
      }
    });
    if ($validator->fails()) {
      return redirect()->back()->withErrors($validator->errors());
    }
    $user->forceFill([
      'password' => $input['password'],
    ])->save();
    flash('Password updated successfully', 'success');
    return redirect()->back();
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
      UserPlan::where('user_id', $id)->delete();
      User::findOrFail($id)->delete();
      flash('Record deleted successfully', 'success');
      return redirect()->route('users.index');
    } catch (ModelNotFoundException $ex) {
      flash('Model not found!', 'danger');
      return redirect()->back();
    }
  }
}
