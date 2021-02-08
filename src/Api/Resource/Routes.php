<?php

namespace Starliner\Train\Api\Resource;

use Psr\Http\Message\RequestInterface;
use Starliner\Train\Api\Resource;
use Starliner\Train\Api\Type\Train;
use Starliner\Train\Api\Type\TravelInfo;

class Routes extends Resource
{
    public function get(RequestInterface $request)
    {
        $train = Train::factory($request->getGet());
        $travelInfo = TravelInfo::factory($request->getGet());
        $routes = $this->_service->trainRoute($train, $travelInfo)->route_list;
        return is_array($routes) ? $routes[0]->stop_list : $routes->stop_list;
    }
}