<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\RoleRequest;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Illuminate\Http\RedirectResponse;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RolesController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view-roles|create-roles|update-roles|delete-roles', ['only' => ['index', 'show']]);
        $this->middleware('permission:create-roles', ['only' => ['create', 'store']]);
        $this->middleware('permission:update-roles', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete-roles', ['only' => ['destroy']]);
    }

    /**
     * @return Response
     */
    public function index(): Response
    {
        $roles = Role::with('permissions')->withCount('users')->get();
        return Inertia::render('Settings/Roles/Index', [
            'roles' => $roles
        ]);
    }

    /**
     * @return Response
     */
    public function create(): Response
    {
        $permissions = Permission::all();
        return Inertia::render('Settings/Roles/Create', [
            'permissions' => $permissions
        ]);
    }

    /**
     * @param RoleRequest $request
     * @return RedirectResponse
     */
    public function store(RoleRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $role = Role::create($request->only('name'));
            $role->permissions()->sync($request->get('permissions'));
            DB::commit();
            flash('Role added successfully!', 'success');
            return redirect()->route('roles.index');
        } catch (Exception $ex) {
            DB::rollback();
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
            $role = Role::with('permissions')->findOrFail($id);
            $permissions = Permission::all();

            return Inertia::render('Settings/Roles/Edit', [
                'role' => $role,
                'permissions' => $permissions
            ]);
        } catch (ModelNotFoundException $ex) {
            flash('Model not found!', 'danger');
            return redirect()->back();
        }
    }

    /**
     * @param RoleRequest $request
     * @param int $id
     * @return RedirectResponse
     */
    public function update(RoleRequest $request, int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $role = Role::findOrFail($id);
            $role->update($request->only('name'));
            $role->permissions()->sync($request->get('permissions'));
            DB::commit();
            flash('Role updated successfully!', 'success');
            return redirect()->route('roles.index');
        } catch (ModelNotFoundException $exception) {
            flash('Model not found!', 'danger');
        } catch (Exception $ex) {
            flash($ex->getMessage(), 'danger');
        } finally {
            DB::rollback();
        }
        return redirect()->back();
    }

    /**
     * @param int $id
     * @return RedirectResponse
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $role = Role::findOrFail($id);
            $role->permissions()->detach();
            $role->delete();
            DB::commit();
            flash('Role deleted successfully!', 'success');
            return redirect()->route('roles.index');
        } catch (ModelNotFoundException $exception) {
            flash('Model not found!', 'danger');
        } catch (Exception $ex) {
            flash($ex->getMessage(), 'danger');
        } finally {
            DB::rollback();
        }
        return redirect()->back();
    }
}
