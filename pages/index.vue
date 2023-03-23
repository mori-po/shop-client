<template>
  <VProgressCircular />
</template>

<script setup lang="ts">
import { useAuth } from '~~/composables/useAuth'
definePageMeta({
  layout: false
})
const checkLogin = async () => {
  const { checkAuthState, token } = useAuth()
  await checkAuthState()
  if (token.value) {
    return await navigateTo('/shop')
  } else {
    return await navigateTo('/login')
  }
}

checkLogin()

</script>
