<?php

namespace App\Http\Requests\Blog;

use Illuminate\Foundation\Http\FormRequest;

class StoreBlogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => ['required', 'min:5', 'max:100', 'unique:blogs'],
            'subtitle' => ['required', 'min:5', 'max:100'],
            'category_id' => ['required'],
            'content' => ['required'],
            'meta_info' => ['required', 'min:5', 'max:250'],
            'urlimage' => ['required', 'mimes:png,jpg,svg,gif', 'max:2048'],
        ];
    }
}
