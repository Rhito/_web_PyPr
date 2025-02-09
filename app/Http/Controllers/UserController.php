<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\Log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request){
        $query = User::query();

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;

            // Check if search input is numeric (assumed to be ID), otherwise search by name
            if (is_numeric($search)) {
                $query->where('id', $search);
            } else {
                $query->where('name', 'like', '%' . $search . '%');
            }
        }
        $users = $query->orderBy('id', 'desc')->paginate(10);

        return inertia('AdminView/User/User', ['users'=>$users, 'filters'=>$request->only(['search']),]);
    }

    public function create(): Response
    {
        return inertia('AdminView/User/CreateUser');
    }

    
    public function store(UserRequest $request) : RedirectResponse
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->address = $request->address;
        $user->phone = $request->phone;
        $imagePath = $request->file('avatar')->store('userAvatar', 'public');
        $user->avatar = $imagePath;
        $user->role = $request->role;
        $user->is_active = $request->is_active;
        $user->save();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = "Create User";
        $log->save();
        
        return redirect('users')->with(['success'=>'User created successfully']);
    }

    public function edit($id) {
        $user = User::findOrFail($id);
        return inertia('AdminView/User/EditUser', ['user'=>$user]);
    }

    public function update(UserRequest $request ) : RedirectResponse {
        $user = User::where('id', $request->id)->first();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;

        if($request->hasFile('avatar') && $request->avatar != null){
            if($user->avatar){
                Storage::disk('public')->delete($user->avatar);
            }
            $imagePath = $request->file('avatar')->store('userAvatar', 'public');
            $user->avatar = $imagePath;
        }

        $user->password = bcrypt($request->password);
        $user->role = $request->role;
        $user->is_active = $request->is_active;
        $user->updated_at = now();

        $user->update();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = "Update User - Id: ". $request->id;
        $log->save();

        return redirect('users')->with(['success'=>'User edit successfully']);
    }

    public function details($id) {
        $user = User::where('id', $id)->first();
        return inertia('AdminView/User/DetailsUser', ['user'=>$user]);
    }

    public function destroy($id) : RedirectResponse {
        $user = User::where('id', $id)->first();
        if($user->avatar){
            Storage::disk('public')->delete($user->avatar);
        }
        $user->delete();

        $log = new Log();
        $log->user_id = Auth::id();
        $log->action = "Delete user - Id: ". $id;
        $log->save();
        return redirect('users')->with(['success'=>'User deleted successfully']);
    }
}
