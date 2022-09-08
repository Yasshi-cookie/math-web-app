<?php

namespace App\Math;

require_once __DIR__ . "/../../vendor/autoload.php";

use Exception;

class RationalMath extends Math
{
    /**
     * 分子
     */
    private int $numerator;

    /**
     * 分母
     */
    private int $denominator;

    /**
     * コンストラクター
     *
     * @param int $numerator
     * @param int $denominator
     */
    public function __construct(int $numerator, int $denominator)
    {
        $this->setDenominator($denominator);
        $this->setNumerator($numerator);

        // 既約分数にする
        $this->reduce();
        // 標準化する
        $this->standardize();
    }

    /**
     * Getter
     */

    /**
     * 分母を取得
     *
     * @return integer
     */
    public function getDenominator(): int
    {
        return $this->denominator;
    }

    /**
     * 分子を取得
     *
     * @return integer
     */
    public function getNumerator(): int
    {
        return $this->numerator;
    }

    /**
     * Setter
     */

    /**
     * 分母をセット
     *
     * @param integer $denominator
     * @throws Exception
     */
    public function setDenominator(int $denominator)
    {
        if ($denominator === 0) {
            throw new Exception('分母に0を指定することはできません。');
        }
        $this->denominator = $denominator;
    }

    /**
     * 分子をセット
     *
     * @param integer $numerator
     */
    public function setNumerator(int $numerator)
    {
        $this->numerator = $numerator;
    }

    /**
     * 表示用の画像を生成する
     *
     * @return void
     */
    public function display()
    {
        $numerator = $this->numerator;
        $denominator = $this->denominator;

        $get_param = '\displaystyle \frac{' . $this->numerator . '}{' . $this->denominator . '}';
        if ($numerator % $denominator === 0) {
            $get_param = '\displaystyle ' . $numerator / $denominator;
        }

        return self::DISPLAY_BASE_URL . urlencode($get_param);
    }

    /**
     * 四則演算
     */

    /**
     * $rat_a + $rat_bを返す
     *
     * @param self $rat_a
     * @param self $rat_b
     * @return self
     */
    public static function add_rat(self $rat_a, self $rat_b): self
    {
        $denominator_a = $rat_a->getDenominator();
        $numerator_a   = $rat_a->getNumerator();
        $denominator_b = $rat_b->getDenominator();
        $numerator_b   = $rat_b->getNumerator();

        $added_numerator = $denominator_a * $numerator_b + $denominator_b * $numerator_a;
        $added_denominator = $denominator_a * $denominator_b;
        return new self($added_numerator, $added_denominator);
    }

    /**
     * $rat_a - $rat_bを返す
     *
     * @param self $rat_a
     * @param self $rat_b
     * @return self
     */
    public static function sub_rat(self $rat_a, self $rat_b): self
    {
        return self::add_rat($rat_a, self::minus($rat_b));
    }

    /**
     * $rat_a * $rat_bを返す
     *
     * @param self $rat_a
     * @param self $rat_b
     * @return self
     */
    public static function product_rat(self $rat_a, self $rat_b): self
    {
        $denominator_a = $rat_a->getDenominator();
        $numerator_a   = $rat_a->getNumerator();
        $denominator_b = $rat_b->getDenominator();
        $numerator_b   = $rat_b->getNumerator();

        $producted_denominator = $denominator_a * $denominator_b;
        $producted_numerator = $numerator_a * $numerator_b;
        return new self($producted_numerator, $producted_denominator);
    }

    /**
     * $rat_a ÷ $rat_bを返す
     *
     * @param self $rat_a
     * @param self $rat_b
     * @return self
     */
    public static function devide_rat(self $rat_a, self $rat_b): self
    {
        return self::product_rat($rat_a, $rat_b->inverse());
    }

    /**
     * (-1) * $rat を返す
     *
     * @param self $rat
     * @return self
     */
    public static function minus(self $rat): self
    {
        $rat->setNumerator((-1) * $rat->numerator);
        return $rat;
    }

    /**
     * 逆数を返す
     *
     * @return self
     * @throws Exception
     */
    public function inverse()
    {
        if ($this->numerator === 0) {
            throw new Exception('分子が0である分数を逆数にすることはできません。');
        }

        return new self($this->numerator, $this->denominator);
    }

    /**
     * 最大公約数を返す
     *
     * @param integer $a
     * @param integer $b
     * @return integer
     */
    public function gcd(int $a, int $b): int
    {
        return ($a % $b) ? $this->gcd($b, $a % $b) : $b;
    }

    /**
     * 0（和に関する単位元）を返す
     *
     * @return self
     */
    public static function zero(): self
    {
        return new self(0, 1);
    }

    /**
     * 1（積に関する単位元）を返す
     *
     * @return self
     */
    public static function one(): self
    {
        return new self(1, 1);
    }

    /**
     * private
     */

    /**
     * 既約分数にする
     *
     * @return void
     */
    private function reduce()
    {
        $denominator = $this->getDenominator();
        $numerator = $this->getNumerator();

        $gcd = $this->gcd($numerator, $denominator);

        $this->setDenominator($denominator / $gcd);
        $this->setNumerator($numerator / $gcd);
    }

    /**
     * 標準化する
     * 有理数qを次のいずれかの形にする：
     * dを0以上の整数、nを正の整数とするとき
     * q = d / n
     * q = - d / n
     *
     * @return void
     */
    private function standardize()
    {
        $denominator = $this->denominator;
        $numerator = $this->numerator;
        if ($denominator < 0 && $numerator < 0) {
            // q = d / n の形にする
            $this->denominator = abs($denominator);
            $this->numerator = abs($numerator);
        }
        if ($denominator < 0 && $numerator > 0) {
            // q = - d / n の形にする
            $this->denominator = abs($denominator);
            $this->numerator = (-1) * abs($numerator);
        }
    }
}

// $rat_a = new RationalMath(3, 1);
// echo $rat_a->display();
// $rat_b = new RationalMath(3, 10);

// echo RationalMath::devide_rat($rat_a, $rat_b)->display();
// echo "\n";
