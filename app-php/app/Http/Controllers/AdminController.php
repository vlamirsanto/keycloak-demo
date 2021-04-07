<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Gate;

class AdminController extends Controller
{
    public function index() {
        $data['title'] = 'Application PHP - Tech Day';

        return view('admin.index', $data);
    }

    public function renderPublic() {
        $data['title'] = 'Application PHP - Tech Day';

        return view('admin.index', $data);
    }

    public function renderPrivate() {
        $data['title'] = 'Application PHP - Tech Day';

        return view('admin.index', $data);
    }

    public function renderGate() {
        if (Gate::denies('keycloak-web', ['manage-account'])) {
            return abort(403, 'Gate denies manage-account');
        }

        $data['title'] = 'Application PHP - Tech Day';

        return view('admin.index', $data);
    }
}
