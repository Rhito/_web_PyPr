<?php

namespace App\Repositories;

use App\Models\Log;
use Illuminate\Support\Facades\Auth;

class LogRepository
{
    public function createLog($action, $targetId)
    {
        return Log::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'target_id' => $targetId
        ]);
    }

    public function getAllLogs($search = null)
    {
        $query = Log::query();
        if ($search) {
            $search = request()->search;
            $query->where(function ($q) use ($search) {
                $q->where('action', 'like', '%' . $search . '%')
                    ->orWhere('id', 'like', '%' . $search . '%')
                    ->orWhere('user_id', 'like', '%' . $search . '%')
                    ->orWhere('target_id', 'like', '%' . $search . '%');
            });
        }
        return $query->orderBy('id', 'desc')->paginate(10)->withQueryString();
    }
}
