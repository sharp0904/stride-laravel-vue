<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class JobCompleted extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(protected $data, protected $attachments)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $mail = (new MailMessage)
            ->subject('Job Completed')
            ->greeting("Hi, {$this->data['name']}")
            ->line("Your job number: #{$this->data['job_number']} has been completed successfully.");
        if (!empty($this->data['next_job_date'])) {
            $mail->line("Your next job will start on {$this->data['next_job_date']}.");
        }
        foreach($this->attachments as $attachment) {
            $url = "/app/public/{$attachment->url}";
            $mail->attach(storage_path($url), [
                'as' => $attachment->file_name,
                'mime' => $attachment->mime_type
            ]);
        }
        return $mail;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
