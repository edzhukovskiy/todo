<?php
/**
 * Created by PhpStorm.
 * User: 37498_000
 * Date: 12.04.2016
 * Time: 18:16
 */

namespace App;
use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    protected $fillable = ['title','priority_id','done'];
    protected $table = 'todolist';
}