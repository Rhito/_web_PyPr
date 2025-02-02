<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CategoryController extends Controller
{
    public function index(Request $request) : InertiaResponse
    {
        $query = Category::query();
        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;

            // Check if search input is numeric (assumed to be ID), otherwise search by name
            if (is_numeric($search)) {
                $query->where('id', $search);
            } else {
                $query->where('name', 'like', '%' . $search . '%');
            }
            $categories = Category::orderBy('id', 'desc')->paginate(10);
        }

        return Inertia::render('AdminView/Category/Category', ['category' => $categories,  'filters' => $request->only(['search']),]);
    } 
}
