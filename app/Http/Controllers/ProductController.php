<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Repositories\ProductRepository;
use App\Repositories\LogRepository;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ProductController extends Controller
{
    protected $productRepository;
    protected $logRepository;

    public function __construct(ProductRepository $productRepository, LogRepository $logRepository)
    {
        $this->productRepository = $productRepository;
        $this->logRepository = $logRepository;
    }

    public function index(Request $request): Response
    {
        $products = $this->productRepository->getAllProducts($request->search);

        return Inertia::render('AdminView/Product/Product', [
            'products' => $products,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create(): Response
    {
        $categories = $this->productRepository->getAllCategories();
        return Inertia::render('AdminView/Product/CreateProduct', [
            'categoryName' => $categories,
        ]);
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        $product = $this->productRepository->createProduct($request->validated());
        $this->logRepository->createLog("Created product id: ". $product->id, $product->id);

        return redirect()->route('product')->with(['success' => 'Product created successfully']);
    }

    public function edit($id): Response
    {
        $product = $this->productRepository->findProductById($id);
        $categories = $this->productRepository->getAllCategories();
        return Inertia::render('AdminView/Product/EditProduct', ['product' => $product, 'categoriesName'=>$categories]);
    }

    public function update(Request $request): RedirectResponse
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category_id' => ['required'],
            'image_url' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
            'stock' => ['required', 'integer', 'min:0'],
            'price' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'isActive' => ['required'],
        ]);

        // Update the product using the repository
        $this->productRepository->updateProduct($request->id, $validatedData);

        // Log the update action
        $this->logRepository->createLog("Updated product - Id: " . $request->id, $request->id);

        // Redirect with a success message
        return redirect()->route('product')->with(['success'=>'Product updated successfully']);
    }

    public function details($id): Response
    {
        $product = $this->productRepository->findProductById($id);
        return Inertia::render('AdminView/Product/DetailsProduct', ['product' => $product]);
    }

    public function destroy($id): RedirectResponse
    {
        $this->productRepository->deleteProduct($id);
        $this->logRepository->createLog("Deleted product - Id: " . $id, $id);

        return redirect()->route('product')->with(['success' => 'Product deleted successfully']);
    }
}
