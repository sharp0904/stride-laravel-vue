import './bootstrap';

import { createApp, h } from 'vue'
import { createInertiaApp, Link, Head } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import mitt from 'mitt'
import { hasAnyPermission } from '@/utils'

// Sweet Alert
window.swal = require('sweetalert2')
window.toast = swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    title: 'text-xl',
    containerClass: 'toast'
  }
});

// Show wait dialog
window.showWaitDialog = () => {
  window.swal.fire({
    html: 'Please wait...',
    showConfirmButton: false,
    backdrop: true,
    allowOutsideClick: false,
    width: '16rem',
    customClass: 'swal2-wait-dialog'
  })
}
// Hide wait dialog
window.hideWaitDialog = () => {
  window.swal.close()
}

createInertiaApp({
  resolve: name => import(`./Pages/${name}`),
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) })
    app.config.compilerOptions.isCustomElement = (tag) => ['trix-editor'].includes(tag)
    app.use(plugin)
      .component("Link", Link)
      .component("Head", Head)
      .provide('emitter', mitt())
      .provide('swal', window.swal)
      .provide('toast', window.toast)
      .provide('hasAnyPermission', hasAnyPermission)
      .mixin({ methods: { route } })
      .mount(el)
  },
  title: title => `${title} - Enhance Vacation Cleaning`
})

InertiaProgress.init({
  color: '#187a74',
  showSpinner: true,
})
