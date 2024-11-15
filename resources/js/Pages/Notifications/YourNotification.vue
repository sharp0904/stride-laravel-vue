<template>
    <Head title="Job Completed - to You" />
    <NotificationLayout>
        <div class="bg-white rounded shadow">
            <div class="flex items-center justify-between px-6 py-3">
                <h3 class="text-lg font-medium text-gray-900">Job Completed - to You</h3>
            </div>
            <div class="px-6 py-3">
                <p>Subject: Job Completed - Great Job! 🌟</p><br/>
                <p>Hello,</p><br/>
                <p>A round of applause for you!</p>
                <p>The cleaning job has been successfully completed, thanks to your hard work and attention to detail.</p><br/>
                <p>Job Details:</p>
                <p>● Property: [Property Name]</p>
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