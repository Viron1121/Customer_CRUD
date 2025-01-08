<?php

namespace App\Http\Controllers;
use App\Models\CustomerModel;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $fetch = CustomerModel::all();
        return response()->json($fetch); //return in json format

        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            DB::beginTransaction();

            $customer = CustomerModel::create($request->all());
    
            DB::commit();
    
            return response([
    
                'customer' => $customer
    
            ], Response::HTTP_CREATED);
        }catch (\Exception $e) {
            DB::rollBack();
            return response([
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
      
   
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try{
            $customer = CustomerModel::find($id);
            $customer->update($request->all());
            return response([
                'customer' => $customer
            ], Response::HTTP_OK);
        }catch(\Exception $e){
            return response([
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try{
            CustomerModel::find($id)->delete();
            return response([
                'message' => 'Customer deleted successfully'
            ], Response::HTTP_OK);
        }
        catch(\Exception $e){
            return response([
                'message' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
