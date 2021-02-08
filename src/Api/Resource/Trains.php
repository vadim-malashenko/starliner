<?php

namespace Starliner\Train\Api\Resource;

use Psr\Http\Message\RequestInterface;
use Starliner\Train\Api\Resource;
use Starliner\Train\Api\Type\TravelInfo;

class Trains extends Resource
{
    public function get(RequestInterface $request)
    {
        $travelInfo = TravelInfo::factory($request->getGet());
        $trains = $this->_service->trainList($travelInfo)->train_list;
        if ( ! is_array($trains)) {
            $trains = [$trains];
        }
        return array_map(static fn($train): string => (string) $train->train_description->number, $trains);
    }
}