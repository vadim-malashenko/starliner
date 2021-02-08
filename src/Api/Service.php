<?php

namespace Starliner\Train\Api;

use Starliner\Train\Api\Type\Auth;
use Starliner\Train\Api\Type\TravelInfo;
use Starliner\Train\AppError;
use Starliner\Train\Http\InternalServerErrorException;
use Starliner\Train\Http\NotImplementedException;

class Service
{
    public const WSDL = 'https://api.starliner.ru/Api/connect/Soap/Train/1.0.0?wsdl';
    public const OPTIONS = [
        'soap_version' => \SOAP_1_2
    ];

    protected Cache $_cache;

    protected \SoapParam $_auth;
    protected \SoapClient $_client;

    public $_methods;

    public function __construct($auth, Cache $cache)
    {
        $this->_cache = $cache;

        $this->_client = new \SoapClient(static::WSDL, static::OPTIONS);

        $this->_auth = Auth::factory($auth)->createSoapParam();

        $this->_methods = $this->_cache->get('methods', array_reduce(
            $this->_client->__getFunctions(),
            static function(array $a, string $c): array {
                preg_match('#^(\w+) (\w+)(?:\s+\w+)*\s*\(([^),]*)(\s*,\s*[^),]*)+\)#', $c, $m);
                $m = array_map(static fn ($v) => trim($v, ", "), $m);
                [$return, $name, $args] = [$m[1], $m[2], array_slice($m, 3)];
                $a[$name] = [
                    'args' => array_reduce($args, static fn($a, $c) => $a + [preg_replace('#^([^ ]+ )#', '', $c) => preg_replace('# .+$#', '', $c)], []),
                    'return' => $return
                ];
                return $a;
            },
            []
        ));
    }

    public function __call($method, array $args)
    {
        if ( ! isset($this->_methods->$method)) {
            throw new NotImplementedException($method);
        }

        $result = $this->_client->$method($this->_auth, ... array_map(static fn($arg): \SoapParam => $arg->createSoapParam(), $args));

        return $this->_cache->get(implode('.', array_merge([$method], $args)), $result);
    }

    public function isTravelInfoValid(TravelInfo $travelInfo): bool
    {
        return true;
    }
}