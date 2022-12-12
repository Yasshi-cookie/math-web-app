<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Math\RationalMath;

class RationalController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        return view('rational.index');
    }

    /**
     * フォーム送信時の処理
     *
     * @param Request $request
     * @return void
     */
    public function post(Request $request)
    {
        $rat_a = new RationalMath($request->denominator_a, $request->numerator_a);
        $rat_b = new RationalMath($request->denominator_b, $request->numerator_b);

        switch ($request->operator) {
            case 1:
                $img_url = RationalMath::add_rat($rat_a, $rat_b)->display();
                break;
            case 2:
                $img_url = RationalMath::sub_rat($rat_a, $rat_b)->display();
                break;
            case 3:
                $img_url = RationalMath::product_rat($rat_a, $rat_b)->display();
                break;
            case 4:
                $img_url = RationalMath::devide_rat($rat_a, $rat_b)->display();
                break;
        }

        return view('rational.index', compact('img_url'));
    }
}
