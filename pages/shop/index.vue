<template>
  <NuxtLayout name="shop">
    <template #title>
      店舗
    </template>
    <VCard class="my-4">
      <VCardTitle>累積利用もりポ</VCardTitle>
      <VCardText>
        <VRow no-gutters>
          <VCol
            align-self="center"
            class="text-right"
            cols="12"
          >
            <VLabel class="text-h3">
              {{ usedPoint }}
            </VLabel>もりポ
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { Ticket } from '~~/types/ticket'

definePageMeta({
  middleware: ['auth']
})

const { token } = useAuth()
const config = useRuntimeConfig()

const usedPoint = await useFetch<Array<Ticket>>(config.API_ENDPOINT + '/shop/pointticket/history', {
  headers: {
    authorization: `${token.value}`
  },
  watch: [token]
}).then((data) => {
  return data.data.value?.map(a => a.amount).reduce((a, b) => a + b, 0)
})

</script>
