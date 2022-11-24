<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
// use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Tagging;
use App\Models\BlogImage;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;
use App\Http\Requests\Blog\StoreBlogRequest;
use App\Http\Requests\Blog\UpdateBlogRequest;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class BlogsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/BlogAdmin', [
            'blogs' => Blog::orderBy('created_at', 'desc')->paginate(3)->through(fn($blog) => [
                'id' => $blog->id,
                'title' => $blog->title,
                'subtitle' => $blog->subtitle,
                'category_id' => $blog->category_id,
                'category' => $blog->category->title,
                'content' => $blog->content,
                'slug' => $blog->slug,
                'meta_info' => $blog->meta_info,
                'urlimage' => $blog->urlimage,
            ]),
            'categories' => Category::orderBy('created_at', 'desc')->paginate(3)->through(fn($category) => [
                'id' => $category->id,
                'title' => $category->title,
                'slug' => $category->slug,
                'meta_info' => $category->meta_info,
                'urlimage' => $category->urlimage
            ])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBlogRequest $request)
    {
        // dd($request);
        $tagList = explode(",", $request->tags);

        $blog = new Blog();
        $result = strip_tags($request->content, "<img>");
        $doc = new \DOMDocument();
        $doc->loadHTML($result, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $xpath = new \DOMXPath($doc);

        $blogImageSrcs = [];
        foreach ($xpath->query("//img[@src]") as $item) {
            $blogImageSrcs[] = $item->getAttribute('src');
        }
        // dd($blogImageSrcs);
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title, '-');
        $blog->subtitle = $request->subtitle;
        $blog->category_id = $request->category_id;
        $blog->content = $request->content;
        $blog->meta_info = $request->meta_info;
        if ($request->hasFile('urlimage')) {
            $image          = $request->file('urlimage');
            $imageName      = $image->getClientOriginalName();
            $imageNewName   = explode('.', $imageName)[0];
            $fileExtention  = time() . '.' . $imageNewName . '.' . $image->getClientOriginalExtension();
            $location       = storage_path('app/public/blog/' . $fileExtention);
            Image::make($image)->resize(1200, 630)->save($location);

            $blog->urlimage = $fileExtention;
        };

        $blog->save();



        // // dd($blogImageSrcs);
        foreach($tagList as $value) {
            $tag = DB::table('tags')->where('title', $value)->first();
            // dd($tag);
            if(isset($tag)) {
                $tagging = new Tagging();
                $tagging->tag_id = $tag->id;
                $tagging->blog_id = $blog->id;
                $tagging->save();
            } else {
                $tagnew = new Tag();
                $tagging = new Tagging();
                $tagnew->title = $value;
                $tagnew->slug = Str::slug($value);
                $tagnew->save();
                $tagging->tag_id = $tagnew->id;
                $tagging->blog_id = $blog->id;
                $tagging->save();
            }
        }

        foreach($blogImageSrcs as $item => $value) {
            $blogimages = new BlogImage();
            $blogimages->blog_id = $blog->id;
            $blogimages->urlimage = $value;
            $blogimages->save();
        }

        return redirect('/blogs')->with('message', 'Blog has been successfully created!.');
    }

    public function showBlog($id) {
        $blog = Blog::findOrFail($id);
        $blogTags = [];
        $tags = $blog->taggings->pluck('tag_id');
        foreach($tags as $tag_id) {
            $item = Tag::findOrFail($tag_id);
            array_push($blogTags, $item->title);
        }
        $blogList = [
            'id' => $blog->id,
            'title' => $blog->title,
            'subtitle' => $blog->subtitle,
            'category_id' => $blog->category_id,
            'category' => $blog->category->title,
            'content' => $blog->content,
            'slug' => $blog->slug,
            'meta_info' => $blog->meta_info,
            'urlimage' => $blog->urlimage,
            'tags' => $blogTags
        ];

        return response()->json([
            'blog' => $blogList
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBlogRequest $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $blog->title = $request->title;
        $blog->subtitle = $request->subtitle;
        $blog->category_id = $request->category_id;
        $blog->slug = Str::slug($request->title, '-');

        $blog->meta_info = $request->meta_info;
        // extract tag img from string
        $result = strip_tags($request->content, "<img>");
        $doc = new \DOMDocument();
        $doc->loadHTML($result, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $xpath = new \DOMXPath($doc);

        // push attribute src tag img to array $blogImageSrcs
        $blogImageSrcs = [];
        foreach ($xpath->query("//img[@src]") as $item) {
            $blogImageSrcs[] = $item->getAttribute('src');
        }
        // check is the urlimage there is in array or not
        foreach($blog->blog_images->pluck('urlimage') as $item => $valueitem) {
            $checkurlimage = false;
            foreach($blogImageSrcs as $item => $value) {
                if($valueitem === $value) {
                    $checkurlimage = true;
                    break;
                } else {
                    $checkurlimage = false;
                }
            }
            // delete image is there is in array
            if(!$checkurlimage) {
                File::delete(storage_path('app/public/' . strrchr( $valueitem, 'uploads/')));
                BlogImage::where('blog_id', $blog->id)->where('urlimage', $valueitem)->delete();
            }
        }
        // update url image current to blog
        foreach($blogImageSrcs as $item => $value) {
            $blogImage = DB::table('blog_images')->where('blog_id', $blog->id)->where('urlimage', $value)->first();
            if(!isset($blogImage)) {
                $blogimages = new BlogImage();
                $blogimages->blog_id = $blog->id;
                $blogimages->urlimage = $value;
                $blogimages->save();
            }
        }

        $blog->content = $request->content;
        if ($request->hasFile('urlimage')) {
            File::delete(storage_path('app/public/blog/' . $blog->urlimage));
            $image          = $request->file('urlimage');
            $imageName      = $image->getClientOriginalName();
            $imageNewName   = explode('.', $imageName)[0];
            $fileExtention  = time() . '.' . $imageNewName . '.' . $image->getClientOriginalExtension();
            $location       = storage_path('app/public/blog/' . $fileExtention);
            Image::make($image)->resize(1200, 630)->save($location);

            $blog->urlimage = $fileExtention;
        };

        Tagging::where('blog_id', $blog->id)->delete();
        $tagList = explode(",", $request->tags);
        foreach($tagList as $value) {
            $tag = DB::table('tags')->where('title', $value)->first();
            // dd($tag);
            if(isset($tag)) {
                $tagging = new Tagging();
                $tagging->tag_id = $tag->id;
                $tagging->blog_id = $blog->id;
                $tagging->save();
            } else {
                $tagnew = new Tag();
                $tagging = new Tagging();
                $tagnew->title = $value;
                $tagnew->slug = Str::slug($value);
                $tagnew->save();
                $tagging->tag_id = $tagnew->id;
                $tagging->blog_id = $blog->id;
                $tagging->save();
            }
        }

        $blog->update();


        return redirect('/blogs')->with('message', 'Blog has been successfully updated!.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        File::delete(storage_path('app/public/blog/' . $blog->urlimage));
        foreach($blog->blog_images->pluck('urlimage') as $item => $value) {
            File::delete(storage_path('app/public/' . strrchr( $value, 'uploads/')));
        }
        $blog->delete();

        return redirect('/blogs')->with('message', 'Blog has been successfully deleted!.');
    }
}
