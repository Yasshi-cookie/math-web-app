<?php

namespace App\Math;

require_once __DIR__ . "/../../vendor/autoload.php";

use Exception;

class FundamentalTransposition extends SymmetricGroupMath
{
    protected int $dimension;
    protected int $integer;

    /**
     * constructor
     */
    public function __construct(int $dimension, int $integer)
    {
        if ($integer < 1 || $integer > $dimension) {
            throw new Exception('integerは1以上かつ、' . $dimension . '以下の値を入れてください。');
        }
        $this->setDimension($dimension);

        $map = [];
        for ($i = 1; $i <= $dimension; $i++) {
            $map[$i] = $i;
        }
        $map[$integer] = ($integer % $dimension) + 1;
        $map[($integer % $dimension) + 1] = $integer;
        $this->setMap($map);
    }
}
