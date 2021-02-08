<?php

namespace Starliner\Train\Api;

class Cache
{
    protected string $_dir;

    public function __construct(string $dir)
    {
        if ( ! is_dir($dir) && ! mkdir($dir) && ! is_dir($dir)) {
            throw new \RuntimeException("Invalid directory '{$dir}'", 500);
        }

        $this->_dir = trim($dir. "/\\");
    }

    public function hash(string $value): string
    {
        return md5($value);
    }

    public function path(string $file): string
    {
        $file = $this->hash($file);
        return "{$this->_dir}/$file.json";
    }

    public function get(string $key, $default)
    {
        if ( ! file_exists($path = $this->path($key))) {
            $this->set($key, $default);
        }

        return json_decode(file_get_contents($path), false, 512, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
    }

    public function set(string $key, $value): void
    {
        file_put_contents($this->path($key), json_encode($value, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE));
    }
}