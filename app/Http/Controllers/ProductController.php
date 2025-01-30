<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    
    public function index(Request $request){
        $query = Product::query();

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;

            // Check if search input is numeric (assumed to be ID), otherwise search by name
            if (is_numeric($search)) {
                $query->where('id', $search);
            } else {
                $query->where('name', 'like', '%' . $search . '%');
            }
        }

        $products = $query->with('category')->orderBy('id', 'desc')->paginate(10);

        return Inertia::render('AdminView/Product/Product', [
            'products' => $products,
            'filters' => $request->only(['search']), // Preserve filter value
        ]);
    }


    public function create(): Response
    {
        $categoryName = Category::all();
        return Inertia::render('AdminView/Product/CreateProduct', ['categoryName'=> fn () =>$categoryName]);
    }

    public function store(ProductRequest $request)
    {  
        $products = new Product();
        $products->name = $request->name;
        $products->category_id = $request->category_id;
        $imagePath = $request->file('image_url')->store('productsImages', 'public');
        $products->image_url = $imagePath;
        $products->price = $request->price;
        $products->stock = $request->stock;
        $products->category_id = $request->category_id;
        $products->description = $request->description;
        $products->isActive = $request->isActive;
        $products->save();
   
       // Redirect back with a success message
       return redirect()->route('product')->with('success', 'Product created successfully!');
    }
}
