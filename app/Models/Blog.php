<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $table = "blogs";
    protected $fillable = ["title", "subtitle", "category_id", "content", "meta_info", "slug", "urlimage"];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function taggings() {
        return $this->hasMany(Tagging::class);
    }

    public function blog_images() {
        return $this->hasMany(BlogImage::class);
    }
}
