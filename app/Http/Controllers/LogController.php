<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Repositories\LogRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LogController extends Controller
{
    protected $logRepository;

    public function __construct(LogRepository $logRepository)
    {
        $this->logRepository = $logRepository;
    }


    public function index (Request $request) {
       $logs = $this->logRepository->getAllLogs($request->search);
        return Inertia::render('AdminView/Log/index', [
            'logs' => $logs,
            'filters' => request()->only(['search']), // Preserve filter value
        ]);
    }
}
