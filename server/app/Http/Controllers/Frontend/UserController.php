<?php

namespace App\Http\Controllers\Frontend;

use Exception;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\UserStoreRequest;
use App\Http\Requests\Frontend\UserLoginRequest;
use App\Http\Requests\Frontend\UserPasswordRequest;

class UserController extends Controller {

    protected $userService;

    /**
     * Instantiate a new instance.
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $layout = config('common.layouts.frontend.default');
        parent::__construct($layout);
        $this->userService = $userService;
    }

    public function index()
    {
        $this->viewData['title'] = trans('frontend/user/titles.index');
        return view('frontend.user.index', $this->viewData);
    }

    public function store(UserStoreRequest $request)
    {
        $input = $request->only('name', 'email', 'password', 'avatar', 'gender');
        $input['status'] = config('common.user.status.inactive');
        try {
            $result = $this->userService->registration($input);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'errors' => ['server' => [$e->getMessage()]],
            ]);
        }
        return response()->json([
            'status' => 200,
            'data' => $result,
        ]);
    }

    public function login(UserLoginRequest $request)
    {
        $input = $request->only('username', 'password');
        try {
            $result = $this->userService->login($input);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'errors' => ['server' => [$e->getMessage()]],
            ]);
        }
        return response()->json([
            'status' => 200,
            'data' => $result,
        ]);
    }

    public function confirm($id, $activeToken)
    {
        try {
            $this->userService->confirm($id, $activeToken);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'errors' => ['server' => [$e->getMessage()]],
            ]);
        }
        return response()->json([
            'status' => 200,
            'data' => [],
        ]);
    }

    public function password(\Request $request)
    {
        $token = \JWTAuth::getToken();
        $token = \JWTAuth::getPayload($token)->get('sub');
        return ($token);
        $input = $request->only('password');
        try {
            $result = $this->userService->password($input);
        } catch (Exception $e) {
            return response()->json([
                'status' => 500,
                'errors' => ['server' => [$e->getMessage()]],
            ]);
        }
        return response()->json([
            'status' => 200,
            'data' => $result,
        ]);
    }

}