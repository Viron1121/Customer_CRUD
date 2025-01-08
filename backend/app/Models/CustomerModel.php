<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class CustomerModel extends Model
{
   
    use SoftDeletes;
    use HasFactory;

    protected $table = 'customer';

    #protected $primaryKey = 'id'; //Default
    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $fillable = [
        'FirstName',
        'LastName',
        'Email',
        'ContactNumber',
    ];


}
