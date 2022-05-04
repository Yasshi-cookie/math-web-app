# 開発環境構築
参考
- [【超入門】20分でLaravel開発環境を爆速構築するDockerハンズオン](https://qiita.com/morry_48/items/abd620f051fb4f36dcc2)
- [[簡単]React x LaravelのSPAで作るチュートリアル①(環境構築編)](https://qiita.com/ucan-lab/items/56c9dc3cf2e6762672f4)

Docker, Laravel, Reactで開発環境を構築する

## Dockerでアプリケーションコンテナ、Webサーバーコンテナの作成&Laravelのインストール

[【超入門】20分でLaravel開発環境を爆速構築するDockerハンズオン](https://qiita.com/morry_48/items/abd620f051fb4f36dcc2)の
[Laravel ウェルカム画面の表示](https://qiita.com/ucan-lab/items/56c9dc3cf2e6762672f4#laravel-%E3%82%A6%E3%82%A7%E3%83%AB%E3%82%AB%E3%83%A0%E7%94%BB%E9%9D%A2%E3%81%AE%E8%A1%A8%E7%A4%BA)
まで進めます。（データベースコンテナは作成しなくても良いです。）

この時点で下記のディレクトリ構成およびファイルの内容になっていると思います。

ディレクトリ構成
```
.
├── docker-compose.yml
├── infra
│   ├── nginx
│   │   └── default.conf
│   └── php
│       ├── Dockerfile
│       └── php.ini
└── src
```

各ファイルの内容について（バージョンは適宜最新に変更してください）
docker-compose.yml

```yml
version: "3.9"
services:
  app:
    build: ./infra/php
    volumes:
      - ./src:/data

  web:
    image: nginx:1.20-alpine
    ports:
      - 8080:80
    volumes:
      - ./src:/data
      - ./infra/nginx/default.conf:/etc/nginx/conf.d/default.conf
    working_dir: /data
```

infra/php/Dockerfile
```Dockerfile
FROM php:8.1-fpm-buster

ENV COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

COPY --from=composer:2.2 /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
  apt-get -y install --no-install-recommends git unzip libzip-dev libicu-dev libonig-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  docker-php-ext-install intl pdo_mysql zip bcmath

COPY ./php.ini /usr/local/etc/php/php.ini

WORKDIR /data
```

infra/php/php.ini
```ini
zend.exception_ignore_args = off
expose_php = on
max_execution_time = 30
max_input_vars = 1000
upload_max_filesize = 64M
post_max_size = 128M
memory_limit = 256M
error_reporting = E_ALL
display_errors = on
display_startup_errors = on
log_errors = on
error_log = /dev/stderr
default_charset = UTF-8

[Date]
date.timezone = Asia/Tokyo

[mysqlnd]
mysqlnd.collect_memory_statistics = on

[Assertion]
zend.assertions = 1

[mbstring]
mbstring.language = Japanese
```

infra/nginx/default.conf
```
server {
    listen 80;
    server_name example.com;
    root /data/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
srcにはLaraveをインスールしておく。


## Reactをインストールする

[[簡単]React x LaravelのSPAで作るチュートリアル①(環境構築編)](https://qiita.com/ucan-lab/items/56c9dc3cf2e6762672f4)の[Reactの環境構築](https://qiita.com/morry_48/items/abd620f051fb4f36dcc2#react%E3%81%AE%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89)から進めていく。

laravel/uiとreactを導する。
```bash
# UIパッケージ導入
$ docker compose exec app composer require laravel/ui

# React.js導入
$ docker compose exec app php artisan ui react --auth # --authはつけなくてもOK。

# 下記のように出たらOK
React scaffolding installed successfully.
Please run "npm install && npm run dev" to compile your fresh scaffolding.
Authentication scaffolding generated successfully.
```

Webサーバーコンテナに入ってビルドする。
```bash
# コンテナに入る
$ docker compose exec web sh

# nginxのaplineを使っているためパッケージ管理コマンドにはapkを使います。
[web] apk update
[web] apk add npm
[web] npm install
[web] npm run dev
> development
> mix

        Additional dependencies must be installed. This will only take a moment.

        Running: npm install resolve-url-loader@^5.0.0 --save-dev --legacy-peer-deps

        Finished. Please run Mix again.
# 上記のように出力されるので下記を実行してもう一度 npm run dev を実行する
[web] npm install resolve-url-loader@^5.0.0 --save-dev --legacy-peer-deps
[web] npm run dev
```

apkコマンドとaptコマンドの違いはこちらを参照：[Alpineのapkコマンドとaptの違いまとめ](https://kleinblog.net/alpine-apk-cmd.html)

あとは、[コマンドにより生成された不要なファイルを削除しておく](https://qiita.com/morry_48/items/abd620f051fb4f36dcc2#%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%81%AB%E3%82%88%E3%82%8A%E7%94%9F%E6%88%90%E3%81%95%E3%82%8C%E3%81%9F%E4%B8%8D%E8%A6%81%E3%81%AA%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E5%89%8A%E9%99%A4%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F)から続きを行う。

resources/viewsディレクトリ下のファイルをapp.blade.phpだけにしておく。（シングルページなのでその他のviewファイルは不要なので。）

resources/views/app.blade.php
```html
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
    </div>
</body>
</html>
```

resources/js/components/Example.jsを修正。
拡張子もjsからjsxに変更する。
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">テストヘッダー</div>

                        <div className="card-body">テストボディ</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('app')) {
    ReactDOM.render(<Example />, document.getElementById('app'));
}
```

routes/web.phpを修正。
```php
<?php

use Illuminate\Support\Facades\Route;

// （中略）

Route::get('{any}', function () {
    return view('app');
})->where('any','.*');
```

Reactファイルの変更を行ったので、再度ビルドする。
```bash
$ docker compose exec web sh

[web] npm run dev
```

[http://localhost:8080/](http://localhost:8080/)にアクセスして、変更が反映されていればOKです。
