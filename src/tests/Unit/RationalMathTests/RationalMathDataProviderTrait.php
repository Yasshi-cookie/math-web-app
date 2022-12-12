<?php

namespace Tests\Unit\RationalMathTests;

use App\Math\RationalMath;

trait RationalMathDataProviderTrait
{
    public function addCases(): array
    {
        /**
         * 3cases
         * + 0 -
         */
        return [
            'add_plus_plus'  => [
                new RationalMath(1, 2),
                new RationalMath(1, 3),
                new RationalMath(5, 6),
            ],
            'add_zero_plus'  => [
                RationalMath::zero(),
                new RationalMath(1, 3),
                new RationalMath(1, 3),
            ],
            'add_minus_plus'  => [
                new RationalMath(-1, 2),
                new RationalMath(1, 3),
                new RationalMath(-1, 6),
            ],
            'add_zero_zero'  => [
                RationalMath::zero(),
                RationalMath::zero(),
                RationalMath::zero(),
            ],
            'add_minus_zero'  => [
                new RationalMath(-1, 2),
                RationalMath::zero(),
                new RationalMath(-1, 2),
            ],
            'add_minus_minus'  => [
                new RationalMath(-1, 2),
                new RationalMath(-1, 3),
                new RationalMath(-5, 6),
            ],
        ];
    }

    public function productCases(): array
    {
        /**
         * 4cases
         * + 1 0 -
         */
        return [
            'product_plus_plus'  => [
                new RationalMath(1, 2),
                new RationalMath(1, 3),
                new RationalMath(1, 6),
            ],
            'product_one_plus'  => [
                RationalMath::one(),
                new RationalMath(1, 2),
                new RationalMath(1, 2),
            ],
            'product_zero_plus'  => [
                RationalMath::zero(),
                new RationalMath(1, 3),
                RationalMath::zero(),
            ],
            'product_minus_plus'  => [
                new RationalMath(-1, 2),
                new RationalMath(1, 3),
                new RationalMath(-1, 6),
            ],

            'product_one_one'  => [
                RationalMath::one(),
                RationalMath::one(),
                RationalMath::one(),
            ],
            'product_zero_one'  => [
                RationalMath::zero(),
                RationalMath::one(),
                RationalMath::zero(),
            ],
            'product_minus_one'  => [
                new RationalMath(-1, 2),
                RationalMath::one(),
                new RationalMath(-1, 2),
            ],

            'product_zero_zero'  => [
                RationalMath::zero(),
                RationalMath::zero(),
                RationalMath::zero(),
            ],
            'product_minus_zero'  => [
                new RationalMath(-1, 2),
                RationalMath::zero(),
                RationalMath::zero(),
            ],

            'product_minus_minus'  => [
                new RationalMath(-1, 2),
                new RationalMath(-1, 3),
                new RationalMath(1, 6),
            ],
        ];
    }
}
