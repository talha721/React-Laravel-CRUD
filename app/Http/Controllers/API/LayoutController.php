<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Layout;
use Illuminate\Http\Request;
use App\Http\Traits;
use Validator;

class LayoutController extends Controller
{
    use Traits\ResponseTraits;

    public function show()
    {

        $data = Layout::get();
        if (count($data) > 0) {
            return $this->sendResponse($data, 'Data Found!');
        } else {
            return $this->sendError('No Layout found', ['error' => 'No data Found!']);
        }
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'unique:layouts|required',
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $data = Layout::create([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
        ]);
        return $this->sendResponse($data, 'Layout created!');
    }


    public function update(Request $request)
    {

        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|unique:layouts,title,' . $request->id,
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $data = Layout::where('id', $request->id);
        $data->update([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
        ]);

        return $this->sendResponse($data, 'Layout updated!');
    }

    public function delete(Request $request)
    {
        $data = Layout::where('id', $request->id)->first();
        if ($data) {
            $data = Layout::where('id', $request->id)->delete();
            if ($data == 1) {
                return $this->sendResponse("Layout Found", 'Layout Deleted!');

            } else {
                return $this->sendError('Layout Not Found', ['error' => 'Layout not found']);

            }
        } else {
            return $this->sendError('Layout Not Found', ['error' => 'Layout not found']);
        }
    }
}
