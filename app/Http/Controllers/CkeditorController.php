<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CkeditorController extends Controller
{
public function storeImage(Request $request)
    {

        // if ($request->hasFile('upload')) {
        //     $originName = $request->file('upload')->getClientOriginalName();
        //     dd($originName);
        //     $fileName = pathinfo($originName, PATHINFO_FILENAME);
        //     $extension = $request->file('upload')->getClientOriginalExtension();
        //     $fileName = $fileName . '_' . time() . '.' . $extension;

        //     $request->file('upload')->move(public_path('media'), $fileName);

        //     $url = asset('media/' . $fileName);
        //     return response()->json(['fileName' => $fileName, 'uploaded'=> 1, 'url' => $url]);
        // }

        // return response()->json(['file' => $request->file('upload')]);

        // if($request->hasFile('upload')) {
        //     //get filename with extension
        //     $filenamewithextension = $request->file('upload')->getClientOriginalName();

        //     //get filename without extension
        //     $filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);

        //     //get file extension
        //     $extension = $request->file('upload')->getClientOriginalExtension();

        //     //filename to store
        //     $filenametostore = $filename.'_'.time().'.'.$extension;

        //     //Upload File
        //     $request->file('upload')->storeAs('public/uploads', $filenametostore);

        //     $CKEditorFuncNum = $request->input('CKEditorFuncNum');
        //     $url = asset('storage/uploads/'.$filenametostore);
        //     $msg = 'Image successfully uploaded';
        //     $re = "<script>window.parent.CKEDITOR.tools.callFunction($CKEditorFuncNum, '$url', '$msg')</script>";

        //     // Render HTML output
        //     @header('Content-type: text/html; charset=utf-8');
        //     echo $re;
        // }
        // dd($request);

        // $request->validate([
        //     'upload' => 'image',
        // ]);
        // if ($request->hasFile('upload')) {
        //       $url = $request->upload->store('images');
        //       $CKEditorFuncNum = $request->input('CKEditorFuncNum');
        //       $url = asset('storage/' . $url);
        //       $msg = 'Image successfully uploaded';
        //       $response = "<script>window.parent.CKEDITOR.tools.callFunction($CKEditorFuncNum, '$url', '$msg')</script>";
        //       @header('Content-type: text/html; charset=utf-8');
        //       return $response;
        //   }

        if($request->hasFile('upload')) {
            //get filename with extension
            $filenamewithextension = $request->file('upload')->getClientOriginalName();

            //get filename without extension
            $filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);

            //get file extension
            $extension = $request->file('upload')->getClientOriginalExtension();

            //filename to store
            $filenametostore = $filename.'_'.time().'.'.$extension;

            //Upload File
            $request->file('upload')->storeAs('public/uploads', $filenametostore);

            $CKEditorFuncNum = $request->input('CKEditorFuncNum');
            $url = asset('storage/uploads/'.$filenametostore);
            $msg = 'Image successfully uploaded';
            // $re = "<script>window.parent.CKEDITOR.tools.callFunction($CKEditorFuncNum, '$url', '$msg')</script>";

            // Render HTML output
            @header('Content-type: text/html; charset=utf-8');
            // echo $re;
            return response()->json([
                'fileName' => $filenametostore,
                'uploaded' => 1,
                'url' => $url
            ]);
        }
    }
}
