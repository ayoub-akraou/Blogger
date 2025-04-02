<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * Les groupes de middleware de l'application.
     *
     * @var array
     */
    protected $middlewareGroups = [
        'api' => [
            // Middleware pour les requêtes frontend stateful (SPAs)
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,

            // Limitation du taux de requêtes (60 requêtes/minute par défaut)
            'throttle:api',

            // Injection des models dans les routes
            \Illuminate\Routing\Middleware\SubstituteBindings::class,

            // Si vous utilisez des sessions (décommenter si nécessaire)
            // \Illuminate\Session\Middleware\StartSession::class,

            // Si vous utilisez des cookies (décommenter si nécessaire)
            // \Illuminate\Cookie\Middleware\EncryptCookies::class,
        ],
    ];
}
