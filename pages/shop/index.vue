<template>
  <NuxtLayout name="shop">
    <template #title>
      店舗
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

</script>
