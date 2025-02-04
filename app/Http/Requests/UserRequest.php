<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:0','max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'regex:/^[0-9]{9,11}$/'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
            'role' => ['required'],
            'is_active' => ['required'],
        ];
    }
    public function messages()
    {
        return [
            // 'phone.regex' => 'Số điện thoại phải từ 9 đến 11 chữ số.',
            // 'email.required' => 'Email là bắt buộc.',
            // 'email.email' => 'Định dạng email không hợp lệ.',
        ];
    }
}
