<?php

namespace Tests\Unit\RationalMathTests;

use App\Math\RationalMath;
use Exception;
use Tests\TestCase;

class RationalMathTest extends TestCase
{
    use RationalMathDataProviderTrait;

    // protected function setUp(): void
    // {
    //     parent::setUp();
    // }

    /**
     * @test
     * @dataProvider addCases
     */
    public function testAdd(
        RationalMath $rat_a,
        RationalMath $rat_b,
        RationalMath $expected
    ): void
    {
        $added_rat = RationalMath::add_rat($rat_a, $rat_b);

        $this->assertEquals($expected, $added_rat);
    }

    /**
     * @test
     * @dataProvider productCases
     */
    public function testProduct(
        RationalMath $rat_a,
        RationalMath $rat_b,
        RationalMath $expected
    ): void
    {
        $added_rat = RationalMath::product_rat($rat_a, $rat_b);

        $this->assertEquals($expected, $added_rat);
    }

    /**
     * @test
     */
    public function testDenominatorIsZeroException(): void
    {
        $this->expectException(Exception::class);
        new RationalMath(1, 0);
    }

    /**
     * @test
     */
    public function testInverseRationalWhoseNumeratorIsZeroException(): void
    {
        $this->expectException(Exception::class);
        // $rational = 0 / 1
        $rational = new RationalMath(0, 1);

        // 1 / 0
        $rational->inverse();
    }

    /**
     * @test
     */
    public function testPostThenOk(): void
    {
        $data = [
            "amidas" => [
                [
                    true,
                    false,
                    false
                ],
                [
                    false,
                    false,
                    false
                ],
                [
                    false,
                    false,
                    false
                ],
                [
                    false,
                    false,
                    false
                ],
            ],
        ];

        $response = $this->post('api/symmetric-group', $data);
        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function testGetThenOk(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
