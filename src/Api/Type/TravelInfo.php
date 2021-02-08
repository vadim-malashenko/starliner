<?php

namespace Starliner\Train\Api\Type;

use Starliner\Train\Api\Type;

class TravelInfo extends Type
{
    public const NAME = 'travel_info';
    public const FIELDS = [
        'from' => true,
        'to' => true,
        'month' => true,
        'day' => true
    ];
}