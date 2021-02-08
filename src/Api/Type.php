<?php

namespace Starliner\Train\Api;

abstract class Type
{
    protected array $_data = [];

    public static function factory(array $input): self
    {
        $type = new static();
        foreach (static::FIELDS as $field => $nothing) {
            $type->_data[$field] = $input[$field];
        }
        return $type;
    }

    public function createSoapParam(): \SoapParam
    {
        return new \SoapParam($this->_data , static::NAME);
    }

    public function __toString(): string
    {
        return http_build_query($this->_data);
    }
}