<?php

namespace Starliner\Train\Http;

class NotFoundException extends \Exception {

    public function __construct (string $path)
    {
        parent::__construct ("Not found: {$path}", 404);
    }
}