<?php

namespace App\Http\Controllers\api;

use App\Models\Template;
use Illuminate\Http\Request;
use App\Http\Traits;
use Illuminate\Support\Facades\File;
use Validator;

use App\Http\Controllers\Controller;

class TemplateController extends Controller
{
    use Traits\ResponseTraits;
    public function show()
    {

        $data = Template::get();
        if (count($data) > 0) {
            return $this->sendResponse($data, 'Data Found!');
        } else {
            return $this->sendError('No Template found', ['error' => 'No data Found!']);
        }
    }


    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'unique:templates|required',
            'thumbnail' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'layouts' => 'required',
            'pages' => 'required',
            'blogs' => 'required',
            'tags' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError("Validation Error!", $validator->errors());
        }
        $thumbnail = time().'.'.$request->thumbnail->extension();
        $request->thumbnail->move(public_path('images/thumbnail'), $thumbnail);
        $image = time().'.'.$request->image->extension();
        $request->image->move(public_path('images/template_image'), $image);
        $data = Template::create([
            'title' => $request->title,
            'thumbnail' => $thumbnail,
            'image' => $image,
            'layouts' => $request->layouts,
            'pages' => $request->pages,
            'blogs' => $request->blogs,
            'tags' => $request->tags,
        ]);
        return $this->sendResponse($data, 'Template created!');
    }


    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'title' => 'required',
//            'thumbnail' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
//            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            'layouts' => 'required',
            'pages' => 'required',
            'blogs' => 'required',
            'tags' => 'required',
        ]);

        $data = Template::where('id', (int)$id);
        $data->update([
            'title' => $validated['title'],
            'layouts' => $validated['layouts'],
            'pages' => $validated['pages'],
            'blogs' => $validated['blogs'],
            'tags' => $validated['tags'],
        ]);

        return $this->sendResponse($data, 'Template updated!');

//
//        $input = $request->all();
//
//        $validator = Validator::make($input, [
//            'title' => 'required' . $request->title,
//            'layouts' => 'required' . $request->layouts,
//            'pages' => 'required' . $request->pages,
//            'blogs' => 'required' . $request->blogs,
//            'tags' => 'required' . $request->tags,
//        ]);
//        if ($validator->fails()) {
//            return $this->sendError("Validation Error!", $validator->errors());
//        }
//
//        dd($input);
//        if($request->thumbnail)
//        {
//             $oldthumbnail = Template::where('id' , $request->id)->first('thumbnail');
//            $file_path = public_path().'/images/thumbnail/'.$oldthumbnail;
//            File::delete($file_path);
//        }
//        if($request->image)
//        {
//            $oldimage = Template::where('id' , $request->id)->first('image');
//            $file_path = public_path().'/images/template_image/'.$oldimage;
//            File::delete($file_path);
//        }

//        $data = Template::where('id', (int)$id);
//        dd($request->title);
//        $result = $data->update([
//            'title' => $request->title,
//            'layouts' => $request->layouts,
//            'pages' => $request->pages,
//            'blogs' => $request->blogs,
//            'tags' => $request->tags,
//        ]);

//        if($request->thumbnail)
//        {
//            $oldthumbnail = Template::where('id' , $request->id)->first();
//            $file_path = public_path().'/images/thumbnail/'.$oldthumbnail->thumbnail;
//            File::Delete($file_path);
//            $thumbnail = time().'.'.$request->thumbnail->extension();
//            $request->thumbnail->move(public_path('images/thumbnail'), $thumbnail);
//            $data = Template::where('id', $request->id);
//            $data->update(['thumbnail' => $thumbnail,
//            ]);
//        }
//        if($request->image)
//        {
//            $oldimage = Template::where('id' , $request->id)->first();
//            $file_path = public_path().'/images/template_image/'.$oldimage->image;
//            File::Delete($file_path);
//            $image = time().'.'.$request->image->extension();
//            $request->image->move(public_path('images/template_image'), $image);
//            $data = Template::where('id', $request->id);
//            $data->update([
//                'image' => $image,
//            ]);
//
//        }
//
//        return $this->sendResponse($data, 'Template updated!');
    }

    public function delete(Request $request)
    {
        $data = Template::where('id', $request->id)->first();
        if ($data) {
            $data = Template::where('id', $request->id)->delete();
            if ($data == 1) {
                return $this->sendResponse("Template Found", 'Template Deleted!');

            } else {
                return $this->sendError('Template Not Found', ['error' => 'Template not found']);

            }
        } else {
            return $this->sendError('Template Not Found', ['error' => 'Template not found']);
        }
    }
}
