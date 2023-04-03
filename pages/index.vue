<template>
  <VProgressCircular />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['check-login']
})

</script>
