<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Office;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Carbon\Exceptions\InvalidFormatException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PagesController extends Controller
{
  public function dashboard(Request $request): Response
  {
    $type = 'monthly';
    $selected_date = $request->has('date') ? $request->get('date') : Carbon::now();
    try {
      $selected_date = Carbon::parse($selected_date);
    } catch (InvalidFormatException $ex) {
      $selected_date = Carbon::now();
    }
    $start = (clone $selected_date)->startOfMonth()->format('Y-m-d H:i:s');
    $end = (clone $selected_date)->endOfMonth()->format('Y-m-d H:i:s');
    if ($request->has('type') && in_array($request->get('type'), ['daily', 'weekly', 'monthly'])) {
      $type = $request->get('type');
      if ($type === 'monthly') {
        $start = (clone $selected_date)->startOfMonth()->format('Y-m-d H:i:s');
        $end = (clone $selected_date)->endOfMonth()->format('Y-m-d H:i:s');
      } else if ($type === 'weekly') {
        $start = (clone $selected_date)->startOfWeek()->format('Y-m-d H:i:s');
        $end = (clone $selected_date)->endOfWeek()->format('Y-m-d H:i:s');
      } else if($type === 'daily') {
        $start = (clone $selected_date)->format('Y-m-d H:i:s');
        $end = (clone $selected_date)->addDay()->format('Y-m-d H:i:s');
      }
    }

    // Revenue per day/week/month
    $auth_user = auth()->user();
    // $appointments = Appointment::query()->select('id', 'property_id', 'completed_at')
    //   ->with('property:id,price_paying_cleaning')
    //   ->when($auth_user->hasPermissionTo('only-assigned-regions')
    //     || $auth_user->hasPermissionTo('only-assigned-offices'), function($query) use($auth_user) {
    //     if ($auth_user->hasPermissionTo('only-assigned-regions')) {
    //       $offices = Office::where('region_id', $auth_user->region_id)->pluck('id')->toArray();
    //     } else {
    //       $offices = [$auth_user->office_id];
    //     }
    //     $query->whereIn('property_id', DB::table('properties')->whereIn('office_id', $offices)->pluck('id'));
    //   })
    //   ->when(in_array($type, ['weekly', 'monthly']), function($query) use($start, $end) {
    //     $query->whereBetween(DB::raw('DATE(`completed_at`)'), [$start, $end]);
    //   })->when($type === 'daily', function($query) use($selected_date) {
    //     $query->whereDate('completed_at', (clone $selected_date)->format('Y-m-d'));
    //   })->get();
    // $revenue = [];
    // $labels = [];

    // if ($type === 'monthly' || $type === 'weekly') {
    //   $period = CarbonPeriod::create($start, $end);
    //   foreach ($period as $d) {
    //     $formatted_date = $d->format('Y-m-d');
    //     $labels[] = $formatted_date;
    //     $revenue[$formatted_date] = [
    //       'revenue' => 0,
    //       'jobs' => 0
    //     ];
    //   }

    //   foreach ($appointments as $appointment) {
    //     $d = Carbon::createFromDate($appointment->completed_at)->format('Y-m-d');
    //     $revenue[$d]['revenue'] += floatval($appointment->property->price_paying_cleaning);
    //     $revenue[$d]['jobs'] += 1;
    //   }
    // }

    // Total appointments/jobs
    // $jobs = Appointment::query()
    //   ->when($auth_user->hasPermissionTo('only-assigned-regions')
    //     || $auth_user->hasPermissionTo('only-assigned-offices'), function($query) use($auth_user) {
    //     if ($auth_user->hasPermissionTo('only-assigned-regions')) {
    //       $offices = Office::where('region_id', $auth_user->region_id)->pluck('id')->toArray();
    //     } else {
    //       $offices = [$auth_user->office_id];
    //     }
    //     $query->whereIn('property_id', DB::table('properties')->whereIn('office_id', $offices)->pluck('id'));
    //   })
    //   ->selectRaw("CASE WHEN completed_at IS NULL THEN 'pending' ELSE 'completed' END AS status, COUNT(id) AS total")
    //   ->groupBy('status')->get();
    // $formatted_jobs = [
    //   'labels' => ['Total Jobs', 'Completed Jobs', 'Pending Jobs'],
    //   'data' => [0, 0, 0]
    // ];
    // $total_jobs = 0;
    // foreach($jobs as $job) {
    //   if ($job->status === 'pending') {
    //     $formatted_jobs['data'][2] = $job->total;
    //   } else {
    //     $formatted_jobs['data'][1] = $job->total;
    //   }
    //   $total_jobs += $job->total;
    // }
    // $formatted_jobs['data'][0] = $total_jobs;

    
    $totalJobs = Appointment::whereBetween('start', [$start, $end])->count();
    $completedJobs = Appointment::whereBetween('start', [$start, $end])->whereNotNull('completed_at')->count();
    $uncompletedJobs = Appointment::whereBetween('start', [$start, $end])->whereNull('completed_at')->count();
    
    // return Inertia::render('Dashboard', [
    //   'chart_data' => [
    //     'revenue' => $revenue,
    //     'labels' => $labels
    //   ],
    //   'date' => $selected_date->format('Y-m-d'),
    //   'type' => $type,
    //   'jobs' => $formatted_jobs
    // ]);

    return Inertia::render('Dashboard', [
      'date' => $selected_date->format('Y-m-d'),
      'type' => $type,
      'totalJobs' => $totalJobs,
      'completedJobs' => $completedJobs,
      'uncompletedJobs' => $uncompletedJobs
    ]);
  }
}
