<?php

namespace App\Http\Controllers\api;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Traits;
use Validator;

use App\Http\Controllers\Controller;

class TagController extends Controller
{
    use Traits\ResponseTraits;
    public function show()
    {

        $data = Tag::get();
        if (count($data) > 0) {
            return $this->sendResponse($data, 'Data Found!');
        } else {
            return $this->sendError('No Tag found', ['error' => 'No data Found!']);
        }
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'unique:tags|required',
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $data = Tag::create([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
        ]);
        return $this->sendResponse($data, 'Tag created!');
    }


    public function update(Request $request)
    {

        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|unique:tags,title,' . $request->id,
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $data = Tag::where('id', $request->id);
        $data->update([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
        ]);

        return $this->sendResponse($data, 'Tag updated!');
    }

    public function delete(Request $request)
    {
        $data = Tag::where('id', $request->id)->first();
        if ($data) {
            $data = Tag::where('id', $request->id)->delete();
            if ($data == 1) {
                return $this->sendResponse("Tag Found", 'Tag Deleted!');

            } else {
                return $this->sendError('Tag Not Found', ['error' => 'Tag not found']);

            }
        } else {
            return $this->sendError('Tag Not Found', ['error' => 'Tag not found']);
        }
    }
}
