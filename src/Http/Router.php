<?php

namespace Starliner\Train\Http;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

class Router
{
    protected RequestInterface $request;
    protected array $routes;

    public function __construct(RequestInterface $request)
    {
        $this->request = $request;
    }

    public function add(array $routes = []): void
    {
        $this->routes = $routes;
    }

    public function route(): ResponseInterface
    {
        foreach ($this->routes as $route) {
            if ($this->request->getMethod() === $route['method'] && $this->request->getPath() === $route['path']) {
                return $route['response'] ($this->request);
            }
        }
        throw new NotFoundException($this->request->getPath());
    }
}