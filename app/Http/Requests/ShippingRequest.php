<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShippingRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'order_id' => ['required', 'integer'],
            'shipping_status' => ['required', 'string'],
            'shipping_address' => ['required', 'string', 'max:255'],
            'shipping_date' => ['required', 'date'],
            'contact_phone' => ['required', 'regex:/^(\+84|0)[1-9][0-9]{8,9}$/'],
        ];
    }
}
