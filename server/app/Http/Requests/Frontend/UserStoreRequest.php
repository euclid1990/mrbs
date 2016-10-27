<?php

namespace App\Http\Requests\Frontend;

use App\Http\Requests\Request;

class UserStoreRequest extends Request {

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = config('common.user');
        $nameMax = $rules['name']['max'];
        $emailMax = $rules['email']['max'];
        $passwordMin = $rules['password']['min'];
        $passwordMax = $rules['password']['max'];
        $genders = implode(',', array_values($rules['gender']));
        return [
            'name' => "required|max:$nameMax",
            'email' => "required|email|max:$emailMax|unique:users,email",
            'gender' => "required|in:$genders",
            'password' => [
                'required',
                "between:$passwordMin,$passwordMax",
                'confirmed',
            ],
            'password_confirmation' => 'required',
            'agreed' => 'required',
        ];
    }

    public function response(array $errors)
    {
        return response()->json([
            'status' => 400,
            'data' => [],
            'errors' => $errors,
        ]);
    }

    public function authorize()
    {
        return true;
    }
}
