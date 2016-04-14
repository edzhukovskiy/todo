<?php
/**
 * Created by PhpStorm.
 * User: 37498_000
 * Date: 12.04.2016
 * Time: 18:02
 */

namespace App\Http\Controllers;

use App\ToDo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ToDoController extends Controller
{

    protected $modelName;

    public function __construct(ToDo $toDo)
    {
        $this->modelName = $toDo;
    }
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $sql = "SELECT t.*, p.color as color FROM todolist t INNER JOIN priorities p ON p.id = t.priority_id ORDER BY t.priority_id ";
        $result = DB::select(DB::raw($sql));
        return response()->json($result);
    }
    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return response()->json($this->modelName->findOrFail($id));
    }
    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit($id)
    {
        return response()->json($this->modelName->find($id));
    }
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        $validator = \Validator::make(request()->all(),[
            'title'     =>'required|max:255',
            'priority_id'  =>'required',
        ]);

        if($validator->fails())
            return response()->json([
                'success'   =>false,
                'messages'  =>$validator->messages()
            ]);
        if($isSaved = $this->modelName->create(request()->all()))
            $data = [
                'success'=>true,
                'response'=>$isSaved
            ];
        else
            $data = [
                'success'=>false,
                'message'=>'Cant create'
            ];
        return response()->json($data);
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id)
    {
//        dd(request()->all());
        $aaa = [
            'title'     =>'required|max:255',
            'priority_id'  =>'required',
        ];
        if(request()->has('done')){
            $aaa = [
                'title'     =>'',
                'priority_id'  =>'',
            ];
        }
            $validator = \Validator::make(request()->all(),[
                $aaa
            ]);

        if($validator->fails())
            return response()->json([
                'success'   =>false,
                'messages'  =>$validator->messages()
            ]);
        if($isUpdated = $this->modelName->find($id)->update(request()->all()))
            $data = [
                'success'=>true,
                'response'=>$isUpdated
            ];
        else
            $data = [
                'success'=>false,
                'message'=>'Cant create'
            ];

        return response()->json($data);
    }

    public function destroy($id)
    {
        $isDeleted = $this->modelName->find($id)->delete();

        $data = $isDeleted
            ? [
                'status'=>true,
                'message'=>"todo with id $id deleted"
            ]
            : [
                'status'=>false,
                'message'=>"Can not delete todo with id $id"
            ];

        return response()->json($data);
    }
}