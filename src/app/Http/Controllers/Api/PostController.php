<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = [
            [
                'name' => 'モーリー',
                'content' => '肩トレ',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'ドンキーコング',
                'content' => 'バナナ食う',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'データベース太郎',
                'content' => 'データ投入',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s'),
            ]
        ];

        return response()->json($posts, 200);
    }

    public function create(Request $request)
    {
        $post = [
            'name' => $request->name,
            'content'=> $request->content,
        ];

        return response()->json($post, 200);
    }
}
