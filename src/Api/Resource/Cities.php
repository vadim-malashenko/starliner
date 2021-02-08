<?php

namespace Starliner\Train\Api\Resource;

use Psr\Http\Message\RequestInterface;
use Starliner\Train\Api\Resource;

class Cities extends Resource
{
    public function get(RequestInterface $request)
    {
        $cities = $this->_service->getCities();
        return $cities->list;
    }
}