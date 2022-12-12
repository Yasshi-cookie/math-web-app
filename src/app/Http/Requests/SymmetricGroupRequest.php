<?php

namespace App\Http\Requests;

class SymmetricGroupRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'amidas' => [
                // amidas
                'required',
                'array',
            ],
            'amidas.*' => [
                // amidasの要素
                'required',
                'array',
            ],
            'amidas.*.*' => [
                // amidasの要素（配列）の要素
                'required',
                'bool',
            ],
        ];
    }

    /**
     * Get message when fail valiation
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'amidas.*' => 'amidasには配列を入れてください。',
            'amidas.*.*' => 'amidasの中は配列を入れてください。',
            'amidas.*.*.*' => 'amidasの中の配列の中にはbool値を入れてください。',
        ];
    }

    /**
     * バリデーションが失敗したかどうか
     *
     * @return boolean
     */
    public function isValidationFailed(): bool
    {
        return $this->validator->fails();
    }


    public function getValidationErrorMessages()
    {
        return $this->validator->errors()->messages();
    }
}
