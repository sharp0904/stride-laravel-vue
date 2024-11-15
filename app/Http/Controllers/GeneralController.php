<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class GeneralController extends Controller
{
  /**
   * Delete attachment image
   * @param int $id
   * @return JsonResponse
   */
  public function deleteFile(int $id): JsonResponse
  {
    try {
      $attachment = Attachment::findOrFail($id);
      if (Storage::disk('public')->exists($attachment->url)) {
        Storage::disk('public')->delete($attachment->url);
      }
      $attachment->delete();
      return response()->json([
        'message' => 'File deleted successfully'
      ], 200);
    } catch (ModelNotFoundException $ex) {
      return response()->json([
        'error' => 'Model not found'
      ], 404);
    }
  }
}
