<template>
  <NuxtLayout name="shop">
    <template #title>
      店舗
    </template>
    <VCard class="my-4">
      <VCardTitle>利用ポイント</VCardTitle>
      <VCardText>9999pt</VCardText>
    </VCard>
  </NuxtLayout>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})

</script>
