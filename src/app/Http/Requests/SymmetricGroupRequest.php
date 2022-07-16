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
            'amidas' => 'required',
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
            'amidas.required' => 'amidasは必須パラメータです。'
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
