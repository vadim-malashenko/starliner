<?php

namespace Starliner\Train\Http;

class InternalServerErrorException extends \Exception {

    public function __construct (string $message)
    {
        parent::__construct ($message, 500);
    }
}