<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize(): bool
  {
    return auth()->check();
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules(): array
  {
    return [
      'office_id' => 'required|numeric',
      'host_id' => 'required|numeric',
      'name' => 'required',
      'beds' => 'required',
      'baths' => 'required',
      'accommodation_size' => 'required',
      'price' => 'required',
      'entrance_code' => 'required',
      'supply_closet_location' => 'nullable',
      'supply_closet_code' => 'nullable',
      'preferred_payment_method' => 'nullable',
      'preferred_calendar' => 'nullable',
      'start_date' => 'nullable|date',
      'end_date' => 'nullable|date|after_or_equal:start_date',
      'check_in_time' => 'nullable',
      'check_out_time' => 'nullable',
      'ical_url' => 'required',
      'address_line_1' => 'required:min:3',
      'address_line_2' => 'nullable',
      'zip_code' => 'required',
      'city' => 'required',
      'state' => 'required',
      'country' => 'required',
      'pets_allowed' => 'required',
      'price_paying_cleaning' => 'required',
      'laundry_needed' => 'required',
      'washer_dryer_on_site' => 'required',
      'notes' => 'nullable',
      'primary_cleaner_id' => 'nullable|numeric',
      'secondary_cleaner_id' => 'nullable|numeric',
      'recurring' => 'required',
      'start' => 'required',
      'square_feet' => 'required'
    ];
  }

  public function messages(): array
  {
    return [
      'cleaners.*.name.required_if' => 'Cleaner name is required',
      'cleaners.*.phone.required_if' => 'Cleaner phone is required'
    ];
  }
}
