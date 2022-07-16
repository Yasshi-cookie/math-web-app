<?php

namespace App\Math;

require_once __DIR__ . "/../../vendor/autoload.php";

use Exception;

use function PHPSTORM_META\type;

class SymmetricGroupMath extends Math
{
    /**
     * 次元
     *
     * @var integer
     */
    protected int $dimension;

    /**
     * 置換を構成する写像
     *
     * @var array
     */
    protected array $map;

    /**
     * constructor
     */
    public function __construct(array $map)
    {
        $this->setDimension(count($map));
        $this->setMap($map);
    }

    /**
     * Getter
     */

    /**
     * get Dimension
     *
     * @return integer
     */
    public function getDimension(): int
    {
        return $this->dimension;
    }

    /**
     * get Map
     *
     * @return array
     */
    public function getMap(): array
    {
        return $this->map;
    }

    /**
     * Setter
     */

    /**
     * set Dimension
     * 他クラスから次元を変える操作は許可しない
     *
     * @param int $dimension
     */
    protected function setDimension(int $dimension)
    {
        $this->dimension = $dimension;
    }

    /**
     * set Map
     *
     * @param array $map
     */
    public function setMap(array $map)
    {
        if (count(array_unique($map)) !== $this->dimension) {
            throw new Exception('置換のサイズが不適か、または重複した値が入っています。');
        }
        foreach ($map as $value) {
            if (!(is_int($value) && $value >= 1 && $value <= $this->dimension)) {
                throw new Exception('置換の文字は数字で、かつその数値は1からdimensionの間である必要があります。');
            }
        }
        $this->map = $this->key_inc($map);
    }

    /**
     * $perm_a * $perm_bを返す
     *
     * @param self $perm_a
     * @param self $perm_b
     * @return self
     */
    public static function product(self $perm_a, self $perm_b): self
    {
        if ($perm_a->dimension !== $perm_b->dimension) {
            throw new Exception('置換同士の積は、互いに同じ次元である必要があります。');
        }
        $map_a = $perm_a->map;
        $map_b = $perm_b->map;

        $producted_map = array_map(
            function($value) use($map_b) {
                return $map_b[$value];
            },
            $map_a
        );
        return new self($producted_map);
    }

    /**
     * 渡されたすべての置換の積を返す
     *
     * @param self ...$perms
     * @return self
     */
    public static function multiple_product(self ...$perms): self
    {
        return array_reduce(
            $perms,
            function ($accumulator, $element) {
                return self::product($accumulator, $element);
            },
            self::identity($perms[0]->dimension)
        );
    }

    /**
     * $permの逆元を返す
     *
     * @param self $perm
     * @return self
     */
    public function inverse(): self
    {
        $tmp_array =
        $invers_map = [];
        foreach ($this->map as $key => $value) {
            $tmp_array[$value] = $key;
        }
        for ($i = 1; $i <= count($this->map); $i++) {
            $invers_map[$i] = $tmp_array[$i];
        }
        return new self($invers_map);
    }

    /**
     * LaTeX表示用のURLを生成
     *
     * @return string
     */
    public function display(): string
    {
        return self::DISPLAY_BASE_URL . $this->urlParamBuilderForDisplay();
    }

    /**
     * 恒等写像を返す
     *
     * @return self
     */
    public static function identity(int $dimension): self
    {
        $map = [];
        for ($i = 1; $i <= $dimension; $i++) {
            $map[$i] = $i;
        }

        return new self($map);
    }

    /**
     * private
     */

    /**
     * 配列のキーを1から振り直す
     *
     * @param array $map
     */
    private function key_inc(array $map)
    {
        $tmp_array = [];
        $count = 1;
        foreach ($map as $value) {
            $tmp_array[$count] = $value;
            $count++;
        }
        return $tmp_array;
    }

    /**
     * LaTeX表示用のURLパラメータを生成
     *
     * @return string
     */
    private function urlParamBuilderForDisplay(): string
    {
        $get_param = "\displaystyle" . self::STRING_SPACE . "\bigl(\begin{smallmatrix}";
        for ($i = 1; $i <= $this->dimension; $i++) {
            if ($i === $this->dimension) {
                $get_param .= self::STRING_SPACE . $i . self::STRING_SPACE;
                break;
            }
            $get_param .= self::STRING_SPACE . $i . self::STRING_SPACE . self::STRING_AND;
        }

        $get_param .= "\\\\";
        foreach ($this->map as $key => $value) {
            if ($key === array_key_last($this->map)) {
                $get_param .= self::STRING_SPACE . $value . self::STRING_SPACE;
                break;
            }
            $get_param .= self::STRING_SPACE . $value . self::STRING_SPACE . self::STRING_AND;
        }
        $get_param .= '\end{smallmatrix}\bigr)';

        return urlencode($get_param);
    }


    public static function countLeaves(mixed $array)
    {
        if (!is_array($array)) {
            return 1;
        }

        return array_reduce(
            array_map("self::countLeaves", $array),
            "self::plus",
            0
        );
    }


    public static function plus(int $a, int $b): int
    {
        return $a + $b;
    }
}

// $array = [
//     [
//         1, 2, 3
//     ],
//     [
//         4, 5,
//         [
//             6, 7
//         ],
//     ],
// ];
// dd(SymmetricGroupMath::countLeaves($array));

// $permA = new SymmetricGroupMath([2, 3, 1]);
// $permB = new SymmetricGroupMath([2, 3, 1]);
// dd(SymmetricGroupMath::multiple_product($permA, $permB));
// print_r(SymmetricGroupMath::multiple_product($permA, $permB)->display());
// echo "\n";
