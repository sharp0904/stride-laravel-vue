<template>
    <Head title="Calendar"/>
    <div class="flex justify-center items-center h-screen">
        <div class="bg-gray-100 rounded shadow w-1/2">
            <img class="h-16 mx-auto mb-3" src="/assets/images/logo.png" alt="Enhance Vacation Cleaning" />
            <form id="payment-form">
                <div class="px-6 py-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-2 lg:mb-0 text-left">Payment</h3>
                </div>
                <div class="border-t border-gray-200 p-5">
                    <div class="text-center px-5 py-5 bg-gray-100">
                        <p class="text-2xl font-bold">Verify youself by adding your credit card details</p>
                        <p class="text-xl mt-3">We require your card to prevent spam and system abuse. This helps us focus directly on providing you the best possible service instead of dealing with fraud.</p>
                    </div>
                    <div class="bg-white  border border-solid border-black rounded">
                        <div class="p-5" id="payment-element"></div>
                    </div>
                    <div class="bg-gray-100 p-5 text-2xl font-bold md:flex md:justify-between border-b border-dotted border-gray-300">
                        <p>Due today</p>
                        <p>$0</p>
                    </div>
                    <div class="bg-gray-100 p-5">
                        <p class="text-xl font-bold">Due after trial {{ form.expired_date }} (unless you cancel)</p>
                        <p class="text-sx">After trial, your subscription will be $19.99 per month for 3 cleaners in your team or FREE if you downgrade to the limited free plan. </p>
                        <p class="mt-2">30 days money-back guarantee. No questions asked.</p>
                        <p class="mt-2">We'll remind you vie e-mail before your trial expires</p>
                        <p class="mt-2">Charges apply if you use the SMS feature. Your first 250 SMS are on us.</p>
                    </div>
                    <div class="md:flex md:justify-between p-5">
                        <button type="button" class="btn bg-white text-black border-1 border-solid border-gray-300" @click="backToRegister">Back</button>
                        <button type="submit" class="btn btn-danger" @click="handleSubmit">start 14 day trial</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import AuthLayout from '@/Layouts/AuthLayout'
import { reactive, ref, onMounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import DateTimePicker from '@/Components/Common/DateTimePicker'

const form = reactive({
    expired_date: null,
    user_id: null,
    start_date: null,
    })

const props = defineProps({
  id: Number
})

const id = ref(props.id)
const token = ref(null)
const stripe = ref(null)
const elements = ref(null)

// const STRIPE_PUBLISHABLE_KEY = "pk_live_51M3rV0HgytIVzp8Tk4XgQkVhegAvkxnwVUH1jteiHpaBs3z8qvhtykBqDy8WzxHGzvP7K4vh1fYH4nFc0emI9KXb00l6cv92t1"
// const STRIPE_PUBLISHABLE_KEY = "pk_test_TYooMQauvdEDq54NiTphI7jx"
const STRIPE_PUBLISHABLE_KEY = process.env.MIX_STRIPE_PUBLISHABLE_KEY;
const PAYMENT_INTENT_ID = ref(null)

onMounted(() => {
    axios.post(route('stripe.initiate', {
        amount: 19.99,
        currency: 'USD'
    })).then(response => {
        form.id = id.value
        token.value = response.data.token // Use to identify the payment
        stripe.value = Stripe(STRIPE_PUBLISHABLE_KEY);
        PAYMENT_INTENT_ID.value = response.data.payment_intent_id
        const options = {
            clientSecret: response.data.client_secret,
        }
        elements.value = stripe.value.elements(options);
        const paymentElement = elements.value.create('payment');
        paymentElement.mount('#payment-element');
        
        form.expired_date = new Date()
        form.expired_date.setDate(new Date().getDate() + 14);
        form.expired_date = form.expired_date.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    }).catch(error => {
        // throw error
    })
})

const handleSubmit = async (e) => {

    e.preventDefault();

    const { error } = await stripe.value.confirmPayment({
        elements: elements.value,
        redirect: "if_required"
    });

    if (error === undefined) {
        form.user_id = id.value
        form.start_date = new Date()
        form.expired_date = new Date()
        form.expired_date.setDate(form.start_date.getDate() + 14)
        
        axios.post(route('stripe.complete', {
            token: token.value,
            form: form,
            PAYMENT_INTENT_ID: PAYMENT_INTENT_ID.value,
        })).then(response => {
            toast.fire({
                icon: 'success',
                title: response.data.message
            })
            window.location.href = '/login';
        })
    } else {
        axios.post(route('stripe.failure', {
            token: token.value,
            code: error.code,
            description: error.message,
        }))
    }
}



const backToRegister = () => {
    window.location.href = '/register';
}

// const submit = () => {
//     Inertia.post(route('stripe.check'), form, {
//       onStart: () => { processing.value = true },
//       onFinish: () => { processing.value = false }
//     })
// }

</script>