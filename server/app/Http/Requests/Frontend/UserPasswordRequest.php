<?php

namespace App\Http\Requests\Frontend;

use App\Http\Requests\Request;

class UserPasswordRequest extends Request {

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = config('common.user');
        $passwordMin = $rules['password']['min'];
        $passwordMax = $rules['password']['max'];
        return [
            'password_current' => 'required|password_current',
            'password' => [
                'required',
                "between:$passwordMin,$passwordMax",
                'confirmed',
            ],
            'password_confirmation' => 'required',
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
