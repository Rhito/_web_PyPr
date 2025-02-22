<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Repositories\LogRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

use Inertia\Response;

class UserController extends Controller
{
    protected $userRepository;
    protected $logRepository;

    public function __construct(UserRepository $userRepository, LogRepository $logRepository)
    {
        $this->userRepository = $userRepository;
        $this->logRepository = $logRepository;
    }

    public function index(Request $request) : Response{
      
        $users = $this->userRepository->getAllUsers($request->search);

        return inertia('AdminView/User/User', ['users'=>$users, 'filters'=>$request->only(['search']),]);
    }

    public function create() : Response
    {
        return inertia('AdminView/User/CreateUser');
    }

    public function store(UserRequest $request) : RedirectResponse
    {
        $user = $this->userRepository->create($request->validated()); 
        $this->logRepository->createLog("Created User - Id: " . $user->id, $user->id);
        
        return redirect()->route('user')->with(['success' => 'User created successfully']);
    }


    public function edit($id) {
        $user = $this->userRepository->findById($id);
        return inertia('AdminView/User/EditUser', ['user'=>$user]);
    }

    public function update(UserRequest $request ) : RedirectResponse {
        $this->userRepository->update($request->id, $request->validated());
        $this->logRepository->createLog("Updated User - Id: " . $request->id, $request->id);
        return redirect('users')->with(['success'=>'User edit successfully']);
    }

    public function details($id) : Response {
        $user = $this->userRepository->findById($id);
        return inertia('AdminView/User/DetailsUser', ['user'=>$user]);
    }

    public function destroy($id) : RedirectResponse {
        $this->userRepository->delete($id);
        $this->logRepository->createLog("Deleted User - Id: " . $id, $id);
        return redirect('users')->with(['success'=>'User deleted successfully']);
    }
}
