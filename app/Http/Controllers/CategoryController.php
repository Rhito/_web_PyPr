<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Models\Log;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(Request $request): Response
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
        }

        // Apply ordering and pagination on the filtered query
        $categories = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('AdminView/Category/Category', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create() : Response
    {
        $category = Category::all();
        return Inertia::render('AdminView/Category/CreateCategory', ['category'=> fn () =>$category]);
    }

    public function store(CategoryRequest $request) : RedirectResponse {
        
        $category = new Category();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->parent_id = $request->parent_id;
        $category->save();


        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = "Created category";
        $log->save();

        return redirect()->route('category')->with(['success'=>'Category created successfully']);
    }

    public function edit($id) : Response {
        $category = Category::findOrFail($id);
        $categories = Category::all();
        return inertia('AdminView/Category/EditCategory', ["category" => $category, 'categories' => $categories]);
    }

    public function update(CategoryRequest $request) : RedirectResponse {
      $category = Category::where('id', $request->id)->first();
      $category->name = $request->name;
      $category->description = $request->description;
      $category->parent_id = $request->parent_id;
      $category->updated_at = now();
      
      $category->update();

      $log = new Log();
      $log->user_id = Auth::id();
      $log->action = "Update category - Id: " . $request->id;
      $log->save();

      return redirect('category')->with(['success'=>'Category edit successfully']);

    }

    public function details($id)
    {
        $category = Category::with('parent')->findOrFail($id); // Eager load parent category

        // Add parent_name property dynamically
        $category->parent_name = $category->parent ? $category->parent->name : 'No Parent';

        return inertia('AdminView/Category/DetailsCategory', [
            'category' => $category,
        ]);
    }

    public function destroy($id) : RedirectResponse {
        
        $category = Category::findOrFail($id);
        
        $category->delete();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = "Delete category - Id: ". $id;
        $log->save();

        return redirect('category')->with(['success'=>'Category deleted successfully']);
    }
}
