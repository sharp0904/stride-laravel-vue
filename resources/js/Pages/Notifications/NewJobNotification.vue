<template>
    <Head title="New Job Added" />
    <NotificationLayout>
        <div class="bg-white rounded shadow">
            <div class="flex items-center justify-between px-6 py-3">
                <h3 class="text-lg font-medium text-gray-900">New Job Added</h3>
            </div>
            <div class="px-6 py-3">
                <p>Subject: New Job Assignment 🧹</p><br/>
                <p>Dear Cleaner,</p><br/>
                <p>Exciting News!</p>
                <p>A new turnover job has just been assigned for an STR property, and your expertise is needed to make it shine.</p><br/>
                <p>Job Details:</p>
                <p>● Property: [Property Name]</p>
                <p>● Check-out Date: [Date]</p>
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