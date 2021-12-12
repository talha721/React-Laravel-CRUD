<?php

namespace App\Http\Controllers\api;

use App\Models\Page;
use Illuminate\Http\Request;
use App\Http\Traits;
use Validator;

use App\Http\Controllers\Controller;

class PageController extends Controller
{
    use Traits\ResponseTraits;

    public function show()
    {

        $data = Page::get();
        if (count($data) > 0) {
            return $this->sendResponse($data, 'Data Found!');
        } else {
            return $this->sendError('No Page found', ['error' => 'No data Found!']);
        }
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'unique:pages|required',
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $data = Page::create([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
        ]);
        return $this->sendResponse($data, 'Page created!');
    }


    public function update(Request $request)
    {

        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|unique:pages,title,' . $request->id,
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $data = Page::where('id', $request->id);
        $data->update([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
        ]);

        return $this->sendResponse($data, 'Page updated!');
    }

    public function delete(Request $request)
    {
        $data = Page::where('id', $request->id)->first();
        if ($data) {
            $data = Page::where('id', $request->id)->delete();
            if ($data == 1) {
                return $this->sendResponse("Page Found", 'Page Deleted!');

            } else {
                return $this->sendError('Page Not Found', ['error' => 'Page not found']);

            }
        } else {
            return $this->sendError('Page Not Found', ['error' => 'Page not found']);
        }
    }
}
