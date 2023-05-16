<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lesson;

class LessonController extends Controller
{
    public function index()
    {
          return Lesson::all();
    }

    public function store(Request $request)
    {
        $lesson = new Lesson();
        $lesson -> user_id = $request -> user_id;
        $lesson -> title = $request -> title;
        $lesson -> start = $request -> start;
        $lesson -> end = $request -> end;
        $lesson -> save();
    }

    public function show(string $id)
    {
        $lesson = Lesson::find($id);
        return $lesson;
    }

    public function update(Request $request, string $id)
    {
        $lesson = Lesson::findOrFail($request -> id);
        $lesson -> user_id = $request -> user_id;
        $lesson -> title = $request -> title;
        $lesson -> start = $request -> start;
        $lesson -> end = $request -> end;
        $lesson -> is_confirmed = $request -> is_confirmed;
        $lesson -> save();
        return $lesson;
    }

    public function destroy(string $id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();
	    return response()->json(null, 204);
    }
}
