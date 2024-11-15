<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class DailyCheckPlan extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stride:daily-check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "This command will check the user's expired plans and charge users.";

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        app()->call('App\Http\Controllers\DailyCheckController@checkExpiredUsers');

        // Add any additional logic if needed
        $this->info('Your custom command executed successfully.');
    }
}
