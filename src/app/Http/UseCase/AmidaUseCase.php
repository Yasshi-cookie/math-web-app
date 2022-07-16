<?php

namespace App\Http\UseCase;

use App\Http\Requests\SymmetricGroupRequest;
use App\Math\FundamentalTransposition;
use App\Math\SymmetricGroupMath;

class AmidaUseCase extends UseCase
{
    /**
     * constructor
     *
     * @param boolean $success
     */
    public function __construct(
        bool $successStatus = parent::SUCCESS,
        SymmetricGroupMath $responseData = null,
        string $errorMessage = ''
    )
    {
        parent::__construct(
            $successStatus,
            $responseData,
            $errorMessage
        );
    }

    /**
     * @param SymmetricGroupRequest $request
     * @return self
     */
    public static function newInstanceFromSymmetricGroupRequest(SymmetricGroupRequest $request): self
    {
        $dimension = count($request->amidas[0]) + 1;

        $accumulateSymmetricGroup = [];
        foreach ($request->amidas as $request_amida) {
            foreach ($request_amida as $index => $bool) {
                $accumulateSymmetricGroup[] = self::convertBoolToFundTrans($bool, $index, $dimension);
            }
        }

        return new self(
            parent::SUCCESS,
            SymmetricGroupMath::multiple_product(...$accumulateSymmetricGroup)
        );
    }

    /**
     * private
     */

    /**
     * @param boolean $bool
     * @return SymmetricGroupMath
     */
    private static function convertBoolToFundTrans(bool $bool, int $num, int $dimension): SymmetricGroupMath
    {
        return $bool
            ? new FundamentalTransposition($dimension, $num + 1)
            : SymmetricGroupMath::identity($dimension);
    }
}
