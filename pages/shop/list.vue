<template>
  <NuxtLayout name="shop">
    <template #title>
      読み取り履歴
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>
