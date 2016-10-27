<?php

namespace App\Validators;

use Auth;
use Illuminate\Validation\Validator;

class CustomValidator extends Validator {

    /**
     * Validate that a input contain both letters and numbers
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @param  array   $parameters
     * @return bool
     */
    public function validateLetterNumber($attribute, $value, $parameters)
    {
        if (preg_match('/[A-Za-z]/', $value) && preg_match('/[0-9]/', $value)) {
            return true;
        }
        return false;
    }

    /**
     * Validate that array input value contain only specified value of given array
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @param  array   $parameters
     * @return bool
     */
    public function validateArrayIn($attribute, $value, $parameters)
    {
        if (!empty($parameters)) {
            foreach ($value as $v) {
                if (!in_array($v, $parameters)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Validate that input password match current password
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @param  array   $parameters
     * @return bool
     */
    public function validatePasswordCurrent($attribute, $value, $parameters)
    {
        $password = bcrypt($value);
        if (auth()->user()) {
            return $password === auth()->user()->getAuthPassword();
        }
        return false;
    }

    /**
     * Validate that input password not same old password
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @param  array   $parameters
     * @return bool
     */
    public function validateNotPasswordOld($attribute, $value, $parameters)
    {
        return !$this->validatePasswordOld($attribute, $value, $parameters);
    }

    /**
     * Validation string not empty (Full-size spaces support)
     *
     * @param  string  $attribute
     * @param  mixed   $value
     * @param  array   $parameters
     * @return bool
     */
    public function validateNotEmpty($attribute, $value, $parameters)
    {
        $value = mb_convert_kana($value, 's');
        $value = trim($value);
        return strlen($value) > 0;
    }
}