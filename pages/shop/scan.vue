<template>
  <NuxtLayout name="shop">
    <template #title>
      コード読み取り
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>
