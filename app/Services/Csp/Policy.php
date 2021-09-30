<?php

namespace App\Services\Csp;

use Spatie\Csp\Directive;
use Spatie\Csp\Keyword;
use Spatie\Csp\Policies\Policy as AbstractPolicy;

class Policy extends AbstractPolicy
{
    public function configure()
    {
        $this
            ->addDirective(Directive::DEFAULT, Keyword::SELF)
            ->addDirective(Directive::SCRIPT, Keyword::SELF)
            ->addDirective(Directive::STYLE, Keyword::SELF)
            ->addDirective(Directive::FONT, Keyword::SELF)
            ->addNonceForDirective(Directive::SCRIPT)
            ->addNonceForDirective(Directive::STYLE);

        // Inter webfont
        $this
            ->addDirective(Directive::STYLE, 'https://rsms.me')
            ->addDirective(Directive::FONT, 'https://rsms.me');
    }
}
