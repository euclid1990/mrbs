<?php

namespace App\Services;

use DB;
use Auth;
use Mail;
use JWTAuth;
use Socialite;
use Exception;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Events\UserRegistered;
use App\Repositories\UserRepository;
use App\Repositories\RoleRepository;
use App\Repositories\UserRoleRepository;
use App\Repositories\UserPasswordResetRepository;
use App\Repositories\UserOauthRepository;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserService extends BaseService {

    use ThrottlesLogins;

    /**
     * @var \App\Repositories\UserRepository
     * @var \App\Repositories\RoleRepository
     * @var \App\Repositories\UserRoleRepository
     * @var \App\Repositories\UserPasswordResetRepository
     * @var \App\Repositories\UserOauthRepository
     */
    protected  $userRepository, $roleRepository, $userRoleRepository, $userPasswordResetRepository, $userOauthRepository;

    /**
     * Instantiate a new instance.
     *
     * @param UserRepository $userRepository
     * @param RoleRepository $roleRepository
     * @param UserRoleRepository $userRoleRepository
     * @param UserPasswordResetRepository $userPasswordResetRepository
     * @param UserOauthRepository $userOauthRepository
     */
    public function __construct(UserRepository $userRepository,
                                RoleRepository $roleRepository,
                                UserRoleRepository $userRoleRepository,
                                UserPasswordResetRepository $userPasswordResetRepository,
                                UserOauthRepository $userOauthRepository)
    {
        parent::__construct();
        $this->userRepository = $userRepository;
        $this->roleRepository = $roleRepository;
        $this->userRoleRepository = $userRoleRepository;
        $this->userPasswordResetRepository = $userPasswordResetRepository;
        $this->userOauthRepository = $userOauthRepository;
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'username';
    }

    /**
     * Perform user login
     *
     * @param  array  $input
     * @return array
     */
    public function login($input)
    {
        // Username and the IP address of the client making many requests into this application.
        $request = request();
        if ($lockedOut = $this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            $seconds = $this->limiter()->availableIn(
                $this->throttleKey($request)
            );
            throw new Exception(trans('auth.throttle', ['seconds' => $seconds]));
        }
        $identify = $input['username'];
        $credentials = ['password' => $input['password']];
        $field = filter_var($identify, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $credentials[$field] = $identify;
        if ($token = JWTAuth::attempt($credentials)) {
            $this->userRepository->update(['auth_token' => $token], auth()->id());
            return [
                'user' => auth()->user(),
                'token' => $token,
            ];
        }
        throw new Exception(trans('frontend/user/messages.login_incorrect'));
    }

    /**
     * Perform user registration
     *
     * @param  array  $input
     * @param  array  $userSocial
     * @return array
     */
    public function registration($input, $userSocial = [])
    {
        DB::beginTransaction();
        try {
            $statusInactive = config('common.user.status.inactive');
            $activeToken = isset($input['active_token']) ? $input['active_token'] : unique_token();
            $user = $this->userRepository->create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $input['password'],
                'gender' => $input['gender'],
                'active_token' => $activeToken,
                'status' => $input['status'],
                'avatar' => $input['avatar'],
            ]);
            $role = $this->roleRepository->getByName(config('role.name.member'), ['id']);
            $userRole = $this->userRoleRepository->create([
                'user_id' => $user->id,
                'role_id' => $role->id,
            ]);
            if ($userSocial) {
                $this->userOauthRepository->updateOrCreate([
                    'type' => $userSocial->type,
                    'key' => $userSocial->id], [
                    'type' => $userSocial->type,
                    'key' => $userSocial->id,
                    'user_id' => $user->id,
                    'nickname' => $userSocial->nickname,
                    'email' => $userSocial->email,
                    'connect_token' => null,
                    'deleted_at' => null,
                ]);
            }
        } catch (Excepion $e) {
            DB::rollback();
            throw new Exception($e->getMessage());
        }
        DB::commit();
        if ($input['status'] === $statusInactive) {
            event(new UserRegistered($user));
        }
        return ['user_id' => $user->id];
    }

    /**
     * Perform user confirmation email
     *
     * @param  int     $id
     * @param  string  $activeToken
     * @return boolean
     */
    public function confirm($id, $activeToken)
    {
        if (empty($id) || empty($activeToken)) {
            throw new Exception(trans('frontend/user/messages.registration_active_token_invalid'));
            return false;
        }
        $update = $this->userRepository->confirm($id, $activeToken);
        if ($update) {
            return true;
        }
        throw new Exception(trans('frontend/user/messages.registration_active_token_invalid'));
        return false;
    }

    /**
     * Perform user forgot password
     *
     * @param  int     $id
     * @param  string  $activeToken
     * @return boolean
     */
    public function forgotPassword($email)
    {
        $user = $this->userRepository->findByEmail($email, ['id', 'email', 'name']);
        if (!$user) {
            throw new Exception(trans('frontend/user/messages.forgot_password_email_invalid'));
            return false;
        }
        $token = unique_token();
        $this->userPasswordResetRepository->deleteByUserId($user->id);
        $resetPassword = $this->userPasswordResetRepository->create([
            'user_id' => $user->id,
            'email' => $user->email,
            'token' => $token,
        ]);
        $data = [
            'user' => $user,
            'reset_url' => action('Frontend\UserController@getResetPassword', [$resetPassword->id, $token]),
            'layout' => config('common.layouts.email.default'),
        ];
        Mail::send('emails.frontend.user_forgot_password', $data, function ($m) use ($user) {
            $m->from(config('mail.from.address'), config('mail.from.name'));
            $m->to($user->email, $user->name)
                ->subject(trans('frontend/user/messages.forgot_password_email_title'));
        });
        return true;
    }

    /**
     * Perform user reset password
     *
     * @param  string  $resetId
     * @param  string  $resetToken
     * @return boolean/object
     */
    public function resetPasswordValidation($resetId, $resetToken)
    {
        if (empty($resetId) || empty($resetToken)) {
            throw new Exception(trans('frontend/user/messages.reset_password_token_invalid'));
            return false;
        }
        $resetPassword = $this->userPasswordResetRepository->getValidToken($resetId, $resetToken);
        if ($resetPassword) {
            return $resetPassword;
        }
        throw new Exception(trans('frontend/user/messages.reset_password_expried'));
        return false;
    }

    /**
     * Perform user reset password
     *
     * @param  string  $resetId
     * @param  string  $resetToken
     * @return boolean
     */
    public function resetPassword($resetId, $resetToken, $password)
    {
        $resetPassword = $this->resetPasswordValidation($resetId, $resetToken);
        if ($resetPassword) {
            $this->userPasswordResetRepository->destroy($resetId);
            $this->userRepository->update([
                'password' => bcrypt($password),
            ], $resetPassword->user_id);
            return true;
        }
        return false;
    }

    /**
     * Perform OAuth authentication with Facebook, Twitter
     *
     * @param  string   $type
     * @return boolean/array
     */
    public function oauth($type)
    {
        $oauthSessionKey = "oauth_user_{$type}";
        try {
            if (session()->has($oauthSessionKey)) {
                $userSocial = session($oauthSessionKey);
            } else {
                $userSocial = Socialite::driver($type)->user();
                $userSocial->type = $type;
                session([$oauthSessionKey => $userSocial]);
            }
        } catch (Exception $e) {
            throw new Exception(trans('frontend/user/messages.oauth_authenticate_failure', ['sns' => trans("frontend/labels.$type")]));
            return false;
        }
        return $this->oauthCreateOrConnect($type, $userSocial);
    }

    /**
     * Checking oauth account is existing or not exist to authenticate
     *
     * @param  string  $type
     * @param  object  $userSocial
     * @return array
     */
    public function oauthCreateOrConnect($type, $userSocial)
    {
        $result = [
            'unique_email' => true,
            'connected' => true,
            'type' => $type,
            'user_social' => $userSocial,
        ];

        // Connect soical account with current authenticated account.
        if (auth()->check()) {
            $status = auth()->user()->status;
            if ($status === config('common.user.status.inactive')) {
                throw new Exception(trans('frontend/user/messages.oauth_connect_inactive_account'));
                return false;
            }
            $this->userOauthRepository->updateOrCreate([
                'type' => $type,
                'key' => $userSocial->id], [
                'type' => $type,
                'key' => $userSocial->id,
                'user_id' => auth()->id,
                'nickname' => $userSocial->nickname,
                'email' => $userSocial->email,
                'connect_token' => null,
                'deleted_at' => null,
            ]);
            $this->clearOauthSession();
            return $result;
        }

        $userOauth = $this->userOauthRepository->findExisting($type, $userSocial->id, ['id', 'user_id', 'email', 'type', 'key']);
        if ($userOauth) {
            // Find social account in authorized user_oauth account to Login
            $user = $this->userRepository->find($userOauth->user_id);
            if ($user) {
                auth()->login($user);
                $this->clearOauthSession();
                return $result;
            }
        }

        $result['connected'] = false;
        // Notice have already account using social email
        $user = $this->userRepository->findByEmail($userSocial->email, ['id', 'username', 'email']);
        if ($user) {
            $result['unique_email'] = false;
        }
        return $result;
    }

    /**
     * Clear all OAuth authentication with Facebook, Twitter session
     *
     * @param  string  $type
     * @return void
     */
    public function clearOauthSession($type = null)
    {
        if ($type) {
            return session()->forget("oauth_user_{$type}");
        }
        $socials = config('common.oauth.type');
        foreach ($socials as $key => $social) {
            session()->forget("oauth_user_{$social}");
        }
    }

    /**
     * Perform send mail to connect user with social account
     *
     * @return string   $type
     * @return boolean
     */
    public function oauthConnectVerify($type)
    {
        $oauthSessionKey = "oauth_user_{$type}";
        $userSocial = session($oauthSessionKey, []);
        if (empty($userSocial)) {
            throw new Exception(trans('frontend/user/messages.oauth_authenticate_failure', ['sns' => trans("frontend/labels.$type")]));
            return false;
        }
        $user = $this->userRepository->findByEmail($userSocial->email, ['id', 'email', 'name']);
        if (!$user) {
            throw new Exception(trans('frontend/user/messages.oauth_authenticate_user_not_found'));
            return false;
        }
        $connectToken = unique_token();
        $userOauth = $this->userOauthRepository->updateOrCreate([
            'type' => $type,
            'key' => $userSocial->id], [
            'type' => $type,
            'key' => $userSocial->id,
            'nickname' => $userSocial->nickname,
            'email' => $userSocial->email,
            'connect_token' => $connectToken,
            'deleted_at' => null,
        ]);
        $data = [
            'user' => $user,
            'type' => $type,
            'connect_url' => action('Frontend\UserController@getOauthConnect', [$userOauth->id, $connectToken]),
            'layout' => config('common.layouts.email.default'),
        ];
        Mail::send('emails.frontend.user_oauth_connect', $data, function ($m) use ($user, $type) {
            $m->from(config('mail.from.address'), config('mail.from.name'));
            $m->to($user->email, $user->name)
                ->subject(trans('frontend/user/messages.oauth_connect_email_title', ['sns' => trans("frontend/labels.$type")]));
        });
        return ['email' => $user->email];
    }

    /**
     * Perform connect user'account and social account via connect_url
     *
     * @param  int     $userOauthId
     * @param  string  $connectToken
     * @return boolean
     */
    public function oauthConnectAccount($userOauthId, $connectToken)
    {
        if (empty($userOauthId) || empty($connectToken)) {
            throw new Exception(trans('frontend/user/messages.oauth_connect_token_invalid'));
            return false;
        }
        $userOauth = $this->userOauthRepository->getConnectToken($userOauthId, $connectToken);
        if ($userOauth) {
            $user = $this->userRepository->findByEmail($userOauth->email, ['id', 'email', 'name']);
            if (!$user) {
                throw new Exception(trans('frontend/user/messages.oauth_authenticate_user_not_found'));
                return false;
            }
            $this->userOauthRepository->update([
                'user_id' => $user->id,
                'connect_token' => null,
            ], $userOauth->id);
            auth()->login($user);
            return $userOauth;
        }
        throw new Exception(trans('frontend/user/messages.oauth_connect_token_invalid'));
        return false;
    }

    /**
     * Get logged in user's information
     *
     * @return object
     */
    public function getUserAccountFromSession() {
        $userAccount = session('user_account', []);
        if (!$userAccount && auth_check()) {
            $userAccount = auth()->user();
            session(['user_account' => $userAccount]);
        }
        return $userAccount;
    }

    /**
     * Forget logged in user's information
     *
     * @return object
     */
    public function forgetUserAccountFromSession() {
        return session()->forget('user_account');
    }

    /**
     * Perform user change password
     *
     * @param  array  $input
     * @return boolean
     */
    public function password($input)
    {
        if (!isset($input['id'])) {
            $input['id'] = auth()->id();
        }
        $update = $this->userRepository->update(['password' => $input['password']], $input['id']);
        if (!$update) {
            throw new Exception(trans('frontend/user/messages.password_not_change'));
        }
        return ['user_id' => $input['id']];
    }
}