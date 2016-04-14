<?php
/**
 * Created by PhpStorm.
 * User: 37498_000
 * Date: 13.04.2016
 * Time: 9:39
 */

namespace App\Http\Controllers;

class MainController extends Controller
{
    public function index()
    {
        return view('main/index');
    }
}