<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class ProductRepository
{
    public function getAllProducts($search = null)
    {
        $query = Product::query()->with('category');

        if ($search) {
            if (is_numeric($search)) {
                $query->where('id', $search);
            } else {
                $query->where('name', 'like', '%' . $search . '%');
            }
        }

        return $query->orderBy('id', 'desc')->paginate(10)->withQueryString();
    }

    public function getAllCategories()
    {
        return Category::select('id', 'name')->get();
    }

    public function findProductById($id)
    {
        return Product::findOrFail($id);
    }

    public function createProduct(array $data)
    {
        if (isset($data['image_url'])) {
            $data['image_url'] = $data['image_url']->store('productsImages', 'public');
        }

        return Product::create($data);
    }

    public function updateProduct($id, $data)
    {
        $product = $this->findProductById($id);


        if (isset($data['image_url']) && $data['image_url'] !== null) {

            if ($product->image_url) {
                Storage::disk('public')->delete($product->image_url);
            }

            $imagePath = $data['image_url']->store('productsImages', 'public');
            $data['image_url'] = $imagePath;
        } else {
            $data['image_url'] = $product->image_url;
        }

        $product->update($data);
    }


    public function deleteProduct($id)
    {
        $product = $this->findProductById($id);

        if ($product->image_url) {
            Storage::disk('public')->delete($product->image_url);
        }

        return $product->delete();
    }
}
