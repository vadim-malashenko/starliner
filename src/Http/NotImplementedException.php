<?php

namespace Starliner\Train\Http;

class NotImplementedException extends \Exception {

    public function __construct (string $method)
    {
        parent::__construct ("Not implemented: {$method}", 501);
    }
}