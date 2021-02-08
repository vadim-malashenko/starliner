<?php

namespace Starliner\Train;

class AppError
{
    public int $code;
    public string $message;

    public function __construct(\Throwable $ex)
    {
        $this->code = $ex->getCode();
        $this->message = $ex->getMessage();
    }

    public function __toString(): string
    {
        return "{\"error\":{\"code\":{$this->code},\"message\":\"{$this->message}\"}}";
    }
}