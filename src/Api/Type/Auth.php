<?php

namespace Starliner\Train\Api\Type;

use Starliner\Train\Api\Type;

class Auth extends Type
{
    public const NAME = 'auth';
    public const FIELDS = [
        'login' => true,
        'psw' => true,
        'terminal' => true,
        'represent_id' => true
    ];
}