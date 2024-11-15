<?php

// Flash message
function flash($message, $style = 'info') {
  session()->flash('flash', [
    'banner' => $message,
    'bannerStyle' => $style,
    'timestamp' => time()
  ]);
}