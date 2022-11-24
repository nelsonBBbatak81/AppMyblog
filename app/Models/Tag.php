<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $table = "tags";
    protected $fillable = ["title", "slug"];

    public function taggings() {
        return $this->hasMany(Tagging::class, 'tagging_id');
    }
}
