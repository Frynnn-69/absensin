<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $hasAttendedToday = Attendance::where('user_id', Auth::id())
            ->whereDate('created_at', Carbon::today())
            ->exists();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'hasAttendedToday' => $hasAttendedToday,
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : null,
            'success' => session('success'),
        ]);
    }
}
