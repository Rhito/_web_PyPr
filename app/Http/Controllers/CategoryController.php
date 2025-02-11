<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Repositories\CategoryRepository;
use App\Repositories\LogRepository;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    protected $categoryRepository;
    protected $logRepository;

    public function __construct(CategoryRepository $categoryRepository, LogRepository $logRepository)
    {
        $this->categoryRepository = $categoryRepository;
        $this->logRepository = $logRepository;
    }

    public function index(Request $request): Response
    {
        $categories = $this->categoryRepository->getAllCategories($request->search);

        return Inertia::render('AdminView/Category/Category', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $categories = $this->categoryRepository->getAllCategoriesNames();
        return Inertia::render('AdminView/Category/CreateCategory', [
            'categories' => $categories,
        ]);
    }

    public function store(CategoryRequest $request): RedirectResponse
    {
        $this->categoryRepository->createCategory($request->validated());
        $this->logRepository->createLog("Created category", $request->id);

        return redirect()->route('category')->with(['success' => 'Category created successfully']);
    }

    public function edit($id): Response
    {
        $category = $this->categoryRepository->findCategoryById($id);
        $categories = $this->categoryRepository->getAllCategoriesNames();
        return Inertia::render('AdminView/Category/EditCategory', ['category' => $category, 'categories' => $categories]);
    }

    public function update(CategoryRequest $request): RedirectResponse
    {
        $this->categoryRepository->updateCategory($request->id, $request->validated());
        $this->logRepository->createLog("Updated category - Id: ". $request->id  , $request->id);

        return redirect()->route('category')->with(['success' => 'Category updated successfully']);
    }

    public function details($id): Response
    {
        $category = $this->categoryRepository->findCategoryById($id);
        return Inertia::render('AdminView/Category/DetailsCategory', ['category' => $category]);
    }

    public function destroy($id): RedirectResponse
    {
        $this->categoryRepository->deleteCategory($id);
        $this->logRepository->createLog("Deleted category - Id: " . $id, $id);

        return redirect()->route('category')->with(['success' => 'Category deleted successfully']);
    }
}
