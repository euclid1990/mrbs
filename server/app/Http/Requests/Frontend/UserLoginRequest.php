<?php

namespace App\Http\Requests\Frontend;

use App\Http\Requests\Request;

class UserLoginRequest extends Request {

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required',
            'password' => 'required',
        ];
    }

    public function all()
    {
        $input = parent::all();
        $input['remember'] = (isset($input['remember']) && $input['remember']) ? true : false;
        $this->replace($input);
        return parent::all();
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
