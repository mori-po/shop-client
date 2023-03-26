<template>
  <NuxtLayout name="shop">
    <template #title>
      読み取り履歴
    </template>
    <VList v-for="history in histories" :key="history?.id">
      <VListItem>
        <VCard class="my-1">
          <VCardTitle>
            {{ history?.pointVoucher?.event_name }}
          </VCardTitle>
          <VCardSubtitle>
            {{ dayjs(history?.used_at ?? 0).format('YYYY/MM/DD hh:mm:ss') }}
          </VCardSubtitle>
          <VCardText>
            {{ history?.amount }}ポイント
          </VCardText>
        </VCard>
      </VListItem>
    </VList>
  </NuxtLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { Ticket } from '~~/types/ticket'

definePageMeta({
  middleware: ['auth']
})

const { token } = useAuth()
const config = useRuntimeConfig()

const { data: histories } = await useFetch<Array<Ticket>>(config.API_ENDPOINT + '/shop/pointticket/history', {
  headers: {
    authorization: `Bearer ${token.value}`
  },
  watch: [token]
})
</script>
