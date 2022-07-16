<?php

namespace App\Http\Controllers;

use App\Http\Requests\SymmetricGroupRequest;
use App\Http\Response\SymmetricGroupResponse;
use App\Http\UseCase\AmidaUseCase;

class SymmetricGroupController extends Controller
{
    public function index(SymmetricGroupRequest $request): SymmetricGroupResponse
    {
        if ($request->isValidationFailed()) {
            return SymmetricGroupResponse::newInstanceFromInvalidRequest($request);
        }

        $amida_use_case = AmidaUseCase::newInstanceFromSymmetricGroupRequest($request);

        return SymmetricGroupResponse::newInstanceFromAmidaUseCase($amida_use_case);
    }
}
