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

    public function showData(Request $request){
        $data = DB::table('accounts')->where('author_id', $request->user()->id)->get();
        $dataResource = AccountResources::collection($data);
        // $dataResource = ShowDataResources::make($data);
        return $dataResource;

    }
}
