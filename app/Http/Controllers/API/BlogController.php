<?php

namespace App\Http\Controllers\api;

use App\Models\Blog;
use Illuminate\Http\Request;
use App\Http\Traits;
use Validator;

use App\Http\Controllers\Controller;

class BlogController extends Controller
{
    use Traits\ResponseTraits;

    public function show()
    {

        $data = Blog::get();
        if (count($data) > 0) {
            return $this->sendResponse($data, 'Data Found!');
        } else {
            return $this->sendError('No Blog found', ['error' => 'No data Found!']);
        }
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'unique:blogs|required',
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $data = Blog::create([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
        ]);
        return $this->sendResponse($data, 'Blog created!');
    }


    public function update(Request $request)
    {

        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|unique:blogs,title,' . $request->id,
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $data = Blog::where('id', $request->id);
        $data->update([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
        ]);

        return $this->sendResponse($data, 'Blog updated!');
    }

    public function delete(Request $request)
    {
        $data = Blog::where('id', $request->id)->first();
        if ($data) {
            $data = Blog::where('id', $request->id)->delete();
            if ($data == 1) {
                return $this->sendResponse("Blog Found", 'Blog Deleted!');

            } else {
                return $this->sendError('Blog Not Found', ['error' => 'Blog not found']);

            }
        } else {
            return $this->sendError('Blog Not Found', ['error' => 'Blog not found']);
        }
    }
}
