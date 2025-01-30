<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CategoryController extends Controller
{
    public function index(): InertiaResponse
    {
        $category = Category::orderBy('id', 'desc')->paginate(10); // Increased pagination to 10
        return Inertia::render('AdminView/Category/Category', ['category' => $category]);
    } 
}
