<?php

namespace App\Models;

use App\Models\Enums\Roles;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'last_login_at',
        'last_login_ip',
        'dob',
        'phone_number',
        'address',
        'next_of_kin_name',
        'next_of_kin_relationship',
        'next_of_kin_phone_number'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isDoctor()
    {
        return $this->role == Roles::DOCTOR;
    }

    public function scopeWhereDoctor($query)
    {
        return $query->where('role', Roles::DOCTOR);
    }

    public function appointmentsPatient()
    {
       return $this->hasMany(Appointment::class, 'patient_id');
    }

    public function appointmentsDoctor()
    {
        return $this->hasMany(Appointment::class, 'doctor_id');
    }
}
