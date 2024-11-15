<template>
    <Head title="Job is 1 Day away Reminder" />
    <NotificationLayout>
        <div class="bg-white rounded shadow">
            <div class="flex items-center justify-between px-6 py-3">
                <h3 class="text-lg font-medium text-gray-900">Job is 1 Day away Reminder</h3>
            </div>
            <div class="px-6 py-3">
                <p>Subject: Reminder - Your Upcoming Cleaning Tomorrow! 🌟</p><br/>
                <p>Hello,</p><br/>
                <p>We hope this message finds you well.</p>
                <p>Your upcoming is just around the corner, and we want to ensure everything goes smoothly.</p><br/>
                <p>Job Details:</p>
                <p>● Property: [Property Name]</p>
                <p>● Scheduled Date: [Scheduled Turnover Date]</p>
                <p>● Assigned Cleaner: [Cleaner's Name]</p>
                <div class="text-right mt-3">
                    <button class="btn btn-primary">ADD</button>
                </div>
            </div>
        </div>
    </NotificationLayout>
</template>

<script setup>

import NotificationLayout from '@/Layouts/NotificationLayout'

</script>