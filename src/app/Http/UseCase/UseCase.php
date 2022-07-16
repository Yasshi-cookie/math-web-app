<?php

namespace App\Http\UseCase;

class UseCase
{
    const SUCCESS = true;
    const FAIL = false;

    public bool $successStatus;
    public mixed $responseData;
    public string $errorMessage;

    public function __construct(
        bool $successStatus,
        mixed $responseData,
        string $errorMessage
    )
    {
        $this->successStatus = $successStatus;
        $this->responseData = $responseData;
        $this->errorMessage = $errorMessage;
    }
}
