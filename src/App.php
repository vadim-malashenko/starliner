<?php

namespace Starliner\Train;

use Starliner\Train\Http\Router;
use Starliner\Train\Http\Request;
use Starliner\Train\Http\Response;
use Starliner\Train\Api\Cache;
use Starliner\Train\Api\Service;
use Starliner\Train\Api\Resource\Cities;
use Starliner\Train\Api\Resource\Routes;
use Starliner\Train\Api\Resource\Trains;

class App {

    protected string $_dir;

    public function __construct(string $dir)
    {
        $this->_dir = trim($dir, "/\\");
        $service = new Service(require $this->path('config/auth.php'), new Cache($this->path('cache')));

        $router = new Router(new Request());
        $router->add($this->routes($service));

        try {
            $response = $router->route();
        }
        catch (\Exception $ex) {
            $statusCode = $ex->getCode();
            $response = new Response(500, $this->load("assets/template/{$statusCode}.html"), 'text/html');
        }

        echo $response->getBody();
    }

    public function routes(Service $service): array
    {
        return [
            [
                'method' => 'GET',
                'path' => '/',
                'response' => fn() => new Response(200, $this->load('assets/html/index.html'), 'text/html')
            ],
            [
                'method' => 'GET',
                'path' => '/cities',
                'response' => fn($request) => Cities::factory($service)->response($request)
            ],
            [
                'method' => 'GET',
                'path' => '/trains',
                'response' => fn($request) => Trains::factory($service)->response($request)
            ],
            [
                'method' => 'GET',
                'path' => '/routes',
                'response' => fn($request) => Routes::factory($service)->response($request)
            ]
        ];
    }

    public function path(string $path): string
    {
        $path = trim($path, "/\\");
        return "{$this->_dir}/$path";
    }

    public function load(string $path): string
    {
        return is_file($file = $this->path($path)) ? file_get_contents($path) : '';
    }
}