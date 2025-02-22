<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function getAllCategories($search = null)
    {
        $query = Category::query();

        if ($search) {
            if (is_numeric($search)) {
                $query->where('id', $search);
            } else {
                $query->where('name', 'like', '%' . $search . '%');
            }
        }

        return $query->orderBy('id', 'desc')->paginate(10)->withQueryString();
    }
    
    public function getAllCategoriesNames()
    {
        return Category::select('id', 'name')->get();
    }
    

    public function createCategory($data)
    {
        return Category::create($data);
    }

    public function findCategoryById($id)
    {
        return Category::findOrFail($id);
    }

    public function updateCategory($id, $data)
    {
        $category = Category::findOrFail($id);
        $category->updated_at = now();
        $category->update($data);
        return $category;
    }

    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        return $category->delete();
    }
}
