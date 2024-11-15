<template>
    <Head title="Job Completed - to Client" />
    <NotificationLayout>
        <div class="bg-white rounded shadow">
            <div class="flex items-center justify-between px-6 py-3">
                <h3 class="text-lg font-medium text-gray-900">Job Completed - to Client</h3>
            </div>
            <div class="px-6 py-3">
                <p>Subject: Your Property is All Clean! 🌟</p><br/>
                <p>Hello,</p><br/>
                <p>Exciting news!</p>
                <p>Your property is now sparkling clean.</p><br/>
                <p>Job Details:</p>
                <p>● Property: [Property Name]</p>
                <p>● Quality Check: Our team ensures that everything meets your high standards.</p>
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