<?php

namespace App\Http\Requests\Frontend;

use App\Http\Requests\Request;

class ValidateUniqueEmailRequest extends Request {

    public function rules()
    {
        return [
            'email' => "required|unique:users,email",
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
