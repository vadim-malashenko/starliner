<?php

namespace Starliner\Train\Api\Type;

use Starliner\Train\Api\Type;

class Train extends Type
{
    public const NAME = 'train';
    public const FIELDS = [
        'train' => true
    ];

    public function createSoapParam(): \SoapParam
    {
        return new \SoapParam($this->_data['train'] , static::NAME);
    }
}