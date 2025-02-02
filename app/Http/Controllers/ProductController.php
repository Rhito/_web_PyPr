<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Category;
use App\Models\Log;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function store(ProductRequest $request) : RedirectResponse
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
   

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = "Created product";
        $log->save();
       // Redirect back with a success message
       return redirect()->route('product')->with('success', 'Product created successfully!');
    }

    public function edit($id) {
        $product = Product::findOrFail($id);
        $categoriesName = Category::all();
        return inertia('AdminView/Product/EditProduct', ["product"=> $product, "categoriesName" => $categoriesName] );
    }

    public function update(Request $request ) : RedirectResponse 
    {
        $request->validate([
            'name' => ['required', 'string', 'min:0','max:255'],
            'category_id' => ['required'],
            'image_url' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
            'stock' => ['required|min:0'],
            'price' => ['required|min:0'],
            'price' => ['required|numeric|min:0'],
            'stock' => ['required|integer|min:0'],
            'description' => ['nullable|string'],
            'isActive' => ['required'],
        ]);
      
        $product = Product::where('id', $request->id)->first();
        $product->name = $request->name;
        $product->category_id = $request->category_id;

        // dd($request->image_url);
        if($request->hasFile('image_url') && $request->image_url != null){
            $imagePath = $request->file('image_url')->store('productsImages', 'public');
            $product->image_url = $imagePath;
        }

        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->category_id = $request->category_id;
        $product->description = $request->description;
        $product->isActive = $request->isActive;
        $product->updated_at = now();

        $product->update();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = "Update product - Id: ". $request->id;
        $log->save();
        
        return redirect('products')->with('success', 'Product edit successfully');
    }

    public function details($id) {
        //$product = Product::findOrFail($id);
        $product = Product::where('id', $id)->first();
        return inertia('AdminView/Product/DetailsProduct', ['product'=>$product]);
    }

    public function destroy($id) : RedirectResponse {
        $product = Product::where('id', $id)->first();
        if($product->image_url){
            Storage::disk('public')->delete($product->image_url);
        }
        $product->delete();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = "Delete product - Id: ". $id;
        $log->save();
        return redirect('products')->with('success', 'Product deleted successfully');
    }
}
