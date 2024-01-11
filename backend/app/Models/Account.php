<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Account extends Model
{
    use HasFactory, HasApiTokens;
    protected $fillable = [
        'title',
        'username',
        'password',
        'author_id'
    ];


}
