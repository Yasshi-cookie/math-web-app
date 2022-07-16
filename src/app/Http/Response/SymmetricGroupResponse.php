<?php

namespace App\Http\Response;

use App\Http\Requests\SymmetricGroupRequest;
use App\Http\UseCase\AmidaUseCase;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SymmetricGroupResponse extends JsonResponse
{
    public bool $successStatus;
    public mixed $message;

    /**
     * constructor
     */
    public function __construct(
        bool $successStatus,
        int $status,
        mixed $message,
        $data = []
    )
    {
        parent::__construct(
            [
                'success' => $successStatus,
                'message' => $message,
                'data' => $data,
            ],
            $status
        );
    }

    /**
     * $requestがInvalideの場合のレスポンスを返す
     *
     * @param SymmetricGroupRequest $request
     * @return SymmetricGroupResponse
     */
    public static function newInstanceFromInvalidRequest(SymmetricGroupRequest $request): SymmetricGroupResponse
    {
        return new self(
            false,
            Response::HTTP_BAD_REQUEST,
            $request->getValidationErrorMessages()
        );
    }

    /**
     * @param AmidaUseCase $amida_use_case
     * @return SymmetricGroupResponse
     */
    public static function newInstanceFromAmidaUseCase(AmidaUseCase $amida_use_case): SymmetricGroupResponse
    {
        return new self(
            $amida_use_case->successStatus,
            Response::HTTP_OK,
            '成功',
            $amida_use_case->responseData->getMap(),
        );
    }
}
