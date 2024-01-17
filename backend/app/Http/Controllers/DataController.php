<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\DataResources;
use App\Http\Requests\CreateDataRequest;
use App\Http\Resources\AccountResources;

class DataController extends Controller
{
    public function addAccount(CreateDataRequest $request){
        $request->validated($request->all);
        // dd($request->user()->id);
        $data = Account::create([
            'title' => $request->title,
            'username' => $request->username,
            'password' => $request->password,
            'author_id' => $request->user()->id,
        ]);
        $dataResource = DataResources::make($data);

        return response()->json([
            'data' => $dataResource,
            'message' => 'Data created successfully',
        ]);
    }

    public function updateData(Request $request, $id){
        $data = $request->all();
        $table = Account::where('id', $id)->first();

        if(!$table){
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        }

        if($request->user()->id != $table->author_id) {
            return response()->json([
                'message' => 'Access Denied'
            ], 403);
        }
        $table->update($data);
        // dd($request->all());
        $response = AccountResources::make($table);
        return response()->json([
            'data' => $response,
            'message' => 'Data Updated Successfully'
        ]);

    }

    public function deleteData(Request $request, $id){
        $table = Account::where('id', $id)->first();

        if(!$table){
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        }

        if($request->user()->id != $table->author_id) {
            return response()->json([
                'message' => 'Access Denied'
            ], 403);
        }
        $table->delete();
        return response()->json([
            'message' => 'Data Deleted Successfully'
        ]);
    }

    public function showData(Request $request){
        $data = DB::table('accounts')->where('author_id', $request->user()->id)->get();
        $dataResource = AccountResources::collection($data);
        // $dataResource = ShowDataResources::make($data);
        return $dataResource;

    }
}
