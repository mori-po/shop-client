<template>
  <NuxtLayout name="shop">
    <template #title>
      読み取り履歴
    </template>
    <VList v-for="history in histories" :key="history?.id">
      <VListItem>
        <VCard class="ma-1">
          <VCardTitle>
            {{ history?.pointVoucher?.event_name }}
          </VCardTitle>
          <VCardSubtitle>
            {{ dayjs.unix(history?.used_at ?? 0).format('YYYY/MM/DD hh:mm:ss') }}
          </VCardSubtitle>
          <VCardText>
            <VRow no-gutters>
              <VCol
                align-self="center"
                class="text-center"
                cols="2"
              >
                <VImg
                  :src="history?.pointVoucher.event_image"
                  lazy-src="/moripo-icon.jpg"
                  class="event-image"
                />
              </VCol>
              <VCol
                align-self="center"
                class="text-right"
                cols="10"
              >
                <VLabel class="text-h3">
                  {{ history?.amount }}
                </VLabel>もりポ
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VListItem>
    </VList>
    <VAlert v-show="(histories?.length ?? 0) == 0" color="warning">
      まだQRコードが読み取られていません。
    </VAlert>
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
    authorization: `${token.value}`
  },
  watch: [token]
})
</script>
<style lang="scss" scoped>
.event-image {
  min-width: 50px;
  max-height: 100px;
}
</style>
