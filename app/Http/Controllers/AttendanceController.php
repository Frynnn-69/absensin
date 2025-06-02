<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AttendanceController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'status' => 'required|string|in:present,sick,absent,late,permit,bussiness_trip/remote',
        'description' => 'nullable|string|max:500',
        'latitude' => 'nullable|numeric',
        'longitude' => 'nullable|numeric',
    ]);

    Attendance::create([
        'user_id' => Auth::id(),
        'status' => $request->status,
        'description' => $request->description,
        'latitude' => $request->latitude,
        'longitude' => $request->longitude,
        'address' => 'Unknown location', 
    ]);

    return redirect()->route('dashboard')->with('success', 'Attendance submitted successfully.');
}
}
