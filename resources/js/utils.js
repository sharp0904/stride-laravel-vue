import {usePage} from "@inertiajs/inertia-vue3"

export const formatCurrency = (val) => {
  if (!val) {
    return val
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(val);
}

export const hasAnyPermission = (permissions) => {
  const props = usePage().props.value
  const allPermissions = props.user ? props.user.permissions : []
  let hasPermission = false
  if (typeof permissions === 'string') {
    if (allPermissions.indexOf(permissions) !== -1) hasPermission = true
  } else {
    permissions.forEach(function (item) {
      if (allPermissions.indexOf(item) !== -1) hasPermission = true
    })
  }
  return hasPermission
}
