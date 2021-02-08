<?php

namespace Starliner\Train\Api;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use Starliner\Train\App;
use Starliner\Train\AppError;
use Starliner\Train\Http\Response\JsonResponse;

class Resource
{
    protected Service $_service;

    public static function factory(Service $service): self
    {
        $resource = new static();
        $resource->_service = $service;
        return $resource;
    }

    public function response(RequestInterface $request, string $method = 'get'): ResponseInterface
    {
        $statusCode = 200;

        try {
            $response = $this->$method($request);
        }
        catch (\SoapFault $ex) {
            $response = new AppError($ex);
        }
        catch (\Exception $ex) {
            $response = new AppError($ex);
        }

        if ($response === null) {
            $response = [];
        }
        else if ($response instanceof AppError) {
            $response = (object) ['error' => $response];
        }

        return new JsonResponse($statusCode, $response);
    }
}