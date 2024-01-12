<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDataRequest;
use App\Http\Resources\DataResources;
use App\Models\Account;
use Illuminate\Http\Request;

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
        $user = $request->user();

    }
}
