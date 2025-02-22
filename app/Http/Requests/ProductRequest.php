<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     *  
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string','max:255'],
            'category_id' => ['required'],
            'image_url' => ['required', 'image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
            'stock' => ['required', 'integer', 'min:0'], 
            'price' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable','string'],
            'isActive' => ['required'],
        ];
    }
    public function messages()
    {
        return [
        'name.required' => 'The product name is required.',
        'name.string' => 'The product name must be a string.',
        'name.max' => 'The product name must not exceed 255 characters.',
        'category_id.required' => 'The category ID is required.',
        'category_id.exists' => 'The selected category does not exist.',
        'image_url.required' => 'An image is required.',
        'image_url.image' => 'The file must be an image.',
        'image_url.mimes' => 'The image must be a file of type: jpg, jpeg, png, or gif.',
        'image_url.max' => 'The image must not exceed 2MB in size.',
        'stock.required' => 'The stock field is required.',
        'stock.integer' => 'The stock must be an integer.',
        'stock.min' => 'The stock must be at least 0.',
        'price.required' => 'The price field is required.',
        'price.numeric' => 'The price must be a number.',
        'price.min' => 'The price must be at least 0.',
        'isActive.required' => 'The isActive field is required.',
        ];
    }
}
