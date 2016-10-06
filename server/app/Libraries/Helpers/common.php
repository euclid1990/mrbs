<?php

if (!function_exists('set_carbon_locale'))
{
    /**
     * Custom translator for Carbon()
     *
     */
    function set_carbon_locale()
    {
        $locale = \App::getLocale();
        \Carbon\Carbon::setLocale($locale);
        \Carbon\Carbon::getTranslator()->addResource('array', require app_path("../resources/lang/$locale/carbon.php"),
            $locale);
    }
}

if (!function_exists('truncate_text'))
{
    /**
     * Truncate text with two type: number character (substr) | width of character (strimwidth)
     *
     * @param  string $value
     * @param  int    $n
     * @param  string $trimmarker
     * @param  string $type
     * @return string
     */
    function truncate_text($value, $n, $trimmarker = '...', $type = 'substr')
    {
        $n = (int)$n;
        if ($type == 'strimwidth') {
            return mb_strimwidth($value,  0, $n, $trimmarker);
        }
        if ($n >= mb_strlen($value)) {
            $trimmarker = '';
        }
        return mb_substr($value, 0, $n) . $trimmarker;
    }
}

if (!function_exists('unique_token'))
{
    /**
     * Generate a unique token
     *
     * @return string
     */
    function unique_token()
    {
        return md5(str_random(16) . mt_rand() . microtime());
    }
}