<template>
  <VContainer class="h-screen d-flex align-center justify-center">
    <VProgressCircular :indeterminate="true" color="primary" size="50" />
  </VContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['check-login']
})

</script>
