<?php
namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class UserRepository {
    public function getAllUsers($search = null) {
        $query = User::query();

        if($search){
            $query->where(function ($q) use ($search){
                $q->where('email', 'like' , "%$search%" )
                ->orWhere('phone', 'like' , "%$search%" )
                ->orWhere('name', 'like' , "%$search%" )
                ->orWhere('id', 'like' , "%$search%" )
                ->orWhere('role', 'like' , "%$search%" )
                ->orWhere('is_active', 'like' , "$search" );
            });
        }
        return $query->orderBy('id', 'desc')->paginate(10);
    }

    public function findById($id) {
        return User::findOrFail($id);
    }

    public function create($data)
    {
        if (isset($data['avatar'])) {
            $data['avatar'] = $data['avatar']->store('userAvatar', 'public');
        }

        $data['password'] = bcrypt($data['password']);
        return User::create($data);
    }

    public function update($id, $data) {
        $user = $this->findById($id);

        if (isset($data['avatar']) && $data['avatar'] !== null) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
        
            $imagePath = $data['avatar']->store('userAvatar', 'public');
            $data['avatar'] = $imagePath;
        } else {
            $data['avatar'] = $user->avatar;
        }
        
        $data['password'] = bcrypt($data['password']);
        $user->update($data);
    }
        
    public function delete($id) {
        $user = $this->findById($id);
        if ($user->avartar) {
            Storage::disk('public')->delete($user->avartar);
        }
        return $user->delete;
    }
}

?>