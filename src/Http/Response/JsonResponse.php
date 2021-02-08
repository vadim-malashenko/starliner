<?php

namespace Starliner\Train\Http\Response;

use Starliner\Train\Http\Response;

class JsonResponse extends Response
{
    public function __construct(int $statusCode, $content)
    {
        parent::__construct();
        try {
            $json = json_encode($content, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
        }
        catch (\JsonException $ex) {
            $statusCode = 500;
            $json = "{\"error\":{\"code\":{$statusCode},\"message\":\"{$ex}\"}}";
        }

        $this->statusCode = $statusCode;
        $this->content = $json;
        $this->contentType = 'application/json';
    }
}